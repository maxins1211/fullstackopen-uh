import React from "react";
import { useState } from "react";
const CreateBlogForm = (props) => {
  const { createBlog } = props;
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const addBlog = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
  };
  return (
    <div>
      <h2>Create new</h2>
      <form action="" onSubmit={addBlog}>
        <label>title:</label>
        <input
          type="text"
          value={newBlog.title}
          onChange={(e) => {
            setNewBlog({ ...newBlog, title: e.target.value });
          }}
        />
        <br />
        <label>author:</label>
        <input
          type="text"
          value={newBlog.author}
          onChange={(e) => {
            setNewBlog({ ...newBlog, author: e.target.value });
          }}
        />
        <br />
        <label>url:</label>
        <input
          type="text"
          value={newBlog.url}
          onChange={(e) => {
            setNewBlog({ ...newBlog, url: e.target.value });
          }}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
