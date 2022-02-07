const express = require('express');
// 端口配置
const port = 8080
//跨域中间件
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
//上传
const multer = require('multer');
const token = require('./public/token');
var app = express();

//日志
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//上传文件插件 dest是文件上传之后的路径 使用上传任意文件方法any()
app.use(multer({dest: './static/upload'}).any());
//设置静态文件目录 项目根目录+/static
app.use(express.static(__dirname + '/static'));

//设置跨域
//app.use(cors());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, token');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    if(req.method.toLowerCase() == 'options'){
        res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }   
});
//用于验证token
app.use(token.verifyToken());

//路由
app.use('/api/upload', require('./routes/common/upload'));
app.use('/api/login', require('./routes/login'));
app.use('/api/addarticle', require('./routes/add_article'));
app.use('/api/home', require('./routes/home'));
//监听
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
