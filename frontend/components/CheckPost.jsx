import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  MdDeleteForever,
  MdOutlineBookmarkBorder,
  MdOutlineQuickreply,
} from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import Navbar from "./Navbar.jsx";
import { CiEdit } from "react-icons/ci";
import { base_URL } from "../Base_URL/Base_URL.js";

const CheckPost = () => {
  let [posts, setPost] = useState([]);
  let [edit, setEdit] = useState(null);
  let [updateEdit, setUpdateEdit] = useState({ title: "", content: "" });

  const fetchCheckPost = async () => {
    try {
      // let token = localStorage.getItem("token")
      let res = await fetch(`${base_URL}post/all`, {
        method : "GET",
        headers:{
          "Content-Type" : "application/json",
          // "Authorization" : `Bearer ${token}`
        }
      });
      let data = await res.json();
      console.log("data fetch", data);
      if(data && data.allPost){
        setPost(data.allPost)
      } else{
        console.log('no post found or error in fetching data')
      }
    } catch (error) {
      console.log("error in fetch check post", error);
    }
  };

  const handleLikeBtn = async (postId) => {
    // console.log("postid", postId)
    try {
      let token = localStorage.getItem("token");
      let res = await fetch(`${base_URL}post/like/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      // console.log("data from handle like btn", data);
      if (data) {
        // Update the state with the new likes array
        setPost((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              // Check if the current user has liked the post
              const isLiked = post.likes.includes(data.userId); // Assuming data.userId is the current user

              // If the user has liked, remove their like; otherwise, add their like
              let updatedLikes = isLiked
                ? post.likes.filter((userId) => userId !== data.userId) // Remove like
                : [...post.likes, data.userId]; // Add like

              // Return updated post with the modified likes array
              return { ...post, likes: updatedLikes };
            }
            return post;
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBtn = async (postId) => {
    setEdit(postId);
    const post = posts.find((post) => post._id === postId);
    setUpdateEdit({ title: post.title, content: post.content });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBtn = async (postId) => {
    try {
      let token = localStorage.getItem("token");
      let res = await fetch(`${base_URL}post/edit/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateEdit),
      });
      let data = await res.json();
      console.log("edit data", data);
      if (data.post) {
        setPost((prevPost) =>
          prevPost.map((post) =>
            post._id === postId ? { ...post, ...updateEdit } : post
          )
        );
        setEdit(null);
      }
    } catch (error) {
      console.log("error in handle edit btn", error);
    }
  };

  const handleDeleteBtn = async (postId) => {
    try {
      let token = localStorage.getItem("token");
      const res = await fetch(`${base_URL}post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("delete data check frontend", data);
      if (data.msg === "Post deleted successful!") {
        setPost(posts.filter((post) => post._id !== postId));
      }
      console.log("setPost", data.msg);
      alert(data.msg);
    } catch (error) {
      console.log("error in delete post frontend", error);
    }
  };

  useEffect(() => {
    fetchCheckPost();
  }, []);

  console.log("first post", posts);
  return (
    <div className="post-main-container">
      <div className="post-container">
        <div className="post-content-first">
          <Navbar />
        </div>
        <div className="show-post">
          {posts.length > 0 ? (
            posts.map((post) => {
              // console.log("post", post)
              return (
                <div className="show-post-content">
                  <div>
                    <IoPersonCircleSharp className="img" />
                    {/* <h3>Author: {post.author} </h3> */}
                    {edit === post._id ? (
                      <div className="update-content-box">
                        <input
                          className="update-title"
                          type="text"
                          name="title"
                          value={updateEdit.title}
                          onChange={handleInputChange}
                        />
                        <textarea
                          className="update-content"
                          name="content"
                          value={updateEdit.content}
                          onChange={handleInputChange}
                        />
                        <button
                          className="update-button"
                          onClick={() => handleSubmitBtn(post._id)}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2 className="head2">Title: {post.title}</h2>
                        <h3 className="head3">Content: {post.content}</h3>
                        {/* <p>postId: {post._id}</p> */}
                      </>
                    )}
                  </div>
                  <div className="allBtns">
                    <div className="like">
                      <button onClick={() => handleLikeBtn(post._id)}>
                        <BiLike className="btn" />
                        <span>{post.likes?.length || 0}</span>
                      </button>
                    </div>
                    <div className="comment">
                      <button>
                        <MdOutlineQuickreply className="btn" />
                        <span>{post.comments?.length || 0}</span>
                      </button>
                    </div>
                    <div className="view">
                      <button>
                        <FaRegEye className="btn" />
                      </button>
                    </div>
                    <div className="bookmark">
                      <button>
                        <MdOutlineBookmarkBorder className="btn" />
                      </button>
                    </div>
                  </div>
                  <div className="editDltBtn">
                    <button onClick={() => handleEditBtn(post._id)}>
                      <CiEdit className="editBtn" />
                    </button>
                    <button onClick={() => handleDeleteBtn(post._id)}>
                      <MdDeleteForever className="dltBtn" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No post available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckPost;
