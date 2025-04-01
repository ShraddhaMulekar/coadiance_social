import React, { useState } from "react";
import "./Register.css";
import { FaLock, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { LiaCriticalRole } from "react-icons/lia";
import { GiSkills } from "react-icons/gi";
import { base_URL } from "../Base_URL/Base_URL.js";

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [skill, setSkill] = useState("");
  const [role, setRole] = useState("");

  let handleRegister = async (e) => {
    e.preventDefault();
    try {
      let payload = { name, email, pass, skill, role };
      // console.log(payload, "payload")
      let data = await fetch(`${base_URL}user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let response = await data.json();
      console.log("first responce", response)
      console.log(response.msg);
      alert(response.msg);
      if(response.msg === "register successfully!"){
        navigate("/login")
      }
      setName("");
      setEmail("");
      setPass("");
      setSkill("");
      setRole("");
    } catch (error) {
      // console.log(error);
      alert(error.msg);
    }
  };

  return (
    <div className="main-register-container">
      <div className="register_container">
        <h2>Welcome to Register!</h2>
        <form action="" className="register_form" onSubmit={handleRegister}>
          <div className="register_input_box">
            <input
              type="name"
              placeholder="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUserTie className="icon" />
          </div>
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
          <div className="register_input_box">
            <input
              type="skill"
              placeholder="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <GiSkills className="icon" />
          </div>
          <div className="register_input_box">
            <input
              type="role"
              placeholder="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <LiaCriticalRole className="icon" />
          </div>
          <button className="register_button" onClick={handleRegister}>
            Register!
          </button>
          <div className="register_login">
            <p>
              Don't have an account? <Link to="/login">Log In!</Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
