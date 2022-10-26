require("dotenv").config()
const express = require("express");
const port = 3000
const app = express()
const usersControllers = require("./controllers/users")
const  {postRouter } = require("./routes/posts")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json());
app.use("/uploads", express.static("uploads"))

app.use("/posts", postRouter)
app.post("/auth/login", usersControllers.logUser)
app.post("/auth/signup", usersControllers.signUpUser)

app.listen(port, () => console.log(`listening on ${port}`))
console.log("port:", port)