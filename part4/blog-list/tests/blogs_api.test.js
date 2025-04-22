const moogoose = require("mongoose");
const { test, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper")
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test.only("all blogs are returned as JSON", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    const blogs = await helper.blogsInDb();
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
});

test.only("unique identifier property of blog post is named id", async () => {
    const blogs = await helper.blogsInDb();
    assert(blogs[0].hasOwnProperty("id"), true)
})

after(async () => {
    await moogoose.connection.close()
})
