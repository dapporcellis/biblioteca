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
    genero.findById(req.params.id,function(err,genero){
        res.render('genero/edit.ejs',{'genero':genero});
    })    
}

function edita(req,res){
    genero.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            genero.find({}).lean().exec(function(err,docs){
                res.render('genero/list.ejs', { msg: "Problema ao editar!", Generos: docs })
            })            
        }else{
            genero.find({}).lean().exec(function(err,docs){
                res.render('genero/list.ejs', { msg: "Editado com sucesso!", Generos: docs })
            })   
        }
    })
}

function deleta(req,res){
    genero.findByIdAndDelete(req.params.id,function(){
        genero.find({}).lean().exec(function(err,docs){
            res.render('genero/list.ejs', { msg: "Removido com sucesso!", Generos: docs })
        })
    })

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