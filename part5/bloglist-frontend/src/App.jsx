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
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
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

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const addedBlog = await blogService.addBlog(newBlog);
    const newBlogs = blogs.concat(addedBlog);
    setBlogs(newBlogs);
    setMessage({
      content: `a new blog ${newBlog.title} added`,
      isError: false,
    });
    setNewBlog({ title: "", author: "", url: "" });
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
            <CreateBlogForm
              handleCreateBlog={handleCreateBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
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
