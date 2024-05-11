import React from "react";
import { Route, Routes } from "react-router-dom";
import Context from "./components/Context";
import SinglePageLoader from "./components/SinglePageLoader";

const App = () => {
  return (
    <>
   
      <Routes>
        <Route path="/" element={<Context />} />
        <Route path="singleView" element={<SinglePageLoader />} />
      </Routes>
    </>
  );
};

export default App;
