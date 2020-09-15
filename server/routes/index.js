const express = require('express');
const router = express.Router();

let recipes = []

router.get('', (req, res) => {
    res.json({
            id: 2,
            name: 'Shawrma',
            tilte: 'Turkish food',
            img: 'https://image.shutterstock.com/image-photo/shawarma-sandwich-gyro-fresh-roll-600w-1122622892.jpg',
            ingredients: [
                {id:1, name: 'chicken', quantity: 1},
                {id:2, name: 'pickled', quantity: 3},
                {id:3, name: 'bread', quantity: 1},
            ]
    });
});

router.post('', (req, res) => {
    recipes.push(req.body);
    
    recipes.forEach(item => {
        console.log(item);
    })
    res.json({
        success: true
    });
});

module.exports = router;