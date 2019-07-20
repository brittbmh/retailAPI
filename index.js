const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

const feedbackRouter = require('./routes/feedback.router.js');
app.use('/api/retailAPI', feedbackRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});