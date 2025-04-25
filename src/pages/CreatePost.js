import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const editingPost = location.state?.post;

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setImageUrl(editingPost.imageUrl);
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required!");

    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

    if (editingPost) {
      const updatedPosts = existingPosts.map((p) =>
        p.id === editingPost.id ? { ...p, title, content, imageUrl } : p
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    } else {
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        imageUrl,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        comments: [],
      };
      localStorage.setItem(
        "posts",
        JSON.stringify([...existingPosts, newPost])
      );
    }
    navigate("/");
  };

  return (
    <div className="container">
      <h1>{editingPost ? "Edit Post" : "Create a New Writing Post"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story or poem..."
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL (optional)"
        />
        <button type="submit">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
