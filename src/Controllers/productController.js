require('express');
const product = require('../Models/product');
const customer = require('../Models/customer');


//crear producto
async function createProduct(req, res){
    try{
        await product.create({
            productName : req.body.productName,
            productDescription : req.body.productDescription,
            productPrice : req.body.productPrice,
            customerId : req.body.customerId, 
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }).catch(error =>{
            return res.status(400).json({
                error:error
            });
        });
    }
    catch(e){
        console.log(e);
    }
}
async function listProduct(req, res){
    try{
        await product.findAll({
            attributes: [
                'productId',
                'productName',
                'productDescription',
                'productPrice',
                'customerId'
            ],
            order: ['productName'],
            include: {
                model: customer,
                where: { customerId : req.params.customerId },
                attributes: ['customerName']
            }
        }).then(function (data){
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    }
    catch(e){
        console.log(e);
    }
}
async function updateProduct(req,res){
    try{
        await product.update({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            customerId: req.body.customerId,            
        },{
            where: { customerId: req.params.customerId}

        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }) .catch(error =>{
            console.log(error)
            return res.status(400).json({
                error:error
            })
        })

    }
    catch(e){
        
        console.log(e);

    }
}
async function disableProduct(req,res){
    try{
        await product.destroy({

            where: {productId: req.params.productId}
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }) .catch(error =>{
            console.log(error)
            return res.status(400).json({
                error:error
            })
        })

    }
    catch(e){
        console.log(e);
    }
}
async function enableProduct(req,res){
    try {
        await product.restore({
            where: {productId: req.params.productId}
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }).catch(error =>{
          console.log(error)
        return res.status(400).json({
            error: error
            });
        })
    } catch (e) {
    console.log(e);
    }
}



module.exports = {
    createProduct,
    listProduct,
    updateProduct,
    disableProduct,
    enableProduct
}