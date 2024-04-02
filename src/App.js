import React from "react"

import './styles.css';
import Home from "./pages/home/Home"
import Sps from "./pages/sps/Sps"
import SpProfile from "./pages/spProfile/SpProfile"
import AddService from "./pages/addService/AddService"
import CreateService from "./pages/createService/CreateService"
import SignIn from "./pages/signIn/SignIn"
import SignUpSp from "./pages/signUpSp/SignUpSp"
import Register from "./pages/register/Register"
import { HelmetProvider } from 'react-helmet-async';



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AdminUpload from "./pages/adminUpload/AdminUpload"
import MoreService from "./pages/moreService/MoreService"
import SearchResult from "./pages/searchResult/SearchResult"
import ThankYou from "./pages/thankYou/ThankYou"

import TermsAndConditionsPage from "./pages/TermsAndConditionsPage/TermsAndConditionsPage"
import ThankYouSp from "./pages/thankYou/ThankYouSp"
import ResetEmail from "./pages/resetEmail/ResetEmail"
import ChangePassword from "./pages/changePassword/ChangePassword"
import EditProfile from "./pages/editProfile/EditProfile"
import AllServices from "./components/allServices/AllServices"
import EditService from "./pages/editService/EditService"
import SelectSearch from "./pages/selectSearch/SelectSearch"
import SearchProduct from "./pages/searchPoint/SearchProduct"
import SearchService from "./pages/searchPoint/SearchService"
import Menu from "./pages/menu/Menu"
import ContactUs from "./pages/menu/ContactUs"
import Products from "./pages/products/Products"
import MoreFreelance from "./pages/moreService/MoreFreelance"
import MoreProduct from "./pages/moreService/MoreProduct"
import Services from "./pages/home/Services"
import ProductResult from "./pages/searchResult/ProductResult"
import ViewProduct from "./pages/spProfile/ViewProduct"
import CreateProduct from "./pages/createService/CreateProduct"
import MyProduct from "./pages/addService/MyProduct"
import EditProduct from "./pages/editService/EditProduct";
import SellerDashboard from "./pages/sellerDashboad/SellerDashboard";
import Admin from "./pages/admin/Admin"
import AllUsers from "./pages/admin/AllUsers";
import AllProducts from "./pages/allProducts/AllProducts";
import AllCategories from "./pages/AllCategories/AllCategories";
import SelectCategory from "./pages/AllCategories/SelectCategory";
import AllCategories1 from "./pages/AllCategories/AllCategories1";
import AllCategories2 from "./pages/AllCategories/AllCategories2";
import AllCategories3 from "./pages/AllCategories/AllCategories3";
import Blog from "./pages/blog/Blog";
import Podcast from "./pages/blog/Podcast";
import BlogPage from "./pages/blog/BlogPage";
import CreateBlog from "./pages/blog/CreateBlog";
import Term1 from "./pages/signUpSp/Term1";
import Term2 from "./pages/signUpSp/Term2";
import SellerDetails from "./pages/spProfile/SellerDetails";


function App() {
  const queryClient = new QueryClient();
  const helmetContext = {};

  return (
    <>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Home />}
              title="Root"
            />
            <Route path="/sign-in" element={<SignIn />} title="Sign In " />
            <Route path="/register" element={<Register />} title="Register" />
            <Route path="/findsp/:cats" element={<Sps />} title="Service Providers" />
            <Route path="/search-result" element={<SearchResult />} title="Search Result " />
            <Route path="/product-result" element={<ProductResult/>} title="Search Result " />
            <Route path="/view-profile/:id" element={<SpProfile />} title="View Profile" />
            <Route path="/view-product/:id" element={<ViewProduct/>} title="View Product" />
            <Route path="/myservice" element={<AddService />} title="My Service" /> 
            <Route path="/createservice" element={<CreateService />} title="Create Service" />
            <Route path="/signup-seller" element={<SignUpSp />} title="Sign Up Service Provider" />
            <Route path="/create-servicecat" element={<AdminUpload />} title="Create Admin" />
            <Route path="/more-service" element={<MoreService />} title="More Service" />
            <Route path="/welcome" element={<ThankYou />} title="Welcome" />
            <Route path="/welcomeSp" element={<ThankYouSp/>} title="Welcome Sp" />
            <Route path="/terms&conditions" element={<TermsAndConditionsPage />} title="Terms and Conditions" />
            <Route path="/reset-password" element={<ResetEmail/>} title="Reset Password" />
            <Route path="/change-password/:id" element={ <ChangePassword/> } title="Change Password" />
            <Route path="/edit-profile" element={ <EditProfile/> } title="Edit Profile" />
            <Route path="/all-services" element={<AllServices/> } title="All Services" />
            <Route path="/edit-service/:id" element={<EditService/> } title="Edit Service" />
            <Route path="/select-search" element={<SelectSearch/> } title="Select" />
            <Route path="/search-product" element={<SearchProduct/> } title="Search" />
            <Route path="/search-service" element={<SearchService/> } title="Search" />
            <Route path="/menu" element={<Menu/>} title="Menu" />
            <Route path="/contact-us" element={<ContactUs/>} title="Contact us" />
            <Route path="/products/:cats" element={<Products/>} title="Products" />
            <Route path="/all-freelance" element={<MoreFreelance/>} title="Freelance services" />
            <Route path="/all-product" element={<MoreProduct/>} title="All Products" />
            <Route path="/services" element={<Services/>} title="Services" />
            <Route path="/services" element={<Services/>} title="Services" />
            <Route path="/create-product" element={<CreateProduct/>} title="Create Product" />
            <Route path="/my-product" element={<MyProduct/>} title="My Product" />
            <Route path="/edit-product/:id" element={<EditProduct/>} title="Edit Product" />
            <Route path="/seller-dashboard" element={<SellerDashboard/>} title="Seller Dashboard" />
            <Route path="/admin" element={<Admin/>} title="Admin" />
            <Route path="/allusers" element={<AllUsers/>} title="allusers" />
            <Route path="/all-products" element={<AllProducts/>} title="All Products" />
            <Route path="/all-categories" element={<AllCategories/>} title="All Categories" />
            <Route path="/select-category/:id" element={<SelectCategory/>} title="Select Categories" />
            <Route path="/all-freelance-service" element={<AllCategories1/>} title="All Freelance services" />
            <Route path="/all-handmade" element={<AllCategories2/>} title="All Handmade items" />
            <Route path="/all-local" element={<AllCategories3/>} title="All Local services" />
            <Route path="/blog" element={<Blog/>} title="Root Blog" />
            <Route path="/podcast" element={<Podcast/>} title="Root Talks" />
            <Route path="/blog-page/:title" element={<BlogPage/>} title="Blog page" />
            <Route path="/createblog" element={<CreateBlog/>} title="Create Blog" />
            <Route path="/term1" element={<Term1/>} title="Term1" />
            <Route path="/term2" element={<Term2/>} title="Term1" />
            <Route path="/seller-details" element={<SellerDetails/>} title="Seller Details" />
            
          </Routes>
        </Router>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}

export default App
