import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import About from "./components/About";
import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import Sandbox from "./components/Sandbox";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import NewCard from "./components/NewCard";
import CardDetails from "./components/CardDetails";

function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );

  return (
    <>
      <ToastContainer></ToastContainer>
      <Router>
        <NavBar userInfo={userInfo} setUserInfo={setUserInfo} />
        <Routes>
          <Route path="/" element={<Home userInfo={userInfo} />} />
          <Route
            path="/login"
            element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
          />
          <Route
            path="/register"
            element={<Register userInfo={userInfo} setUserInfo={setUserInfo} />}
          />
          <Route path="/addnewCard" element={<NewCard userInfo={userInfo} />} />
          <Route path="/about" element={<About />} />
          <Route path="/:cardId" element={<CardDetails/>} />
          <Route path="/favcards" element={<FavCards />} />
          <Route path="/mycards" element={<MyCards userInfo={userInfo} />} />
          <Route path="sandbox" element={<Sandbox />} />
          <Route path="/profile" element={<Profile userInfo={userInfo} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
