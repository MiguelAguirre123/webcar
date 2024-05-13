require('express');

const user = require('../Models/user')


//crear usuario
async function createUser(req,res){
    try{
        await user.create({
            userName : req.body.userName,
            userPhone: req.body.userPhone,
            userNickName : req.body.userNickName,
            userAddress : req.body.userAddress,
            userEmail: req.body.userEmail,
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
async function listUsers(req,res){
    try{
        await user.findAll({
            attributes: [
            'userId',
            'userName',
            'userPhone',
            'userNickName',
            'userAddress',
            'userEmail'
            ],
            order:['userName']  
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

async function updateUser(req,res){
    try{
        await user.update({
            userName : req.body.userName,
            userPhone: req.body.userPhone,
            userAddress : req.body.userAddress,
            userEmail: req.body.userEmail,
        },{
            where: { userId: req.params.userId}

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

async function disableUser(req,res){
    try{
        await user.destroy({

            where: { userId: req.params.userId}
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
async function enableUser(req,res){
    try {
        await user.restore({
            where: {userId: req.params.userId}
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
async function getUser(req, res){
    try{
        await user.findOne({
            where: {userId: req.params.userId},
            attributes: [
                'userId',
                'userName',
                'userPhone',
                'userNickName',
                'userAddress',
                'userEmail'
            ],
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

module.exports = {
    createUser,
    listUsers,
    updateUser,
    disableUser,
    enableUser, 
    getUser
}