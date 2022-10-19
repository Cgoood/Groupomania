const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {prisma} = require("../db/db")


const {
    users
} = require("../db/db.js")

async function logUser(req, res) {
    const {
        email,
        password
    } = req.body
    try{    
        const user = await getUser(email)
        if (user == null) return res.status(404).send({error: "L'utilisateur n'existe pas"})
            
        const isPasswordCorrect = await checkPassword(user, password)
        if(!isPasswordCorrect) return res.status(401).send({error: "Le mot de passe est incorrect"})
        const token = makeToken(email)
        res.send({token, email: user.email})
        }
        
        catch(error){
            res.status(500).send({error})
        }
}

function makeToken(email) {
    return jwt.sign({
            email: email
        },
        "RANDOM_TOKEN_SECRET", {
            expiresIn: '24h'
        })
}

function getUser(email) {
    return prisma.user.findUnique({ where:{email}})
}

function checkPassword(user, password) {
    return bcrypt.compare(password, user.password)
}

async function signUpUser(req,res){
    const { email, password, confirmPassword } = req.body
    try {   
        if (password !== confirmPassword) return res.status(400).send({error: "Les mots de passe ne sont pas identiques"})
        const userDb = await getUser(email)
        if (userDb != null) return res.status(400).send({error: "L'utilisateur existe déja"})
        const hash = await hashPassword(password)
            const user = await saveUser({email, password:hash})
            res.send({user})
        }
        catch(error){
            (res.status(500).send({error}))
        }
}

function saveUser(user) {
    users.push(user)
    return prisma.user.create({data:user})
}

function hashPassword(password){
    return bcrypt.hash(password,10)
}

module.exports = {logUser, signUpUser}