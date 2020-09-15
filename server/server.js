const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRoute = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());


app.use('/index', indexRoute);

app.listen(3000, err => {
    if (err) {
        throw err;
    } else {
        console.log('app running on port 3000')
    }
})