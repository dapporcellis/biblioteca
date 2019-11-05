var livro = require('../model/livro')
var editora = require('../model/editora')
var genero = require('../model/genero')
var autor = require('../model/autor')

//middleware para buscar livros
function getLivros(req, res, next) {
    livro.find({}).lean().exec(function (err, docs) {
        req.livros = docs
        next()
    })
}

function listar(req, res) {
    livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
        res.render('livro/list.ejs', { "Livros": docs })
    })
}

function filtrar(req, res) {
    livro.find({ nome: new RegExp(req.body.pesquisa, 'i') }).populate('genero').populate('editora').populate('autores')
        .lean().exec(function (err, docs) {
            res.render('livro/list.ejs', { "Livros": docs })
        })
}

function abrirAdiciona(req, res) {
    editora.find({}).lean().exec(
        function (e, editoras) {
            autor.find({}).lean().exec(
                function (e, autores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            res.render("livro/add.ejs", { "Editoras": editoras, "Autores": autores, "Generos": generos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoLivro = new livro({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        genero: req.body.genero,
        editora: req.body.editora,
        autores: req.body.autores,
    })
    novoLivro.save(function (err) {
        if (err) {
            livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('livro/list.ejs', { msg: "Problema ao salvar!", Livros: docs })
            })
        } else {
            livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('livro/list.ejs', { msg: "Adicionado com sucesso!", Livros: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    editora.find({}).lean().exec(
        function (e, editoras) {
            autor.find({}).lean().exec(
                function (e, autores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            livro.findOne({_id:req.params.id}).populate('genero').populate('editora').populate('autores').exec(
                                function (err, livro) {
                                    res.render('livro/edit.ejs', { 'livro': livro, "Editoras": editoras, "Autores": autores, "Generos": generos });
                                });
                        });
                });
        });   
}

function edita(req, res) {
    livro.findByIdAndUpdate(req.params.id, 
        { 
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            genero: req.body.genero,
            editora: req.body.editora,
            autores: req.body.autores
        }, function (err) {
        if (err) {
            livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('livro/list.ejs', { msg: "Problema ao editar!", Livros: docs })
            })
        } else {
            livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
                res.render('livro/list.ejs', { msg: "Editado com sucesso!", Livros: docs })
            })
        }
    })
}

function deleta(req, res) {
    livro.findByIdAndDelete(req.params.id, function () {
        livro.find({}).populate('genero').populate('editora').populate('autores').lean().exec(function (err, docs) {
            res.render('livro/list.ejs', { msg: "Removido com sucesso!", Livros: docs })
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
    getLivros
}