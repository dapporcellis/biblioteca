var editora = require('../modelo/editora')


//middleware para buscar editoras
function getEditoras(req, res, next) {
    editora.find({}).lean().exec(function (err, docs) {
        req.editoras = docs
        next()
    })
}

function listar(req, res) {
    editora.find({}).lean().exec(function (err, docs) {
        res.render('editora/list.ejs', { "Editoras": docs })
    })
}

function filtrar(req, res) {
    editora.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('editora/list.ejs', { "Editoras": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("editora/add.ejs")
}

function adiciona(req, res) {
    var novoEditora = new editora({
        nome: req.body.nome,
        endereco: req.body.endereco,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoEditora.save(function (err) {
        if (err) {
            editora.find({}).lean().exec(function (err, docs) {
                res.render('editora/list.ejs', { msg: "Problema ao salvar!", Editoras: docs })
            })
        } else {
            editora.find({}).lean().exec(function (err, docs) {
                res.render('editora/list.ejs', { msg: "Adicionado com sucesso!", Editoras: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    editora.findById(req.params.id, function (err, editora) {
        res.render('editora/edit.ejs', { 'editora': editora });
    })
}

function edita(req, res) {
    editora.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                editora.find({}).lean().exec(function (err, docs) {
                    res.render('editora/list.ejs', { msg: "Problema ao editar!", Editoras: docs })
                })
            } else {
                editora.find({}).lean().exec(function (err, docs) {
                    res.render('editora/list.ejs', { msg: "Editado com sucesso!", Editoras: docs })
                })
            }
        })
}

function deleta(req, res) {
    editora.findByIdAndDelete(req.params.id, function () {
        editora.find({}).lean().exec(function (err, docs) {
            res.render('editora/list.ejs', { msg: "Removido com sucesso!", Editoras: docs })
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
    getEditoras
}