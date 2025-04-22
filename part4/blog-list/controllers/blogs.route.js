const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    });
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id
    await Blog.findByIdAndDelete(id);
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id
    const { likes } = request.body;
    const blog = await Blog.findById(id);
    if (!blog) {
        response.status(404).end()
    }
    blog.likes = likes
    const updatedNote = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
    response.status(200).json(updatedNote)
})
module.exports = blogsRouter;
