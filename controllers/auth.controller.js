const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const config = require('../config');
const Role = require('../models/Role');

const controller = {
    signUp: async function(req, res){
        const { username, email, password, roles } = req.body;

        const newUser = new User({
            username,
            email, 
            password: await User.encryptPassword(password)
        })

        if(roles){
            const foundRoles = await Role.find({ name: {$in: roles}});
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }
        const usernameFound = await User.findOne({ username: req.body.username });

        if (usernameFound) return res.status(400).send({message: 'El nombre de usuario ya ha sido registrado'});
        

        const emailFound = await User.findOne({ email: req.body.email });
        if(emailFound) return res.status(400).send({message: 'El correo ya ha sido registrado'});

        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, config.SECRET, {
            expiresIn: 7200
        })

        return res.status(200).send({token});
    },

    signIn: async function(req, res){
       const userFound = await User.findOne({email: req.body.email}).populate("roles");

       if(!userFound) return res.status(404).send({message: "Usuario no encontrado"})

       const matchPasword = await User.comparePassword(req.body.password, userFound.password);

       if(!matchPasword) return res.status(401).send({token: null, message: 'Contraseña invalida'});

       const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 7200
       });

       res.json({token,
        id: userFound._id,
        roles: userFound.roles
    });


    }
};


module.exports = controller;