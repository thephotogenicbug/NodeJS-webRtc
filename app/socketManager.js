module.exports = (socket) =>{
    try{
        console.log("Connected to socket successfully")
        socket.on("code", (data , callback) =>{
            socket.broadcast.emit("code", data)
        })

    }
    catch(ex){
        console.log(ex.message)
    }
}