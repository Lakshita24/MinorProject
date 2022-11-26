import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./components/Login";
import App from "./App";
import EnterDetails from "./components/DetailsForm";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ResponsiveDrawer from "./components/Dashboard";
import SignUp from "./components/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <>
    <BrowserRouter>
      <Routes>
        <Route path="detailform" element={<EnterDetails/>}/>
        <Route path="login" element={<Form />} />
        <Route path="/" element={<App/>} />
        <Route path="dashboard" element={<ResponsiveDrawer/>} />
        <Route path="signup" element={<SignUp/>} />
      </Routes>
      
    </BrowserRouter>
    {/* </GoogleOAuthProvider>; */}
    </>
);
