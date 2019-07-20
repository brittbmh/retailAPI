const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('In GET by id');
    res.json(["Roger", "Don", "Peggy", "Joan", "Pete"]);
})

module.exports = router;