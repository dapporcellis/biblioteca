var express = require('express')
var route = express.Router()
var generoCtr = require('../control/generoCtr')

// rota para listar todos usando middleware
//route.get('/',generoCtr.getGeneros, generoCtr.listar)
route.get('/',generoCtr.getGeneros, generoCtr.listar)

//rota para listar por filtro
route.post('/', generoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', generoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', generoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', generoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', generoCtr.edita)

//rota para deletar
route.get('/del/:id', generoCtr.deleta)

module.exports = route;