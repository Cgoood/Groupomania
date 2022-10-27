const {
    prisma
} = require("../db/db")
const fs = require("fs")

async function getPosts(req, res) {
    const email = req.email
    const currentUser = await prisma.user.findUnique({
        where:{
            email: req.email
        }
    })
    const liked = await prisma.user_post_like.findMany({
        where:{
            userId: currentUser.id,
            likes: true
        }
        
    })
 
    const posts = await prisma.post.findMany({
        include: {
            comments: {
                orderBy: {
                    createdAt: "asc"
                },
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            user: {
                select: {
                    email: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    res.send({
        posts,
        email,
        liked
    })
}

async function createPost(req, res) {
    const content = req.body.content
    const email = req.email
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const userId = user.id
        const post = {
            userId,
            content
        }
        addImageUrlToPost(req, post)
        const result = await prisma.post.create({
            data: post
        })
        res.send({
            post: result
        })
    } catch (err) {
        res.status(500).send({
            error: "Echec de la création du post"
        })
    }
}

function addImageUrlToPost(req, post) {
    const hasImage = req.file != null
    if (!hasImage) return
    let pathToImage = req.file.path.replace("\\", "/")
    const protocol = req.protocol
    const host = req.get("host")
    const url = `${protocol}://${host}/${pathToImage}`
    post.imageUrl = url
}

async function createComment(req, res) {
    const postId = Number(req.params.id)

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            user: {
                select: {
                    id: true
                }
            }
        }
    })
    if (post == null) {
        return res.status(404).send({
            error: "le poste n'a pas été trouvé"
        })
    }
    const userCommenting = await prisma.user.findUnique({
        where: {
            email: req.email
        }
    })

    const userId = userCommenting.id
    const commentToSend = {
        userId,
        postId,
        content: req.body.comment
    }
    const comment = await prisma.comment.create({
        data: commentToSend
    })
    res.send({
        comment
    })
}

async function deletePost(req, res) {
    const postId = Number(req.params.id)
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
        })
        if (post !== null) {
            if (post.imageUrl != null) {
                const filename = post.imageUrl.split("/uploads/")[1]
                fs.unlink(`uploads/${filename}`, (err) => {
                    if (err) throw (err)
                })
                await prisma.comment.deleteMany({
                    where: {
                        postId
                    }
                })
                await prisma.post.delete({
                    where: {
                        id: postId
                    }
                })
                res.status(200).send({
                    message: `le post ${postId} et l'image ont bien été supprimés`
                })
            } else {
                await prisma.comment.deleteMany({
                    where: {
                        postId
                    }
                })
                await prisma.post.delete({
                    where: {
                        id: postId
                    }
                })
                res.status(200).send({
                    message: `le post ${postId} a bien été supprimé`
                })
            }
        } else {
            return res.status(404).send({
                error: "le post n'a pas été trouvé"
            })
        }
    } catch (err) {
        res.status(500).send({
            error: "erreur interne"
        })
    }
}

async function modifyPost(req, res) {
    const postId = Number(req.params.id)
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    const content = (req.body.content)
    const hasImage = req.file != null
    try {
        if (hasImage) {
            if (post.imageUrl !== null) {
                let pathToImage = req.file.path.replace("\\", "/")
                const protocol = req.protocol
                const host = req.get("host")
                const url = `${protocol}://${host}/${pathToImage}`
                const filename = post.imageUrl.split("/uploads/")[1]
                fs.unlink(`uploads/${filename}`, (err) => {
                    if (err) throw (err)
                })
                await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        content: content,
                        imageUrl: url
                    },
                })
                return res.status(200).json({
                    message: "post et image modifiés"
                })
            } else {
                let pathToImage = req.file.path.replace("\\", "/")
                const protocol = req.protocol
                const host = req.get("host")
                const url = `${protocol}://${host}/${pathToImage}`
                await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        content: content,
                        imageUrl: url
                    },
                })
                return res.status(200).json({
                    message: "post modifié et image ajoutée"
                })
            }
        } else {
            await prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    content: content,
                },
            })
            res.status(200).json({
                message: "post modifié "
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

async function likePost(req, res) {
    const postId = Number(req.params.id)
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    const user = await prisma.user.findUnique({
        where: {
            email: req.email
        }
    })
    const userId = user.id
    const getLiked = await prisma.user_post_like.findMany({
        where: {
            userId: userId,
            postId: postId,
            likes: true
        }
    })
    const checkLikeStatus = getLiked.findIndex((el) => el.postId)
    try {
        if (post !== null) {
            if (checkLikeStatus === -1) {
                await prisma.user_post_like.create({
                    data: {
                        userId: userId,
                        postId: postId,
                        likes: true
                    }
                });
                await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        likes: {
                            increment: 1
                        }
                    }
                })
                res.status(201).json({
                    message: `le message ${postId} a été liké`,
                    like: true
               })
            } else {
                await prisma.user_post_like.deleteMany({
                    where: {
                        userId: userId,
                        postId: postId,
                        likes: true
                    },
                });
                await prisma.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        likes: {
                            increment: -1
                        }
                    }
                })
                res.status(201).json({
                    message: "like retiré",
                    like: false
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
module.exports = {
    getPosts,
    createPost,
    createComment,
    deletePost,
    modifyPost,
    likePost
}