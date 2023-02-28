const {Schema, model} = require('mongoose');

const productSchema = Schema({
name : {type:String, required:true},
description : {type:String, required:true},
category : {type:String, required:true, enum:['clothing', 'electronics', 'furniture', 'other']},
image : {type:String, required:true},
location : {type:String, required:true},
postedAt : {type:String, required:true},
price : {type:String, required:true},
},{
    versionKey:false,
});

const ProductModel = model('product', productSchema);

module.exports = {
    ProductModel
};