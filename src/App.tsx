import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { MainAppContainer } from "./global/styles";
import GaltonBoard from "./features/galton/GaltonBoard";

function App() {
  return (
    <MainAppContainer>
      {/* <Counter /> */}
      <GaltonBoard />
    </MainAppContainer>
  );
}

export default App;
