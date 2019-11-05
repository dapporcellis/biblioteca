var express = require('express')
var route = express.Router()
var livroCtr = require('../control/livroCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',livroCtr.getLivros, livroCtr.listar)
route.get('/',livroCtr.getLivros, livroCtr.listar)

//rota para listar por filtro
route.post('/', livroCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', livroCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), livroCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', livroCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), livroCtr.edita)

//rota para deletar
route.get('/del/:id', livroCtr.deleta)

module.exports = route;