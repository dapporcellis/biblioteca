const conexao = require('./conexao')

var genero = conexao.Schema({
    nome:{
        type:String
    }
})

module.exports = conexao.model("genero",genero)