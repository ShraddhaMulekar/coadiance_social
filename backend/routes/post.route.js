import express from "express";
import { PostModel } from "../models/post.model.js";
import auth from "../middlewares/auth.middleware.js";

const postRouter = express.Router();

// create a new post
postRouter.post("/create", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    const newPost = new PostModel({
      title,
      content,
      author: userId,
      likes: [],
      comments: [],
    });
    // const newPost = new PostModel({ ...req.body, author: req.body.userId });
    await newPost.save();
    res.json({ msg: "new post created successfully!", newPost });
  } catch (error) {
    console.log(error, "post req in post router");
    res.json({ msg: "error in post router in post req", error });
  }
});

// check all posts
postRouter.get("/all", async (req, res) => {
  try {
    const allPost = await PostModel.find();
    if(!allPost){
      res.json({msg:"No post found"})
    }
    res.json({ msg: "all posts", allPost });
  } catch (error) {
    res.json({ msg: "error in post get route", error });
  }
});

// edit post
postRouter.patch("/edit/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { title, content } = req.body;

    let post = await PostModel.findById(id);

    if (!post) {
      res.json({ msg: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      res.json({ msg: "You can only edit your post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.json({ msg: "Post updated successfully!", post });
    console.log("edit post", post);
  } catch (error) {
    console.log(error, "patch req in edit post router");
    res.json({ msg: "error in edit post router in patch req", error });
  }
});

//delete post
postRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const post = await PostModel.findById(id);

    if (!post) {
      res.json({ msg: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      res.json({ msg: "You can only delete your post!" });
    }

    await PostModel.findByIdAndDelete(id);
    res.json({ msg: "Post deleted successful!" });
  } catch (error) {
    console.log("error in delete post", error);
    res.json({ msg: "error in delete post!", error });
  }
});

// like post
postRouter.patch("/like/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; //post id
    const userId = req.userId;

    const post = await PostModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the user already liked the post
    const likeIndex = post.likes.indexOf(userId);
    console.log("likeIndex", likeIndex);
    if (likeIndex !== -1) {
      // User has already liked the post, so remove the like
      post.likes.splice(likeIndex, 1);
    } else {
      // User hasn't liked the post, so add the like
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: "Like status updated!", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//comment post
postRouter.patch("/comment/:id", auth, async (req, res) => {
  try {
    const commentPost = await PostModel.findById(req.params.id);
    if (!commentPost) {
      res.json({ msg: "post not found" });
    }

    commentPost.comments.push({ user: req.body.userId, text: req.body.text });
    await commentPost.save();
    res.json({ msg: "comment post successful!", commentPost });
  } catch (error) {
    console.log("error in comment post", error);
    res.json({ msg: "error in comment post", error });
  }
});

export default postRouter;
