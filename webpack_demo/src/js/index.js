import "../css/index.css";
require(['./common.js','jquery'], (common,$) =>{
    common.initIndex();
    let a = [1, 2, 3].map((n) => n + 1);
    $("body").css("color","blue");

    (()=>{
        console.log("asd");
    })()
});