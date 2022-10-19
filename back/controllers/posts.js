const {prisma} = require("../db/db")

async function getPosts(req,res){
    const email = req.email
    const posts = await prisma.post.findMany({
        include:{
            comments:{
                orderBy: {
                    createdAt: "asc"
                },
                include:{
                    user:{
                        select:{
                            email:true
                        }
                    }    
                }
            },
            user:{
                select:{
                    email: true,
                }
            }
        },
        orderBy:{
            createdAt: "desc"
        }
    }) 
    res.send ({posts, email})   
}

async function createPost(req, res){
    const content = req.body.content
    const email = req.email
    try {
        const user = await prisma.user.findUnique({where: {email}})
        const userId = user.id
        const post = {userId, content}
        addImageUrlToPost(req, post)
        const result = await prisma.post.create({data: post})
        res.send({post: result})
    } catch(err) {
        res.status(500).send({error: "Echec de la création du post"})

    }
}

function addImageUrlToPost(req, post){
    const hasImage = req.file != null
    if(!hasImage) return
    let pathToImage = req.file.path.replace("\\", "/")
    const protocol = req.protocol
    const host = req.get("host")
    const url = `${protocol}://${host}/${pathToImage}`
    post.imageUrl = url
}

async function createComment(req,res){
    const postId = Number(req.params.id)
    const post = await prisma.post.findUnique({
        where: {id: postId},
        include:{
            user:{
                select:{
                    id:true
                }
            }
        }
    })
    if (post == null){
        return res.status(404).send({error: "le poste n'a pas été trouvé"})
    }

    const userCommenting = await prisma.user.findUnique({
        where:{email:req.email}
    })

    const userId = userCommenting.id
    
    // const user = req.email
    const commentToSend = { userId, postId, content: req.body.comment}
    const comment = await prisma.comment.create({data: commentToSend})
    res.send({comment})
}

async function deletePost (req,res){
    const postId = Number(req.params.id)
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include:{
                user:{
                    select:{
                        email: true
                    }
                }
            }
        })
        
        console.log("post:", post)
        if(post == null){
        return res.status(404).send({error:"le post n'a pas été trouvé"})
        }
        const email= req.email
        if(email !== post.user.email){
            return res.status(403).send({error: "vous ne pouvez pas supprimer ce post"})
        }
        await prisma.comment.deleteMany({where:{postId}})
        await prisma.post.delete({where: {id: postId}})
        res.send({message: `le post ${postId} a bien été supprimé`})
    } catch (err) {
        res.status(500).send({error: "erreur interne"})  
    }
}

async function modifyPost (req,res){
    const postId = Number(req.params.id)
    console.log("postId:", postId)
    
}

async function likePost(req,res){
    const postId = Number(req.params.id)
    console.log("postId:", postId)


}



module.exports = {getPosts, createPost,createComment, deletePost, modifyPost, likePost}