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
      <button onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <h2>New Post</h2>
            <ul style={{ color: "white" }}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Text:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <label>
              Rating:
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
            <label>
              Select Coffee
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
            </label>
            <button type="submit">Add</button>
          </form>
        </Modal>
      )}
    </>
  );
}
