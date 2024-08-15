    // const express = require("express");
    // const app = express();
    // const bodyParser = require("body-parser");
    // const cors = require("cors");
    // const route = require("./controller/tasksRoute");

    // const mongoose = require("mongoose");
    // mongoose.set("strictQuery",true);
    // mongoose.connect("mongodb+srv://ramyapanditi:12345@cluster0.rv0giqd.mongodb.net/");
    // const db = mongoose.connection;
    // db.on("open",()=> console.log("database connected"));
    // db.on("error",() => console.log("error"));

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended:true}));
    
    // app.use(cors({
    //     origin: "http://localhost:3000",
    //     methods: ["POST", "GET", "PUT", "DELETE"],
    // }));
    // // app.options("*", cors());
    // // app.use((req, res, next) => {
    // //     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // //     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    // //     res.header("Access-Control-Allow-Headers", "Content-Type");
    // //     res.header("Access-Control-Allow-Credentials", true);
    // //     next();
    // // });
    
    // app.use("/",route);

    // app.listen(4000,()=>{
    //     console.log("Running on 4000");
    // })

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./controller/tasksRoute");

const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://ramyapanditi:12345@cluster0.rv0giqd.mongodb.net/")
const db = mongoose.connection;
db.on("open",()=> console.log("database connected"));
db.on("error",() => console.log("error"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cors({
    origin: ["http://localhost:3000","https://9j4ncffr-3000.inc1.devtunnels.ms/"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true 
}));



app.use("/",route);

app.listen(4000,()=>{
    console.log("Running on 4000");
})