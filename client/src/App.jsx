import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./components/nav";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route
            path="/add-product"
            element={<AddProduct></AddProduct>}
          ></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/sign-in" element={<Signin></Signin>}></Route>
          <Route path="/sign-up" element={<Signup></Signup>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
