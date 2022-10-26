const jwt = require("jsonwebtoken");

function authUser(req, res, next){
    const token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).send({error:"Pas de token existant"})         
    jwt.verify(token, "RANDOM_TOKEN_SECRET", (error, decoded) => {
        if (error) return res.status(401).send({error: "Token invalide"})
        req.email = decoded.email
        next();
    })                
}

module.exports= {authUser}
