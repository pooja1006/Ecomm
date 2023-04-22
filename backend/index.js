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

app.delete("/product/:id",async (req,res)=>{
    const result = await Product.deleteOne({_id: req.params.id});
    res.send(result);
})
app.listen(8000);
