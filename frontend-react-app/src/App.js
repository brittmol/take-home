// import React from "react";
import Posts from "./components/Posts";
import Coffees from "./components/Coffees";
import CreateCoffee from "./components/CreateCoffee";
import CreatePost from "./components/CreatePost";

export default function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Coffees />
      <CreateCoffee />
      <div>----------------------------------</div>
      <CreatePost />
      <Posts />
    </>
  );
}
