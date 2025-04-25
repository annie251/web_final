import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = existingPosts.find((p) => p.id === id);
    setPost(foundPost);
  }, [id]);

  const updatePostInStorage = (updatedPost) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((p) => (p.id === id ? updatedPost : p));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleUpvote = () => {
    const updatedPost = { ...post, upvotes: (post.upvotes || 0) + 1 };
    updatePostInStorage(updatedPost);
    setPost(updatedPost);
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const updatedComments = [...(post.comments || []), comment.trim()];
    const updatedPost = { ...post, comments: updatedComments };
    updatePostInStorage(updatedPost);
    setPost(updatedPost);
    setComment("");
  };

  const handleEdit = () => {
    navigate("/create", { state: { post } });
  };

  const handleDelete = () => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.filter((p) => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>Upvotes: {post.upvotes}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Writing visual" />}
      <p>{post.content}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      <div className="comments">
        <h3>Comments</h3>
        {post.comments &&
          post.comments.map((c, idx) => (
            <p key={idx} className="comment">
              - {c}
            </p>
          ))}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default PostPage;
