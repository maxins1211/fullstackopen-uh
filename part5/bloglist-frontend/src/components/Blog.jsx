import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const changeVisibility = () => {
    setVisible(!visible);
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
          likes {blog.likes} <button>like</button> <br />
          {blog.user.name}
        </div>
      )}
    </div>
  );
};

export default Blog;
