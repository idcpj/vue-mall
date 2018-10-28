const express = require("express");
const router = express.Router();
const goods = require("../models/goods");
const User = require("../models/user");

router.get("/",(req,res,err)=>{
    let param = {
        sort:parseInt(req.query.sort),
        pageSize:parseInt(req.query.pageSize),
        page:parseInt(req.query.page),
        priceLevel:req.query.priceLevel,
    };


    let params = {  };
    if (param.priceLevel!=="all"){
        let priceGt="",//大于
            priceLte="";//小于区间

        switch (param.priceLevel){
            case "0":priceGt=0;priceLte=100;break;
            case "1":priceGt=100;priceLte=500;break;
            case "2":priceGt=500;priceLte=1000;break;
            case "3":priceGt=1000;priceLte=5000;break;
        }
        //价格
        params.salePrice={
            $gt: priceGt,
            $lte: priceLte,
        }
    }

    let skip =(param.page-1)*param.pageSize;


    goodsModel = goods.find(params);
    goodsModel.sort({salePrice:param.sort}).skip(skip).limit(param.pageSize);
    goodsModel.exec((err,doc)=>{
        if(err){
            res.json({
                status:1,
                msg:err.message
            })
        }else{
            res.json({
                status:0,
                msg:"",
                result:{
                    count:doc.length,
                    list:doc
                }
            })
        }
        res.end();
    });

    // goods.find({},(err,doc)=>{});

});

router.get("/addCart", (req, res, next) => {

    const productId = req.query.productId;
    const UserId = "100000077";
    const params =  {
        userId:UserId
    }
    User.findOne(params,(err1,userDoc)=>{
        if(err1 || !userDoc){
            res.json({
                status:1,
                msg:err1.message
            });
            res.end();
        }

        let hasGoods = false;
        userDoc.cartList.forEach(item=>{
            if (item.productId===productId){
                hasGoods=true;
                item.productNum++
            }
        });

        //已有,数量加1
        if(hasGoods){
            userDoc.save((err4,doc3)=>{
                if (err4){
                    res.json({
                        status:1,
                        msg:err4.message
                    });
                }else{
                    res.json({
                        status:0,
                        msg:'',
                        result:""
                    });
                }
                res.end();

            })
        }else{
            //判断是否有产品,
            goods.findOne({productId:productId},(err2,goodsDoc)=>{
                if (err2){
                    res.json({
                        status:1,
                        msg:err2.message
                    });
                    res.end();
                }

                if (goodsDoc){
                    goodsDoc.productNum=1;
                    goodsDoc.checked=1;
                    userDoc.cartList.push(goodsDoc);
                    userDoc.save((err3,docs)=>{
                        if (err3){
                            res.json({
                                status:1,
                                msg:err3.message
                            })
                            res.end();
                        }

                        res.json({
                            status:0, msg:'',
                            result:""
                        });
                        res.end();

                    })
                }
            });
        }

    });
});

module.exports=router;