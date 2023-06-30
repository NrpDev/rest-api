const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/User');
const Role = require('../models/Role');

const authJwt = {
    verifyToken: async function(req, res, next) {
        try {
            const token = req.headers["x-access-token"];
            if(!token) return res.status(403).send({mesagge: 'Token is required'});
    
            const decoded = jwt.verify(token, config.SECRET);
            req.userId = decoded.id;
    
            const user = await User.findById(req.userId, {password: 0});
            if(!user) return res.status(404).send({mesagge: 'Usuario no encontrado'})
    
            next();
        } catch (error) {
            return res.status(401).send({message: 'Unauthorized'})
        }
    },
    
    isAdmin: async function(req, res, next){
       const user =  await User.findById(req.userId);
       const roles = await Role.find({_id: {$in: user.roles}});
       
        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === "admin"){
                next();
                return;
            }
        }

        return res.status(403).send({message: 'Necesitas permisos de administrador'})
    }
    
}



module.exports = authJwt;