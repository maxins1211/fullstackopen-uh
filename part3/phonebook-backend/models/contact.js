const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3 },
  number: String,
});
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
