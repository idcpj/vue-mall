const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require("ejs");
const express = require("express");
const bodyParser = require('body-parser');

const app =express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',ejs.__express);

app.use(logger('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//<editor-fold desc="一级路由">
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goodsRouter = require("./routes/goods");

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/goods",goodsRouter);
//</editor-fold>

/**
 * 全局拦截是否登陆
 */
app.use((req,res,next)=>{
    if (req.cookie.userId){
        next();
    }else{
        console.log("url:" + req.originalUrl);
        if(req.originalUrl === "/users/login"){
            next();
        }else{
            res.json({
                status:1001,
                msg:"当前未登录",
                result:"",
            })
        }
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
