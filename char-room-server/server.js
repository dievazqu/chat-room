const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());

io.on("connection", socket => {
    console.log("Socket connected");

    socket.on('send_message', ({token, message}) => {
        console.log(`Receiving ${token} with message ${message}`)
        const user = loggedUsers[token];
        if (user) {
            console.log(`User: ${user.name} sent message: ${message}`)
            io.emit("new_message", {user: user, message: message});
        } else {
            console.warn("Invalid user ", user);
        }
    });
});

server.listen(3001, () => {
    console.log("Socket server initialized");
})

const loggedUsers = {}

app.post('/login', (req, res) => {
    console.log('Receiving post:', req.body);
    const name = req.body.name;

    if (name) {
        const newUuid = uuid.v4();
        loggedUsers[newUuid] = {name: name};
        console.debug("Logged Users", loggedUsers);
        res.send({token: newUuid});
        io.emit("new_user", loggedUsers[newUuid])
    } else{
        console.debug("Invalid name", loggedUsers);
        res.status(400);
        res.send("Invalid name")
    }

})
