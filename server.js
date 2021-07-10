require("dotenv").config();
const express = require("express")
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors")
const port = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);
const Routes = require("./app/routes");

app.use(cors())

app.use([
    bodyParser.json(),
    bodyParser.urlencoded({extended:false}),
    Routes
])

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "https://webrtc-beta-steel.vercel.app/",
      methods: ["GET", "POST"]
    }
  });
  

const socketManager = require("./app/socketManager");
io.on("connection", socketManager);

httpServer.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})



