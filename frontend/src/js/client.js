const BASE_URL = "http://localhost" ;
const PORT = "3001";
const socket = io(`${BASE_URL}:${PORT}`,{transports:['websocket']});

// Get DOM elements in respective js variables 
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer= document.querySelector(".container")

const append = (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

//telling server the name of the new user
window.addEventListener("load",()=>{
    // const name= prompt("Enter your name to join");
    const name = "USER" + Math.floor(Math.random()*100);
    socket.emit('new-user-joined', name);
})

// Receive the event from the server, if new user joins 
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'middle')
})
// append the message sent by server
socket.on('receive',data =>{
    append(data.message,'left')
})
// append the info of a person leaving the chat room
socket.on('leave',name =>{
    append(`${name} left the chat`,'middle')
})

// submition of the form
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let frame = document.getElementById("chat-input");
    const message = window.frames[0].document.body.innerHTML ;
    window.frames[0].document.body.innerHTML = "" ;
    append(message,'right');
    socket.emit('send',message);
    return false;
})
