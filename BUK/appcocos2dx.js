var WebSocketServer = require('ws').Server,
    socket = new WebSocketServer({port: 2000});

console.log('Started!');

socket.on('connection', function (clientSocket) {
    clientSocket.on('message', function () {
        console.log('Ping!');
        clientSocket.send('pong');
    });

    console.log('Connected!');
});
