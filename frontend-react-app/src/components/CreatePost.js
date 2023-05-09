import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoffees } from "../store/coffee";
import { createPost } from "../store/post";
import { Modal } from "../context/Modal";

export default function CreatePost() {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.coffeeReducer);
  const coffeesArr = Object.values(coffees);

  useEffect(() => {
    dispatch(getCoffees());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [coffee, setCoffee] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      text,
      rating,
      coffee,
    };

    console.log("payload", payload);

    setErrors([]);
    const newPost = await dispatch(createPost(payload))
      // catch errors
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });

    if (newPost) {
      // close pop up
      setShowModal(false);
      setTitle("");
      setText("");
      setRating("");
      setCoffee("");
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>New Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form className="create-post" onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <ul style={{ color: "white" }}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="infox">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="infox">
              <input
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="info">
              <label>Coffee</label>
              <select
                value={coffee}
                onChange={(e) => setCoffee(e.target.value)}
              >
                <option value="">------</option>
                {coffeesArr?.map((coffee) => (
                  <option key={coffee?.id} value={coffee?.id}>
                    {coffee?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="infox">
              <input
                type="text"
                placeholder="Post text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
    </>
  );
}
