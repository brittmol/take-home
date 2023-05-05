// import React from "react";
import Posts from "./components/Posts";
import Coffees from "./components/Coffees";

export default function App() {
  return (
    <div className="app">
      <div>
        <Posts />
      </div>
      <div>
        <Coffees />
      </div>
    </div>
  );
}
