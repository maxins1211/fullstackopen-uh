import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({ content: `Login successfully`, isError: false });
      setTimeout(() => setMessage(null), 3000);
    } catch (exception) {
      setMessage({ content: `Wrong username or password`, isError: true });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    const addedBlog = await blogService.addBlog(blogObject);
    const newBlogs = blogs.concat(addedBlog);
    setBlogs(newBlogs);
    setMessage({
      content: `a new blog ${blogObject.title} added`,
      isError: false,
    });
    setTimeout(() => setMessage(null), 3000);
  };
  return (
    <div>
      {!user ? <h2>Log in to application</h2> : <h2>blogs</h2>}
      <Notification message={message} />
      {!user && (
        <LoginForm
          username={username}
          handleLogin={handleLogin}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      {user && (
        <div>
          <div>
            {" "}
            <span>{user.name} logged in</span>
            <button onClick={handleLogout}>log out</button>
          </div>
          <br />
          <Togglable buttonLabel="new blog">
            <CreateBlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
