const Books = require('../models/Book');
const fs = require('fs');

const controller = {
    addBook: async function(req, res){
        const { name, author, year} = req.body;

        const newBook = new Books({
            name: name,
            author: author,
            year: year,
            image: null
        });

        newBook.save()
        .then(function(bookStored) {
            return res.status(201).send({book: bookStored});
        })
        .catch(function(err){
            return res.status(400).send({message: 'No se ha podido guardar el libro'});
        });
    },

    getBook: async function(req, res){
        let bookId = req.params.id;

        if(bookId === null){
            return res.status(404).send({message: 'El libro no ha sido encontrado'});
        }

        Books.findById(bookId)
        .then(function(book){
            return res.status(200).send({'Book': book});
        })
        .catch(function(err){
            return res.status(404).send({message: 'El libro no ha sido encontrado'})
        });
    },

    getBooks: async function(req, res){
        Books.find({}).exec()
        .then(function(books){
            return res.status(200).send({books});
        })
        .catch(function(err){
            return res.status(400).send({message: 'No se ha podido cargar los libros', error: err})
        })
    },

    updateBook: async function(req, res){
        let bookId = req.params.id;
        let update = req.body;

        if(bookId == null){
            return res.status(404).send({message: 'El libro no existe'});
        }

        Books.findByIdAndUpdate(bookId, update, {
            new: true
        })
        .then(function(bookUpdated){
            return res.status(200).send({Book: bookUpdated});
        })
        .catch(function(err){
            return res.status(400).send({message: 'No se ha podido actualizar el libro', error: err})
        });
    },

    removeBook: async function(req, res){
        let bookId = req.params.id;
        
        if(bookId == null){
            return res.status(404).send({message: 'El libro no existe'});
        }

        Books.findByIdAndRemove(bookId)
        .then(function(bookRemoved){
            return res.status(200).send({Book: bookRemoved});
        })
        .catch(function(err){
            return res.status(400).send({message: 'No se ha podido eliminar el libro', error: err})
        });
    },

    uploadImage: function(req, res) {
        let bookId = req.params.id;
        let fileName = 'Imagen no subida...'

        if(req.files){
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extSplit = fileName.split('.');
            let fileExt = extSplit[1];

            if(fileExt === 'png' || fileExt === 'jpg' || fileExt === 'JPG' || fileExt === 'jpeg'){
                Books.findByIdAndUpdate(bookId, {image: fileName},
                {new: true})
                .then(function(bookUpdated){
                    if(!bookUpdated){
                        return res.status(404).send({message: "No se ha encontrado el libro"});
                    }

                    return res.status(200).send({
                        files: fileName
                    });
                })
                .catch(function(err){
                    return res.status(400).send({message: "No se ha podido subir la imagen"});
                });
            } else {
                fs.unlink(filePath, (err) =>{
                    return res.status(400).send({
                        message: "La extension no es valida"
                    })
                })
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
};


module.exports = controller;