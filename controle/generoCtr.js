var genero = require('../modelo/genero')

function listar(req,res){

}

function filtrar(req,res){

}

function abrirAdiciona(req,res){
    res.render("genero/add.ejs")
}

function adiciona(req,res){
    var novoGenero = new genero({
        nome: req.body.nome
    })
    novoGenero.save(function(err){
        if(err){
            res.render('genero/list.ejs', { msg: "Problema ao salvar!"})
        }else{
            res.render('genero/list.ejs', { msg: "Adicionado com sucesso!"})
        }
    })
}

function abrirEdita(req,res){

}

function edita(req,res){

}

function deleta(req,res){

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta
}