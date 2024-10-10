import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Nav from "./components/nav";
import AllProducts from "./pages/AllProducts";
import Tutorials from "./pages/Tutorials";
import VideoTutorials from "./pages/VideoTutorials";
import Casestudies from "./pages/Casestudies";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import ContractFarming from "./pages/ContractFarming";
import YourContracts from "./pages/YourContracts";
import CreateContract from "./pages/CreateContract";
import Payment from "./pages/Payment";
import ContractId from "./pages/ContractId";
import AwaitingContracts from "./pages/AwaitingContracts";
import Communities from "./pages/Communities";
import Search from "./pages/Search";
import CasestudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import BlogDetail from "./pages/BlogDetail";
import CommunityDetail from "./pages/CommunityDetail";
import CreateBid from "./pages/CreateBid";
import VerifyOtp from "./pages/VerifyOtp";
import CompleteProfile from "./pages/CompleteProfile";

import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import BackProtected from "./components/BackProtected";
import UpdateProfile from "./pages/UpdateProfile";
import YeildPredictor from "./pages/YeildPredictor";
import CategoryPage from "./pages/CategoryPage";
import AllBids from "./pages/AllBids";

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
          <Route
            path="/sign-in"
            element={
              <BackProtected>
                <Signin />
              </BackProtected>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <BackProtected>
                <Signup />
              </BackProtected>
            }
          ></Route>
          <Route path="/all-products" element={<AllProducts />}></Route>
          <Route path="/tutorials" element={<Tutorials />}></Route>
          <Route
            path="/tutorials/video-tutorials"
            element={<VideoTutorials />}
          ></Route>
          <Route
            path="/tutorials/case-studies"
            element={<Casestudies />}
          ></Route>
          <Route path="/tutorials/blogs" element={<Blogs />}></Route>
          <Route path="/contract-farming" element={<ContractFarming />}></Route>
          <Route
            path="/contract-farming/my-contracts"
            element={<YourContracts />}
          ></Route>
          <Route
            path="/contract-farming/create-contract"
            element={<CreateContract />}
          ></Route>
          <Route
            path="/contract-farming/:contractId"
            element={<ContractId />}
          ></Route>
          <Route
            path="/all-products/payment/:productId"
            element={<Payment />}
          ></Route>
          <Route path="/communities" element={<Communities />}></Route>

          <Route
            path="/contract-farming/awaiting-contracts"
            element={<AwaitingContracts />}
          ></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/casestudy/:id" element={<CasestudyDetail />} />
          <Route path="/blog/:title" element={<BlogDetail />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/create-bid" element={<CreateBid />}></Route>
          <Route path="/verify-otp" element={<VerifyOtp />}></Route>
          <Route path="/complete-profile" element={<CompleteProfile />}></Route>
          <Route
            path="/change-password/:token"
            element={<ChangePassword />}
          ></Route>
          <Route path="user-profile" element={<UpdateProfile />}></Route>
          <Route path="reset-password" element={<ResetPassword />}></Route>
          <Route path="yeild-predictor" element={<YeildPredictor />}></Route>
          <Route path="/category/:slug" element={<CategoryPage />} />

          <Route path="/all-bids" element={<AllBids/>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
};

export default App;
