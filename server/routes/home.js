const express = require('express');
const {sqlQuery} = require('../public/promise');
const router = express.Router();

router.post('/', (req, res) => {
    sqlQuery('select * from articledb').then(data => {
        res.send(data).end();
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;
