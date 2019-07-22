const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const retailRouter = require('./routes.js');
app.use('/api/products', retailRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});