var express = require('express')
var route = express.Router()
var autorCtr = require('../controle/autorCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',autorCtr.getautors, autorCtr.listar)

//rota para listar todos
route.get('/', autorCtr.listar)

//rota para listar por filtro
route.post('/', autorCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', autorCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), autorCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', autorCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), autorCtr.edita)

//rota para deletar
route.get('/del/:id', autorCtr.deleta)

module.exports = route;