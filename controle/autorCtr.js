var autor = require('../modelo/autor')


//middleware para buscar autores
function getAutores(req, res, next) {
    autor.find({}).lean().exec(function (err, docs) {
        req.autores = docs
        next()
    })
}

function listar(req, res) {
    autor.find({}).lean().exec(function (err, docs) {
        res.render('autor/list.ejs', { "Autores": docs })
    })
}

function filtrar(req, res) {
    autor.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('autor/list.ejs', { "Autores": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("autor/add.ejs")
}

function adiciona(req, res) {
    var novoAutor = new autor({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        datanasc: req.body.datanasc,
        foto: req.file.filename
    })
    novoAutor.save(function (err) {
        if (err) {
            autor.find({}).lean().exec(function (err, docs) {
                res.render('autor/list.ejs', { msg: "Problema ao salvar!", Autores: docs })
            })
        } else {
            autor.find({}).lean().exec(function (err, docs) {
                res.render('autor/list.ejs', { msg: "Adicionado com sucesso!", Autores: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    autor.findById(req.params.id, function (err, autor) {
        res.render('autor/edit.ejs', { 'autor': autor });
    })
}

function edita(req, res) {
    autor.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade,
            datanasc: req.body.datanasc,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                autor.find({}).lean().exec(function (err, docs) {
                    res.render('autor/list.ejs', { msg: "Problema ao editar!", Autores: docs })
                })
            } else {
                autor.find({}).lean().exec(function (err, docs) {
                    res.render('autor/list.ejs', { msg: "Editado com sucesso!", Autores: docs })
                })
            }
        })
}

function deleta(req, res) {
    autor.findByIdAndDelete(req.params.id, function () {
        autor.find({}).lean().exec(function (err, docs) {
            res.render('autor/list.ejs', { msg: "Removido com sucesso!", Autores: docs })
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
    getAutores
}