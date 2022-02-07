const crypto = require("crypto");

class Encrtption{
    constructor(){
        this.key = '9vApx,5j.6PAsJrM';
        this.iv = 'FnJL,-,.jqWjcaY9';
    }
    encrypt(data){
        let key = Buffer.from(this.key, 'utf8');
        let iv = Buffer.from(this.iv, 'utf8');
        //秘钥加密
        let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
        //数据加密
        let crypted = cipher.update(data, 'utf8', 'hex');
        //数据加密 + 秘钥加密
        crypted += cipher.final('hex');
        return crypted;
    }
    decrypt(data){
        let key = Buffer.from(this.key, 'utf8');
        let iv = Buffer.from(this.iv, 'utf8');
        let crypted = '';
        try{
            //秘钥解密
            let cipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
            //数据解密
            crypted = cipher.update(data, 'hex', 'utf8');
            //数据解密 + 秘钥解密
            crypted += cipher.final('utf8');
        }catch(err){
            crypted = null;
        }
        
        return crypted;
    }
}
module.exports = new Encrtption();