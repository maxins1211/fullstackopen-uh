require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
morgan.token('req-body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status - :response-time ms :req-body'))

app.get('/api/blogs', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})