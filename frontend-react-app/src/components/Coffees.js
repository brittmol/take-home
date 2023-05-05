import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoffees, removeCoffee } from "../store/coffee";
import CreateCoffee from "./CreateCoffee";
import { Mug } from "./Assets";

export default function Coffees() {
  const dispatch = useDispatch();
  const coffees = useSelector((state) => state.coffeeReducer);
  const coffeesArr = Object.values(coffees);

  useEffect(() => {
    dispatch(getCoffees());
  }, [dispatch]);

  return (
    <>
      <div className="coffees">
        <h2>Coffees</h2>
        <CreateCoffee />
      </div>
      <div>
        {coffeesArr?.map((coffee) => (
          <div key={coffee?.id}>
            <Mug />
            {coffee?.name} - {coffee?.year}
            <button onClick={() => dispatch(removeCoffee(coffee))}>X</button>
          </div>
        ))}
      </div>
    </>
  );
}
