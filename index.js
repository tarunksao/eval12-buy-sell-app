require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./Configs/db');
const productRoute = require('./Routes/product.route');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use('/products', productRoute);

app.get('/', (req,res) => {
    res.send('Welcome to our website, you can buy or sell products here.');
});

app.listen(PORT, async () => {
    try{
        await dbConnect;
        console.log('Connected to the DB');
    } catch (err) {
        console.log('Error Connecting to the DB');
        console.log(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
