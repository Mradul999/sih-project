import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./components/nav";
import AllProducts from "./pages/AllProducts";

const App = () => {
  return (
    <div className=" bg-gray-100 min-h-screen">
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
          <Route path="/all-products" element={<AllProducts/>}></Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
