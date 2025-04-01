import React, { useState } from "react";
import "./GeneratePost.css";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { base_URL } from "../Base_URL/Base_URL.js";

const GeneratePost = () => {
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  const handleForm =async(e)=>{
    e.preventDefault()
    try {
      const payload = {
        title,
        content
      }
      let response = await fetch(`${base_URL}post/create`, {
        method:"POST",
        headers :{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify(payload)
      })
      let data = await response.json()
      console.log("data on res",data.msg, data)
      alert(data.msg)
      navigate("/post")
    } catch (error) {
      console.log("error in generatting post", error )
      alert(error.msg)
    }
  }

  return (
    <div className="generatePost-container">
      <div className="post-content-first">
      <Navbar />
      </div>
      <div className="generatePost-content">
        <h1>Create New Post</h1>
        <form className="generatePost-container-form" onSubmit={handleForm}>
          {/* <img src={author} alt="Post" /> */}
          {/* <input type="text" placeholder="Author name..." value={author} onChange={(e)=>setAuthor(e.target.value)} /> */}
          <input className="generatePost-title-input" type="text" placeholder="title..." value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="generatePost-content-input" type="text" placeholder="content..." value={content} onChange={(e)=>setContent(e.target.value)} />
          <input type="submit" onSubmit={handleForm} />
        </form>
      </div>
    </div>
  );
};

export default GeneratePost;
