require("dotenv").config();
const express = require("express")
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors")
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const Routes = require("./app/routes");


app.use([
    bodyParser.json(),
    bodyParser.urlencoded({extended:false}),
    Routes
])

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  });

const io = require("socket.io")(server, {
    cors: {
      origin: '*',
    }
});
const socketManager = require("./app/socketManager");
io.on("connection", socketManager);

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})



