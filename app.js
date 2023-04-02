const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection');
const cors = require('cors')

const app = express();

const port = process.env.PORT || 5000;

connectDb();
app.use(cors());
app.use(express.json());
app.use('/api/todo', require('./routes/todoRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listining to port : ${port}`);
})