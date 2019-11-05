const conexao = require('./conexao')

var livro = conexao.Schema({
    titulo:{
        type:String
    },
    isbn:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    genero:{
        type:conexao.Schema.Types.ObjectId,
        ref: "genero"
    },
    editora:{
        type:conexao.Schema.Types.ObjectId,
        ref: "editora"
    },
    autores:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "autor"
    }]
})

module.exports = conexao.model("livro",livro)