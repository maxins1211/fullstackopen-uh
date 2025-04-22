const moogoose = require("mongoose");
const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test.only("all blogs are returned as JSON", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    const blogs = await helper.blogsInDb();
    assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

test.only("unique identifier property of blog post is named id", async () => {
    const blogs = await helper.blogsInDb();
    assert(blogs[0].hasOwnProperty("id"), true);
});

test.only("a valid blog can be added", async () => {
    const blogsBeforeAdding = await helper.blogsInDb();
    const newBlog = {
        title: "Go To Statement Considered Harmful 2",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 6,
    };
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAfterAdding = await helper.blogsInDb();
    assert.strictEqual(blogsBeforeAdding.length + 1, blogsAfterAdding.length)
    const addedBlog = blogsAfterAdding[blogsAfterAdding.length - 1]
    assert(addedBlog.title.includes("Go To Statement Considered Harmful 2"), true)
});
after(async () => {
    await moogoose.connection.close();
});
