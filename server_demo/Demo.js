let Http = require("http");
let Url  =require("url");
let util  =require("util");

let Server =  Http.createServer((req,res)=>{
    res.statusCod=302;
    res.setHeader("Content-Type","text/plain;charset=utf-8");
    let url = Url.parse(req.url);
    let inspect = util.inspect(url)
    res.end(inspect);
});

Server.listen("3000",'127.0.0.1',()=>{
    console.log("服务器已经运行");
});

