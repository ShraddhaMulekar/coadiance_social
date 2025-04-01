// import Navbar from '../components/Navbar'
import Register from "../components/Register";
import Login from "../components/Login";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GeneratePost from "../components/GeneratePost.jsx";
import Chat from "../components/Chat.jsx";
import Navbar from "../components/Navbar.jsx";
import CheckPost from "../components/CheckPost.jsx";
import io from "socket.io-client"
import { base_URL } from "../Base_URL/Base_URL.js";

const socket = io.connect(`${base_URL}`)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<CheckPost />} />
        <Route path="/generatePost" element={<GeneratePost />} />
        <Route path="/chatPost" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
