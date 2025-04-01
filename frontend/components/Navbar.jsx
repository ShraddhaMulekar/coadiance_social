import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import { base_URL } from "../Base_URL/Base_URL.js";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not Log in!");
        return;
      }

      let res = await fetch(`${base_URL}user/logOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      console.log(data.msg);
      alert(data.msg);

      if (data.msg === "Log out successful!") {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.msg);
    }
  };
  return (
    <nav >
      <div className="post-content-first">
        <div className="generate-post">
          <Link to="/generatePost" className="generatePost-link">
            <h2>Generate Post!</h2>
          </Link>
        </div>
        <div className="generate-post">
          <Link to="/post" className="generatePost-link">
            <h2>Check Post!</h2>
          </Link>
        </div>
        <div className="generate-chat">
          <Link to="/chatPost" className="generateChat-link">
            <h2>Chat with Friend!</h2>
          </Link>
        </div>
        <div className="generate-post">
          <Link className="generatePost-link">
            <h2 onClick={handleLogOut}>Log out!</h2>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
