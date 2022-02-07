const express = require('express');
const {sqlQuery} = require('../public/promise');
const router = express.Router();

router.post('/', (req, res) => {
    var articleData = req.body;
    console.log(articleData);
    if(!articleData.headUrl){
        res.send({'message':'抱歉，你的头像还没有上传', 'success':false}).end();
    }else{
        sqlQuery(`insert into articledb (title, content, headUrl) values('${articleData.title}', '${articleData.content}', '${articleData.headUrl}')`).then(result => {
            res.send({'message':'文章发表成功', 'success':true}).end();
        }).catch(err => {
            res.send({'message':'文章发表失败', 'success':false}).end();
            console.log(err);
        })
    }
});

module.exports = router;