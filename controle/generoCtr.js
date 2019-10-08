var genero = require('../modelo/genero')


//middleware para buscar generos
function getGeneros(req,res,next){
    genero.find({}).lean().exec(function(err,docs){
        req.generos = docs
        next()
    })
}

function listar(req,res){
    genero.find({}).lean().exec(function(err,docs){
        res.render('genero/list.ejs',{"Generos" : req.generos})
    })
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
            genero.find({}).lean().exec(function(err,docs){
                res.render('genero/list.ejs', { msg: "Problema ao salvar!", Generos: docs })
            })            
        }else{
            genero.find({}).lean().exec(function(err,docs){
                res.render('genero/list.ejs', { msg: "Adicionado com sucesso!", Generos: docs })
            })   
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
    deleta,
    getGeneros
}