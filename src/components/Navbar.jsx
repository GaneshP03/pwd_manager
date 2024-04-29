import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-slate-800 text-white">
        <div className="myContainer flex items-center  px-4 justify-between py-5">
          <div className="logo font-bold text-2xl w-full flex justify-center items-center">
            <span className="text-green-700 ">&lt;</span>
            My
            <span className="text-green-700 ">Pass /&gt;</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
