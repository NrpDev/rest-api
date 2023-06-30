const express = require('express');


const router = express.Router();

const booksController = require('../controllers/books.controller');
const authJwt = require('../middleware/authJwt');

const  multipart  =  require('connect-multiparty');  
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });




router.post('/add', [authJwt.verifyToken, authJwt.isAdmin], booksController.addBook);
router.get('/get/:id', booksController.getBook);
router.get('/get', booksController.getBooks);
router.put('/update/:id', [authJwt.verifyToken, authJwt.isAdmin], booksController.updateBook);
router.delete('/delete/:id', [authJwt.verifyToken, authJwt.isAdmin], booksController.removeBook);
router.post('/upload-image/:id', [authJwt.verifyToken, authJwt.isAdmin, multipartMiddleware], booksController.uploadImage);


module.exports = router;