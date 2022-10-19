const express = require("express")
const postRouter = express.Router()
const { authUser } = require("../middleware/authUser")
const { getPosts, createComment,createPost, deletePost, modifyPost} = require("../controllers/posts")
const multer = require("../middleware/multer")


postRouter.post("/:id", authUser, createComment)
postRouter.delete("/:id", authUser, deletePost)
postRouter.get("/", authUser, multer, getPosts)
postRouter.post("/", authUser, multer, createPost)
postRouter.put("/", authUser, modifyPost)


module.exports = {postRouter}