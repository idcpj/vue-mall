const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const utils = require("../common/utils");

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.send('respond with a resource');
});

router.post("/login",(req,res,next)=>{
    let param={
        userName:req.body.userName,
        userPwd:req.body.userPwd
    };
    console.log("接受到的参数", param);

    userModel.findOne(param,(err,doc)=>{
        if (err){
            res.json({
                status:1,
                msg:err.message,
            });
        }else if(!doc){
            res.json({
                status:1,
                msg:"账户或密码无效",
            });
        }else{
            res.cookie("userId",doc.userId,{
                path:"/",
                maxAge:1000*60*60//一小时
            });
            // req.session.user=doc.user;
            res.json({
                status:0,
                msg:"",
                result:{
                    user:doc.userName,
                }
            });
        }

    })

});

router.post("/loginOut",(req,res,next)=>{

   res.cookie("userId","",{
       path:"/",
       maxAge:-1,
   });
   res.json({
       status:0,
       msg:"",
       result:"",
   })
});

router.get("/checkLogin",(req,res,next)=>{
    let userId = req.cookies.userId;
    console.log(req.cookies);
    if (userId){
        res.json({
            status:0,
            msg:"",
            result:userId|| ""
        });
    }else{
        res.json({
            status:1,
            msg:"",
            result:"",
        });
    }
});

/**
 * 查询当前用户的购物车
 */
router.get("/cartList",(req,res,next)=>{
    let userId = req.cookies.userId;
    console.log(userId);
    if (!userId){
        res.json({
            status:1,
            msg:"未登录",
        });
    }
    userModel.findOne({userId:userId},(err,doc)=>{
        if (err){
            res.json({
                status:1,
                msg:err.message
            });
        }else{
            if (doc){
                res.json({
                    status:0,
                    msg:"",
                    result:doc.cartList,
                });
            }
        }
    })
});
router.post("/delete",(req,res,next)=>{
    let productId = req.body.productId;
    let userId = req.cookies.userId;
    console.log(productId);
    console.log(userId);
    if (!productId){
        res.json({
            status:1,
            msg:"参数为空",
        });
    }else{
        userModel.update({userId: userId},
            {$pull:
                {cartList:
                    {productId: productId}
                }
            }, (err, doc) => {
            if (err){
                res.json({
                    status:1,
                    msg:err.message,
                })
            }else{
                res.json({
                    status:0,
                    msg:'删除成功',
                })
            }
        })
    }
});

module.exports = router;
