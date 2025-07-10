const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/learnLogin", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Proper CORS setup — only once, before any route
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// ✅ Routes
const UserRoute = require("./routes/users");
const ChatRoute = require("./routes/chat");
app.use("/user", UserRoute);
app.use("/chat",ChatRoute)

// ✅ Default route
app.get("/", (req, res) => {
  res.json({ message: "site is under maintenance" });
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
