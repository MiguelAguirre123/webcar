require('express');

const customer = require('../Models/customer')


//crear usuario
async function createCustomer(req,res){
    try{
        await customer.create({
            customerName : req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerDescrip : req.body.customerDescrip,
            customerAddress : req.body.customerAddress,
            customerEmail: req.body.customerEmail,
        }).then(function(data){
            return res.status(200).json({
                data:data
            })
        }).catch(error =>{
            return res.status(400).json({
                error:error
            })
        })
    }
    catch(e){
        console.log(e)
    }
}

//listar usuaarios
async function listCustomer(req,res){
    try{
        await customer.findAll({
            attributes: [
            'customerId',
            'customerName',
            'customerPhone',
            'customerDescrip',
            'customerAddress',
            'customerEmail'
            ],
            order:['customerName']  
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }) .catch(error =>{
            return res.status(400).json({
                error:error
            })
        })

    }
    catch(e){
        console.log(e);
    }
}

async function updateCustomer(req,res){
    try{
        await customer.update({
            customerName : req.body.customerName,
            customerPhone: req.body.customerPhone,
            customerAddress : req.body.customerAddress,
            customerEmail: req.body.customerEmail,
        },{
            where: { customerId: req.params.customerId}

        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }) .catch(error =>{
            return res.status(400).json({
                error:error
            })
        })

    }
    catch(e){
        console.log(e);
    }
}

async function disableCustomer(req,res){
    try{
        await customer.destroy({

            where: { customerId: req.params.customerId}
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }) .catch(error =>{
            return res.status(400).json({
                error:error
            })
        })

    }
    catch(e){
        console.log(e);
    }
}
async function enableCustomer(req,res){
    try {
        await customer.restore({
            where: {customerId: req.params.customerId}
        }).then(function(data){
            return res.status(200).json({
                data:data
            });
        }).catch(error =>{
        return res.status(400).json({
            error: error
            });
        })
    } catch (e) {
    console.log(e);
    }
}
async function getCustomer(req, res) {
    try {
        await customer.findOne({
            where: { customerId: req.params.customerId },
            attributes: [
                
                'customerName',
                'customerPhone',
                'customerDescrip',
                'customerAddress',
                'customerEmail'
            ],
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    createCustomer,
    listCustomer,
    updateCustomer,
    disableCustomer,
    enableCustomer,
    getCustomer
}