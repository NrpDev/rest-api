const controller = {
    createUser: async function(req, res){
        res.status(200).send({message: 'creando usuario'})
    }
}

module.exports = controller;