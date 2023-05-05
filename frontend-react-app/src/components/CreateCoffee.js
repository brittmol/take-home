import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCoffee } from "../store/coffee";

export default function CreateCoffee() {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false)

  const showFormBtn = () => {
    if (!showForm) {
      setShowForm(true)
    }
    else {
      setShowForm(false)
      setName("");
      setYear("");
      setCaffContent("");
    }
  }

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [caffContent, setCaffContent] = useState("");
  // const [caffPercent, setCaffPercent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      year,
      caffeine_content: caffContent,
      caffeine_percentage: caffContent,
    };

    setErrors([]);
    const newCoffee = await dispatch(createCoffee(payload))
      // catch errors
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      });

    if (newCoffee) {
      // close pop up
      setShowForm(false)
      setName("");
      setYear("");
      setCaffContent("");
      // setCaffPercent("");
    }
  };

  return (
    <>
      <button onClick={showFormBtn}>New Coffee</button>
      {showForm && (
          <form className="create-coffee" onSubmit={handleSubmit}>
            <h2>New Coffee</h2>
            <ul style={{ color: "white" }}>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Year:
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <label>
              Caffeine Content:
              <input
                type="number"
                value={caffContent}
                onChange={(e) => setCaffContent(e.target.value)}
              />
            </label>
            <button type="submit">Add</button>
          </form>
      )}
    </>
  );
}
