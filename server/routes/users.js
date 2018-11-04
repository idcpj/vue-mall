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
//修改购物车数量
router.post("/editCartNum",(req,res,next)=>{
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    let userId  =req.cookies.userId;
    console.log(productId);
    console.log(productNum);
    console.log(userId);
    userModel.update({
        userId:userId,"cartList.productId":productId},
        {"cartList.$.productNum":productNum},(err,doc)=>{
        if (err){
            res.json({
                status:1,
                msg:err.message,
            })
        }else{
            res.json({
                status:0,
                msg:'修改成功',
            })
        }
    })
});

router.post("/CheckOut",(req,res,next)=>{
   let productId = req.body.productId;
   let checked = req.body.checked;
   let userId  =req.cookies.userId;

   userModel.update({userId:userId,"cartList.productId":productId},{"cartList.$.checked":checked},(err,doc)=>{
       if (err){
           res.json({
               status:1,
               msg:err.message,
           })
       }else{
           res.json({
               status:0,
               msg:'修改成功',
           })
       }
   })

});

router.get("/Address",(req,res,next)=>{
   let userId = req.cookies.userId;
    console.log(userId);
    userModel.findOne({userId:userId},(err,doc)=>{
        if (err){
            res.json({
                status:1,
                msg:err.message,
            })
        }else{
            if (doc){
                res.json({
                    status:0,
                    msg:'修改成功',
                    result:doc.addressList,
                })
            }else{
                res.json({
                    status:1,
                    msg:"没有 doc",
                })
            }

        }
    })
});

router.post("/delAddress",(req,res,next)=>{
    let userId = req.cookies.userId;
    let addressId =req.body.addressId;
    console.log("userId :" + userId);
    console.log("addressId :" + addressId);
    userModel.update({userId:userId,$pull:{addressList:{addressId:addressId}}},(err,doc)=>{
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
    });
});

router.post("/defaultAddress",(req,res,next)=>{
    let userId = req.cookies.userId;
    let addressId =req.body.addressId;
    console.log("userId :" + userId);
    console.log("addressId :" + addressId);
    userModel.findOne({userId:userId},(err,doc)=>{
        if (err) {
            res.json({
                status: 1,
                msg: err.message,
            })
        }else{
            if(!doc){
                res.json({
                    status: 1,
                    msg: "doc 为空",
                });
            }else{
                doc.addressList.forEach(item=>{
                    if(item.addressId==addressId){
                        item.isDefault=true;
                    }else {
                        item.isDefault=false;
                    }
                });

                doc.save((err,doc)=>{
                    if(err){
                        res.json({
                            status: 1,
                            msg: err.message,
                        })
                    }else{
                        res.json({
                            status: 0,
                            msg: "修改成功",
                            result:doc.addressList
                        })
                    }
                });
            }
        }
    });
});

module.exports = router;
