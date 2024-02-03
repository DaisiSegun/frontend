import React from "react"
import Home from "./pages/home/Home"
import Sps from "./pages/sps/Sps"
import SpProfile from "./pages/spProfile/SpProfile"
import AddService from "./pages/addService/AddService"
import CreateService from "./pages/createService/CreateService"
import SignIn from "./pages/signIn/SignIn"
import SignUpSp from "./pages/signUpSp/SignUpSp"
import Register from "./pages/register/Register"



import {HashRouter as Router, Routes, Route} from 'react-router-dom'
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


function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
            <Route path="/view-profile/:id" element={<SpProfile />} title="View Profile" />
            <Route path="/myservice" element={<AddService />} title="My Service" />
            <Route path="/createservice" element={<CreateService />} title="Create Service" />
            <Route path="/signup-sp" element={<SignUpSp />} title="Sign Up Service Provider" />
            <Route path="/create-admin" element={<AdminUpload />} title="Create Admin" />
            <Route path="/more-service" element={<MoreService />} title="More Service" />
            <Route path="/welcome" element={<ThankYou />} title="Welcome" />
            <Route path="/welcomeSp" element={<ThankYouSp/>} title="Welcome Sp" />
            <Route path="/terms&conditions" element={<TermsAndConditionsPage />} title="Terms and Conditions" />
            <Route path="/reset-password" element={<ResetEmail/>} title="Reset Password" />
            <Route path="/change-password/:id" element={ <ChangePassword/> } title="Change Password" />
            <Route path="/edit-profile" element={ <EditProfile/> } title="Edit Profile" />
            <Route path="/all-services" element={<AllServices/> } title="All Services" />
            <Route path="/edit-service/:id" element={<EditService/> } title="Edit Service" />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App
