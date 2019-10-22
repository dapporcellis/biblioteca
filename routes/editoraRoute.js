var express = require('express')
var route = express.Router()
var editoraCtr = require('../control/editoraCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',editoraCtr.geteditoras, editoraCtr.listar)

//rota para listar todos
route.get('/', editoraCtr.listar)

//rota para listar por filtro
route.post('/', editoraCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', editoraCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), editoraCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', editoraCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), editoraCtr.edita)

//rota para deletar
route.get('/del/:id', editoraCtr.deleta)

module.exports = route;