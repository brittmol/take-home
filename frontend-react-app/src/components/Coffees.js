import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoffees, removeCoffee } from "../store/coffee";

export default function Coffees() {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.coffeeReducer);
  const coffeesArr = Object.values(coffees);

  useEffect(() => {
    dispatch(getCoffees());
  }, [dispatch]);

  return (
    <>
      <h2>List of Coffees</h2>
      <div>
        {coffeesArr?.map((coffee) => (
          <div key={coffee?.id}>
            {coffee?.name}, {coffee?.year}
            <button onClick={() => dispatch(removeCoffee(coffee))}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}
