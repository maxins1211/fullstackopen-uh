import { useState } from "react";

const Blog = ({ blog, increaseLike }) => {
  const [visible, setVisible] = useState(false);
  const changeVisibility = () => {
    setVisible(!visible);
  };

  const addLike = () => {
    increaseLike(blog.id, {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: ++blog.likes,
    });
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        {!visible ? (
          <button onClick={changeVisibility}>view</button>
        ) : (
          <button onClick={changeVisibility}>hide</button>
        )}
      </div>

      {visible && (
        <div>
          {blog.url} <br />
          likes {blog.likes} <button onClick={addLike}>like</button> <br />
          {blog.user.name}
        </div>
      )}
    </div>
  );
};

export default Blog;
