const router = require('express').Router();

router.get('/',(req,res) => {
    res.send('Join')
})

module.exports = router;