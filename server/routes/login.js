const express = require('express');
const {sqlQuery} = require('../public/promise');
const {createToken} = require('../public/token');
const router = express.Router();

router.post('/', (req, res) => {
    const postData = req.body;
    sqlQuery(`select count(*) as count from userdb where username = '${postData.username}'`).then(result => {
        let data = result[0];
        
        if(data.count > 0){
            return sqlQuery(`select password from userdb where username = '${postData.username}'`);
        }else{
            res.send({'message':'抱歉，没有此用户', 'success':false}).end();
        }
    }).then(result => {
        let data = result[0];
        if(postData.password == data.password){
            let token = createToken(postData);
            global.token = token;
            res.send({'message':'登录成功', 'success':true, 'result':{'token':token}}).end();
        }else{
            res.send({'message':'抱歉，您的密码不正确', 'success':false}).end();
        }
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;