const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();

//middle express json 
app.use(express.json())
app.use(cors());

//register a new user
app.post('/register',async (req,res)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
})

//login a existing user
app.post('/login',async (req,res)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
    if(user){
        res.send(user);
    }
    else{
        res.send({result: 'no user found'})
    }
    }
    else{
        res.send(await {result: 'email or password is missing'})
    }
})

//add a new product
app.post('/add-product',async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

//get list of products

app.get('/products',async(req,res)=>{
    let products = await Product.find();
    if(products.length > 0){
        res.send(products);
    }
    else{
        res.send(await {result: "No Products found"})
    }
})

//to delete a product
app.delete("/product/:id",async (req,res)=>{
    const result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
})

//get a product
app.get("/product/:id",async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result: 'No record found'});
    }
})

//update a product
app.put('/product/:id',async (req,res)=>{
    let result = await Product.updateOne({_id: req.params.id},{$set: req.body})
    res.send(result)
})

//search in product list
app.get("/search/:key",async(req,res)=>{
    let result = await Product.find({
        "$or" : [
            {name: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {company: {$regex: req.params.key}}
        ]
    })
    res.send(result);
})

//to get a product with single user
app.get("/products/:id",async (req,res)=>{
    // console.log(req.params.id)
    let products = await Product.find({userId: req.params.id});
    if(products){
        res.send(products);
    }
    else{
        res.send({result: 'No record found'});
    }
    // res.send(req.params.id);
})
app.listen(8000);
