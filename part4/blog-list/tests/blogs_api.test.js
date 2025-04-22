const moogoose = require("mongoose");
const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const assert = require("node:assert");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test.only("all blogs are returned as JSON", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    const blogs = await Blog.find({})
    assert.strictEqual(blogs.length, initialBlogs.length)
});

after(async () => {
    await moogoose.connection.close()
})
