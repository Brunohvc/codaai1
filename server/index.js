const app = require('express')();
const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Teste.');
})

const server = app.listen(8080, () => {
    console.log('Listening...');
})

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', socket => {
    console.log('A user connected.', socket.handshake.address);
    socket.on('chamada', params => {
        console.log('chamada: ', params);
        setTimeout(enviarMensagem, 2000);
    })
});

io.on('meuTeste', res => {
    console.log('meuTeste: ', res);
});

const enviarMensagem = () => {
    io.emit('recebendoAlgo', { nome: 'Bruno' });
}

/* const app = require('express')();
const cors = require('cors');
var http = require('http')
var server = http.createServer(app);
const socketIo = require("socket.io");
var io = socketIo(server);

const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world.');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); */