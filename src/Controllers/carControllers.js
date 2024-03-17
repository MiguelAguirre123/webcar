require('express');
const car = require('../Models/car');

async function createCar(req, res){
    try{
        await car.create({
            carName: req.body.carName,
            carModel: req.body.carModel,
            carBrand: req.body.carBrand,
            userId: req.body.userId
        }).then(function(data){
            return res.status(200).json({
                data: data
            });
        }).catch(error =>{
            return res.status(400).json({
                error: error
            });
        })
    }
    catch(e){
        console.log(e);
    }
}

async function listCar(req,res){
    try{
        await car.findAll({
            attributes: [
            'carId',
            'carName',
            'carModel',
            'carBrand',
            'userId'
            ],
            order:['carId']  
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

async function updateCar(req,res){
    try{
        await car.update({
            carName: req.body.carName,
            carModel: req.body.carModel,
            carBrand: req.body.carBrand,
            userId: req.body.userId
        },{
            where: { carId : req.params.carId}

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
async function disableCar(req,res){
    try{
        await car.destroy({

            where: {carId: req.params.carId}
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

async function enableCar(req,res){
    try {
        await car.restore({
            where: {carId: req.params.carId}
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



module.exports = {
    createCar,
    listCar,
    updateCar,
    disableCar,
    enableCar
}