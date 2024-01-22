import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";

import { RecoilRoot } from "recoil";

const NotLoggedInRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const LoggedInRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        {localStorage.getItem("token") ? (
          <LoggedInRoutes />
        ) : (
          <NotLoggedInRoutes />
        )}
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
