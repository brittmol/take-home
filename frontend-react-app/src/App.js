// import React from "react";
import Posts from "./components/Posts";
import Coffees from "./components/Coffees";
import CreateCoffee from "./components/CreateCoffee";

export default function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Coffees />
      <CreateCoffee />
      <div>----------------------------------</div>
      <Posts />
    </>
  );
}
