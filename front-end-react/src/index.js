import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import Auth from "./components/Auth";
import Home from "./components/Home";
import UserContextProvider from "./contexts/UserContext";
import PostContextProvider from "./contexts/PostContext";
import CreatePost from "./components/CreatePost";
import MyPosts from "./components/MyPosts";
import EditPost from "./components/EditPost";
import ViewPost from "./components/ViewPost";

ReactDOM.render(
  <UserContextProvider>
    <PostContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blog-posts" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/view-posts/:id" element={<ViewPost />} />
          <Route path="/user-posts" element={<MyPosts />} />
        </Routes>
      </BrowserRouter>
    </PostContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
