const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/learnLogin", {
})
.then(() => {
    console.log("Connected to MongoDB");
})

const UserRoute = require("./routes/users")
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/user", UserRoute);

app.get("/", (req,res)=>{
    
    res.json({ 
        message :"site is under maintanence"
    });
    
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
