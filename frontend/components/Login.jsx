import React, { useEffect, useState } from "react";
import "./Register.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { base_URL } from "../Base_URL/Base_URL.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      let payload = { email, pass };
      console.log("pass frontend", pass, email);

      let res = await fetch(`${base_URL}user/logIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = await res.json();
      console.log("first data", data.msg);
      alert(data.msg);

      if (data.token && data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({ _id: data.user._id, name: data.user.name })
        );
        localStorage.setItem("token", data.token);
        navigate("/post");
      } else {
        alert("Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.log("login error", error);
      alert(error.msg);
    }
    setEmail("");
    setPass("");
  };

  return (
    <div className="main-register-container">
      <div className="register_container">
        <h2>Welcome to Log In!</h2>
        <form action="" className="register_form" onSubmit={handleLogIn}>
          <div className="register_input_box">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdEmail className="icon" />
          </div>
          <div className="register_input_box">
            <input
              type="password"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button className="register_button" onClick={handleLogIn}>
            Log in!
          </button>
          <div className="register_login">
            <p>
              Already you have an account? <Link to="/">Register!</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
