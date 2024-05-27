require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const user = require('../Models/user')
const jwtPassword = 'qwe987gfd'

function verifyToken(req, res, next) {
    try {
        // Verificar si se proporcionó un token en el encabezado de autorización
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Missing or invalid token" });
        }

        // Extraer el token real eliminando el prefijo "Bearer "
        const token = authHeader.split(' ')[1];

        // Verificar si el token es válido
        jwt.verify(token, jwtPassword, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Invalid token" });
            }
            // Si el token es válido, continuar con la ejecución del siguiente middleware
            next();
        });
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function verifyTokenMiddleware(req, res, next) {
    try {
        await verifyToken(req, res, next);
    } catch (error) {
        console.error("Error in verifyTokenMiddleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//crear usuario
async function createUser(req,res){
    try{
        const hashPassword = await bcrypt.hash(req.body.userPassword, 10)

        await user.create({
            userName : req.body.userName,
            userPhone: req.body.userPhone,
            userNickName : req.body.userNickName,
            userPassword: hashPassword,
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

async function login(req, res){
    try{
        const userData = await user.findOne({ where: { userNickName: req.body.userNickName}})

        if(!userData)
            return res.status(401).json({message: "User not found"})

        const validPassword = await bcrypt.compare(req.body.userPassword, userData.userPassword)

        if(!validPassword)
            return res.status(401).json({message: "Invalid password"})

        const token = jwt.sign(
            { userId: userData.userId, userRole: userData.userRole },
            jwtPassword,
            { expiresIn: '60s'}
        )

        return res.status(200).json({ token })
    }
    catch (e){
        console.log(e)
    }
}

//listar usuaarios
async function listUsers(req,res){
    try{
        await verifyToken(req, res, async () => {
            await user.findAll({
                attributes: [
                'userId',
                'userName',
                'userPhone',
                'userNickName',
                'userPassword',
                'userAddress',
                'userEmail'
                ],
                order:['userName']  
            }).then(function(data){
                return res.status(200).json({data:data});
            }) .catch(error =>{
                return res.status(400).json({error:error})
            });
    });
    }
    catch(error){
        console.error("Error in listUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateUser(req,res){
    try{
        await verifyToken(req, res, async () => {
            await user.update({
                userName : req.body.userName,
                userPhone: req.body.userPhone,
                userNickName : req.body.userNickName,
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
        });

    }
    catch(error){
        console.error("Error in updateUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function disableUser(req,res){
    try{
        await verifyToken(req, res, async () => {
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
        });
    }
    catch(error){
        console.error("Error in updateUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function enableUser(req,res){
    try {
        await verifyToken(req, res, async () => {
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
        });
    } catch (error) {
        console.error("Error in updateUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getUser(req, res){
    try{
        await verifyToken(req, res, async () => {
            await user.findOne({
                where: {userId: req.params.userId},
                attributes: [
                    'userId',
                    'userName',
                    'userPhone',
                    'userNickName',
                    'userPassword',
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
        });
    }
    catch(error){
        console.error("Error in updateUser:", error);
        return res.status(500).json({ message: "Internal server error" });;
    }
}

module.exports = {
    createUser,
    login,
    listUsers,
    updateUser,
    disableUser,
    enableUser, 
    getUser,
    verifyToken,
    verifyTokenMiddleware
}
