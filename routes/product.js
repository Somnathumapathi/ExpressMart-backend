const express = require('express')
const productRouter = express.Router()
const auth = require('../middlewares/auth')
const Product = require('../models/product')

productRouter.get('/api/products', auth, async (req, res) => {
    try {
        const products = await Product.find({category: req.query.category})
        // console.log(products)
        res.json(products)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

productRouter.get('/api/search-suggestions', auth, async(req, res) => {
    try {
        const products = await Product.find({productName: {$regex: `^${req.query.ch}`}}).select('productName')
        res.json(products)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

productRouter.get('/api/search/:query', auth, async(req, res) => {
    try{
        const products = await Product.find({ productName : {
            $regex: req.params.query
        }})
        res.json(products)
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

module.exports = productRouter