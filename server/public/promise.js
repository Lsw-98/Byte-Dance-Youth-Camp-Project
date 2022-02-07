const {db} = require('../public/util');
let myPromise = {
    sqlQuery:(sql) => {
        return new Promise(function(resolve, rejact){
            db.query(sql, function(err, result){
                if(err){
                    rejact(err);
                }else{
                    resolve(result);
                } 
            })
        })
    }
}

module.exports = myPromise;