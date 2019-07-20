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
    id: { type: Number, required: true },
    value: { type: Number },
    currency_code: { type: String }
})

const Product = mongoose.model('Product', productSchema)

const BASE_URL = 'https://redsky.target.com/v2/pdp/tcin/'

router.get('/:id', (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            console.log('In GET by id', id);
            let result = {};
            let URL = `${BASE_URL}${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`;
            let apiResponse = await axios.get(URL);
            result.id = parseInt(apiResponse.data.product.item.tcin);
            result.name = apiResponse.data.product.item.product_description.title;
            let dbResponse = await Product.find({ 'id': id });
            let product = dbResponse[0];
            let current_price = {};
            current_price.value = product.value;
            current_price.currency_code = product.currency_code;
            result.current_price = current_price;
            res.send(result);
        } catch (error) {
            console.log(error);
            throw error;
        }
    })().catch(error => {
        console.log('Error in GET by id', error);
        res.sendStatus(500);
    });
})

router.put('/:id', (req, res) => {
    console.log('In PUT', req.body);
    const id = req.params.id;
    const newPrice = req.body.new_price;
    Product.updateOne({ id: id }, { value: newPrice }).then((response) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT', error);
        res.sendStatus(500);
    })
})

module.exports = router;