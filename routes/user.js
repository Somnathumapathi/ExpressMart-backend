const express = require('express')
const userRouter = express.Router()
const {Product} = require('../models/product')
const auth = require('../middlewares/auth')
const User = require('../models/user')

userRouter.post('/api/add-to-cart', auth, async (req, res) => {
   try {
    const {id} = req.body
    const product = await Product.findById(id)
    let user = await User.findById(req.user)

    let exProd = user.cart.find(item => item.product._id.equals(product._id))

    if(exProd) {
        exProd.quantity++
    } else {
        user.cart.push({product, quantity: 1})
    }

//     if(user.cart.length == 0) {
// user.cart.push({product, quantity: 1})
//     } else {
//         let isFound = false
//         // let foundProduct
//         for(let i = 0; i < user.cart.length; i++) {
// if(user.cart[i].product._id.equals(product._id)) {
//     user.cart[i].product.quantity+=1
//     isFound = true
// }
// }
//     if(!isFound) {
//             user.cart.push({product, quantity: 1})
//         }
//     }

    user = await user.save()
    res.json(user)

} catch (e) {
    return res.status(500).json({
        error: e.message
    })
}
})

userRouter.delete("/api/remove-from-cart/:id", auth, async (req, res) => {
try {
    const {id} = req.params
    const product = await Product.findById(id)
    let user = await User.findById(req.user)
    
    // if(product) {
    //     return res.json(product)
    // }
    
    for(let i = 0; i < user.cart.length; i++) {
        if(user.cart[i].product._id.equals(product._id)) {
            if(user.cart[i].quantity == 1) {
                user.cart.splice(i,1)
            } else {
                user.cart[i].quantity--
            }
        }
    }

    user = await user.save()
    return res.json(user)
   

} catch (e) {
    return res.status(500).json({error: e.message})
}
})

module.exports = userRouter