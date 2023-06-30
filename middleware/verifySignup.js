const config = require('../config');

const verifySignup = {
    checkRolesExisted: function(req, res, next) {
        if(req.body.roles){
            for(i = 0; i < req.body.roles.length; i++){
                if(!config.ROLES.includes(req.body.roles[i])){
                    return res.status(400).send({
                        message: `Rol ${req.body.roles[i]} no existe`
                    })
                }
            }
        }

        next();
    }
}


module.exports = verifySignup;