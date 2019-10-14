const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {};

mongoose.connect('mongodb+srv://paxtel:paxtel@cluster0-plrfi.mongodb.net/omni?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

io.on('connection', socket => {
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next();
})

// GET, POST, PUT DELETE
// PEGAR, ADICIONAR, EDITAR, DELETAR

//req.query = Acessar query params(para filtro)
//req.params = Acessar route params (Para edição e delete)
//req.body = Acessar corpo da req (Para criar e editar)

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(8080)    