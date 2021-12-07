//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);

    //Listen for a message named 'data' from this client
    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        socket.broadcast.emit('mouse',data);
        //io.socket.emit('mouse',data);
        console.log(data);
    }

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
});