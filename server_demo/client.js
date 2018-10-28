
let http = require("http");
const util = require("util");

http.get("http://www.imooc.com/index/getstarlist",(res)=> {
    let {statusCode} = res

    let data="";
    res.on('data',(chuck)=>{
        data+=chuck;
    });
    res.on('end',()=>{
        try {
            let jsonStr = JSON.parse(data);
            console.log(jsonStr);
        } catch (e) {
            console.log(e.line+":"+e.message);
        }
    })

})