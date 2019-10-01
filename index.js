const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var generoRoute = require('./routes/generoRoute')


app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.set(express.static(path.join(__dirname, "publica")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/genero',generoRoute)