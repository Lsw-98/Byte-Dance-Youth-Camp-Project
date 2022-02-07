const encryption = require('./encryption');

class Token{
    createToken(postData){
        let token = {
            username: postData.username,
            password: postData.password
        };
        let objToStr = JSON.stringify(token);
        return encryption.encrypt(objToStr);
    }
    verifyToken(){
        return (req, res, next) => {
            if(req.url != "/api/login"){
                let token = req.headers.token;
                if(token){
                    if(global.token == token){
                        next();
                    }else{  
                        res.send(401);
                    }
                }else{
                    res.send(401);
                }
            }else{
                next();
            }
        }
    }
};
module.exports = new Token();