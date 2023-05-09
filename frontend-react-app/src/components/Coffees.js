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
    <div className="coffees">
      <div className="header-btn">
        <h2>Coffees</h2>
        <div>
          <CreateCoffee />
        </div>
      </div>
      <div>
        {coffeesArr?.map((coffee) => (
          <div className="single-coffee" key={coffee?.id}>
            <div>
              <Mug />
              {coffee?.name} - {coffee?.year}
            </div>
            <button
              className="x"
              onClick={() => dispatch(removeCoffee(coffee))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
