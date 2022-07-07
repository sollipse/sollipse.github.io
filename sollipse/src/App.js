import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavigationBar";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./layouts/HomePage.js";
import AboutPage from "./layouts/AboutPage.js";
import ContactPage from "./layouts/ContactPage.js";
import MusicPlayer from "./components/MusicPlayer";
import MusicSphere from "./components/MusicSphere";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <div className="absolute top-2 ml-64 flex justify-center align-center">
          <MusicPlayer />
        </div>
        <MusicSphere />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
