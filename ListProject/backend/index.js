const express = require('express');
const bodyPraser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongoose')
const port = 8000;
const cookieParser = require('cookie-parser')
const cors = require('cors'); // Import the cors package

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(bodyPraser.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));
// const secretKey= process.env.JWT_SECRET;


//Set router
app.use('/', require('./router/index'));


app.listen(port, (error) => {
    if (error) { console.log('Error starting the server:', error); return; }
    console.log('Server is running on port', port);
})