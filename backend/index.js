// to handle socket io connection
const PORT = 3001;
const io = require('socket.io')(PORT);
console.log(`Server Running on PORT:${PORT}`);
const users= {}

io.on('connection', socket =>{
    socket.on('new-user-joined',name=>{
        // console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name)
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
})