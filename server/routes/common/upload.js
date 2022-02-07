const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    //获取当前ip
    var getIp = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
    var ip = getIp.match(/\d+.\d+.\d+.\d+/);
    ip = ip ? ip.join('.') : null;
    //获取当前端口
    var port = 6000 || req.socket.remotePort;
    
    //删除图片
    // var hasFiles = fs.readdirSync('./upload');
    // if(hasFiles.length){
    //     for(var i=0; i<hasFiles.length-1; i++){
    //         fs.unlink(`./upload/${hasFiles[i]}`, (err) => {
    //             if(err){ console.log(err) };
    //         })
    //     }
    // }
    
    var files = req.files;
    var newFileName = new Date().getTime() + (Math.random().toFixed(3) * 1000).toString() + path.extname(files[0].originalname);

    fs.rename(`./static/upload/${files[0].filename}`, `./static/upload/${newFileName}`, (err) => {
        if(err){
            console.log(err);
            res.send({'message':'文件上传失败', 'success':false}).end();
        }else{
            newFileName = `http://${ip}:${port}/upload/${newFileName}`;
            res.send({'message':'文件上传成功', 'success':true, 'results':{'headUrl': newFileName}}).end();
        }
    })
});

module.exports = router;