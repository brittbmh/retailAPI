const express = require('express');
const router = express.Router();
const axios = require('axios');

const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/retail_api';
mongoose.connect(databaseUrl, { useNewUrlParser: true });

mongoose.connection.once('connected', () => {
    console.log('Mongo only pawn in the game of life');
});

const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {type: Number, required: true},
    value: {type: Number},
    currency_code: {type: String}
})

const Product = mongoose.model('Product', productSchema)

const BASE_URL = 'https://redsky.target.com/v2/pdp/tcin/'

const data = [{
    "id": 13860428,
    "name": "The Big Lebowski (Blu-ray) (Widescreen)",
    "current_price": {
        "value": 13.49,
        "currency_code": "USD"
    }
}];

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('In GET by id', id);
    // let result = {current_price: {currency_code: "USD"}};
    // let URL = `${BASE_URL}${id}?excludes=taxonomy,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`;
    // axios.get(URL).then((response) => {
    //     result.id = response.data.product.item.tcin;
    //     result.name = response.data.product.item.product_description.title;
    //     result.current_price.value = response.data.product.price.offerPrice.price;
    //     console.log(result);
    //     res.send(result);
    // }).catch(error => {
    //     console.log('Error in Get by id', error);
    //     res.sendStatus(500);
    // })
    Product.find({}).then((results) => {
        res.send(results);
    }).catch(error => {
        console.log('Error in Get by id', error);
        res.sendStatus(500);
    })

})

module.exports = router;