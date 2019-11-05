const conexao = require('./conexao')

var genero = conexao.Schema({
    nome:{
        type:String
    },
    livros:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"livro"
        }
    ]
})

module.exports = conexao.model("genero",genero)