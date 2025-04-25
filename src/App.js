import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import CreatePost from "./pages/CreatePost.js";
import PostPage from "./pages/PostPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
