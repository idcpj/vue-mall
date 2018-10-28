let Http = require("http");
let Url  =require("url");
let util  =require("util");
let fs = require("fs");

let Server =  Http.createServer((req,res)=>{
    // res.statusCod=302;
    // res.setHeader("Content-Type","text/plain;charset=utf-8");
    let url = Url.parse(req.url);
    let fileName = url.pathname.substring(1);
    fs.readFile(fileName,(err,data)=>{
        if (err){
            res.writeHead(404,{
                "Content-Type":'text/html'
            })
        }else{
            res.writeHead(201,{
                'Content-Type':'text/html'
            })
        }
        res.write(data.toString())
        res.end();
    });

});

Server.on("close",()=>{
    console.log("close");
})
Server.listen("3000",'127.0.0.1',()=>{
    console.log("服务器已经运行 127.0.0.1:3000");
});

