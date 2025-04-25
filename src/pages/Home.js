import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(sortPosts(storedPosts, sortBy));
  }, [sortBy]);

  const sortPosts = (posts, sortBy) => {
    return [...posts].sort((a, b) => {
      if (sortBy === "createdAt")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "upvotes") return (b.upvotes || 0) - (a.upvotes || 0);
      return 0;
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Writer's Nook</h1>
        <Link to="/create" className="link">
          Create New Post
        </Link>
      </header>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Newest</option>
        <option value="upvotes">Most Upvoted</option>
      </select>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>Upvotes: {post.upvotes || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
