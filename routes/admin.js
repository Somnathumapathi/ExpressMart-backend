const express = require('express')
const adminRouter = express.Router()
const admin = require('../middlewares/admin')
const Product = require('../models/product')

adminRouter.post('/admin/add-product', admin, async(req, res) => {
    try {
const {productName, description, quantity, price, category, imageUrls} = req.body
let product = new Product({
    productName, description, quantity, price, category, imageUrls
})
product = await product.save()
res.json(product)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

adminRouter.get('/admin/get-products', admin, async (req, res) => {
    try {
const products = await Product.find({})
res.json(products)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

adminRouter.delete('/admin/delete-product', admin, async (req, res) => {
    try {
        const {id} = req.body
        // console.log(id)
        let product = await Product.findByIdAndDelete(id)
        // console.log('Product deleted')
        res.json(product)
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

module.exports = adminRouter