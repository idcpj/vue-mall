const mongoose = require("mongoose");

// 若是带账号密码的：'mongodb://root:123456@127.0.0.1:27017/dumall'
const connStr= "mongodb://127.0.0.1:27017/imoocsell";

mongoose.connect(connStr,{ useNewUrlParser: true });

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error",()=>{
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB connected disconnected.")
});

