const express = require('express');
const { ProductModel } = require('../Models/product.model');

const app = express.Router();
app.use(express.json());

app.get('/', async (req,res) => {
    const {search, page, sort, order} = req.query;
    const limit = 4;
    try{
        if (search) {
            const searchProduct = await ProductModel.find({name:search});
            res.send(searchProduct);
        } else if(sort && order==='asc') {
            const sortProduct = await ProductModel.find().limit(limit).skip(limit*(page-1)).sort({postedAt:-1});
            res.send(sortProduct);
        } else if (sort && order==='desc') {
            const sortProduct = await ProductModel.find().limit(limit).skip(limit*(page-1)).sort({postedAt:1});
            res.send(sortProduct);
        } else {
            const allProducts = await ProductModel.find().limit(limit).skip(limit*(page-1));
            if (allProducts.length===0){
                res.status(200).send({message:'Sorry!!! We have no products as of now'});
            } else {
                res.status(200).send({message:'Get all the products fron our database here', allProducts});
            }
        }
    } catch (err) {
        res.status(400).send({message:'Something went wrong', err});
    }
});

app.get('/:category', async (req,res) => {
    const {category} = req.params;

    const {page, sort, order} = req.query;

    const limit = 4;
    try{
        if(sort && order==='asc') {
            const sortProduct = await ProductModel.find({category}).limit(limit).skip(limit*(page-1)).sort({postedAt:-1});
            res.send(sortProduct);
        } else if (sort && order==='desc') {
            const sortProduct = await ProductModel.find({category}).limit(limit).skip(limit*(page-1)).sort({postedAt:1});
            res.send(sortProduct);
        } else {
            const allProducts = await ProductModel.find({category}).limit(limit).skip(limit*(page-1));
            if (allProducts.length===0){
                res.status(200).send({message:'Sorry!!! We have no products as of now'});
            } else {
                res.status(200).send({message:'Get all the products fron our database here', allProducts});
            }
        }
    } catch (err) {
        res.status(400).send({message:'Something went wrong', err});
    }
});

app.post('/', async (req,res) => {
    const payload = req.body;
    try{
        const product = new ProductModel(payload);
        await product.save();
        res.status(201).send({message:'Prodcut added successfully', product});
    } catch (err) {
        res.status(400).send({message:'Something went wrong', err});
    }
});

app.delete('/:id', async (req,res) => {
    const {id} = req.params;

    try{
        const deleteProduct = await ProductModel.findByIdAndDelete({_id:id});
        res.status(202).send({message:`Product with id: ${id} deleted successfully`});
    } catch (err) {
        res.status(400).send({message:'Something went wrong', err});
    }
});

module.exports = app;