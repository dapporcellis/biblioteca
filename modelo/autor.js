const conexao = require('./conexao')

var autor = conexao.Schema({
    nome:{
        type:String
    },
    nacionalidade:{
        type:String
    },
    datanasc:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("autor",autor)