import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login"
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import About from "./components/About";
import FavCards from "./components/FavCards";
import MyCards from "./components/MyCards";
import Sandbox from "./components/Sandbox";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <ToastContainer></ToastContainer>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About/>} />
          <Route path="/favcards" element={<FavCards/>} />
          <Route path="/mycards" element={<MyCards/>} />
          <Route path="sandbox" element={<Sandbox/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
