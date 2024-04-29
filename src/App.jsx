import React from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
const App = () => {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen ">
        <Navbar />
        <Manager />
      </div>
    </>
  );
};

export default App;
