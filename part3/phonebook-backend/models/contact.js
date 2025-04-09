const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const contactSchema = new mongoose.Schema({ name: String, number: String });
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
