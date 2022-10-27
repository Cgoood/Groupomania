const express = require("express")
const postRouter = express.Router()
const { authUser } = require("../middleware/authUser")
const { getPosts, createComment,createPost, deletePost, modifyPost, likePost} = require("../controllers/posts")
const multer = require("../middleware/multer")


postRouter.post("/:id", authUser, createComment)
postRouter.delete("/:id", authUser, multer, deletePost)
postRouter.get("/", authUser, getPosts)
postRouter.post("/", authUser, multer, createPost)
postRouter.put("/:id", authUser,multer, modifyPost)
postRouter.post("/:id/like", authUser, likePost)


module.exports = {postRouter}