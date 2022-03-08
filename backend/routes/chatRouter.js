const router = require('express').Router();

router.get('/',(req,res) => {
    res.send('Chat')
})

module.exports = router;