import React from "react";
import Navbar from "../navbars/NavBar";

const Error = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-red-700 text-[30px] font-semibold text-center mt-5">
        Error 404 : Page Not Found
      </h1>
    </div>
  );
};

export default Error;
