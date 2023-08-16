import React, { useEffect, useState, createContext } from "react";
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
import { LoadScript } from "@react-google-maps/api";

const themes = {
  light: "",
  dark: "-dark",
  
};

export const SiteTheme = createContext(themes.light);

function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <div 
    className={`App  ${darkMode ? "dark" : "light"}`}>
      <SiteTheme.Provider value={darkMode ? themes.dark : themes.light}>
        <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
        
      <LoadScript googleMapsApiKey="AIzaSyBCC0p8BEYu5p51WHCJXpBRaKF93XeLm8I">
        <Router>
          <NavBar
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Routes>
            <Route path="/" element={<Home userInfo={userInfo} />} />
            <Route
              path="/login"
              element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
            />
            <Route
              path="/register"
              element={
                <Register userInfo={userInfo} setUserInfo={setUserInfo} />
              }
            />
            <Route
              path="/addnewCard"
              element={<NewCard userInfo={userInfo} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/:cardId" element={<CardDetails />} />
            <Route
              path="/favcards"
              element={<FavCards userInfo={userInfo} />}
            />
            <Route path="/mycards" element={<MyCards userInfo={userInfo} />} />
            <Route path="sandbox" element={<Sandbox />} />
            <Route path="/profile" element={<Profile userInfo={userInfo} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        </LoadScript>
      </SiteTheme.Provider>
    </div>
  );
}

export default App;
