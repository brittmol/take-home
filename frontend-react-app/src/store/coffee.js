import { csrfFetch } from "./csrf";

// ----------------- ACTIONS ----------------------------------

const LOAD_COFFEES = "coffees/loadCoffees";
const loadCoffees = (coffees) => ({
  type: LOAD_COFFEES,
  coffees,
});

const ADD_COFFEE = "coffees/addCoffee";
const addCoffee = (coffee) => ({
  type: ADD_COFFEE,
  coffee,
});

const DELETE_COFFEE = "coffees/deleteCoffee";
const deleteCoffee = (coffee) => ({
  type: DELETE_COFFEE,
  coffee,
});

// ----------------- THUNKS ----------------------------------

export const getCoffees = () => async (dispatch) => {
  const response = await csrfFetch("/api/coffees");
  if (response.ok) {
    const coffees = await response.json();
    dispatch(loadCoffees(coffees));
    return coffees;
  }
};

export const createCoffee = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/coffees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const coffee = await response.json();
    dispatch(addCoffee(coffee));
    return coffee;
  } else if (response.status < 500) {
    const coffee = await response.json();
    if (coffee.errors) return coffee.errors;
  } else {
    return ["An error occurred. Please try to create a new coffee again."];
  }
};

export const removeCoffee = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/coffees/${data.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const coffee = await response.json();
    dispatch(deleteCoffee(coffee));
  }
};

// ----------------- REDUCER ----------------------------------

export default function coffeeReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_COFFEES:
      action.coffees.forEach((coffee) => {
        newState[coffee.id] = coffee;
      });
      return newState;
    case ADD_COFFEE:
      newState = { ...state, [action.coffee.id]: action.coffee };
      return newState;
    case DELETE_COFFEE:
      newState = { ...state };
      delete newState[action.coffee.id];
      return newState;
    default:
      return state;
  }
}
