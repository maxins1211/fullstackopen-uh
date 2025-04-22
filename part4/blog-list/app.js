require('express-async-errors')
const config = require("./utils/config");
const express = require("express");
const morgan = require("morgan");
const blogsRouter = require("./controllers/blogs.route");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const app = express();

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB");
    })
    .catch((err) => {
        logger.error("error connection to MongoDB:", err.message);
    });
morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(express.json());
app.use(morgan(":method :url :status - :response-time ms :req-body"));
app.use("/api/blogs", blogsRouter);

module.exports = app