require('express');
const community = require('../Models/community');
const jwt = require('jsonwebtoken');
const jwtPassword = 'qwe987gfd';


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

// Métodos para operaciones de comunidad
async function createCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la creación de la comunidad
            await community.create({
                communityName: req.body.communityName,
                communityCreator: req.body.communityCreator,
                communityDescription: req.body.communityDescription
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in createCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function listCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la obtención de las comunidades
            await community.findAll({
                attributes: [
                    'communityId',
                    'communityName',
                    'communityCreator',
                    'communityDescription'
                ],
                order: ['communityName']
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in listCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la actualización de la comunidad
            await community.update({
                communityName: req.body.communityName,
                communityDescription: req.body.communityDescription
            }, {
                where: { communityId: req.params.communityId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in updateCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function disableCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la desactivación de la comunidad
            await community.destroy({
                where: { communityId: req.params.communityId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in disableCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function enableCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la activación de la comunidad
            await community.restore({
                where: { communityId: req.params.communityId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in enableCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getCommunity(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la obtención de la comunidad específica
            await community.findOne({
                where: { communityId: req.params.communityId },
                attributes: [
                    'communityId',
                    'communityName',
                    'communityCreator',
                    'communityDescription'
                ],
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in getCommunity:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    createCommunity,
    updateCommunity,
    disableCommunity,
    enableCommunity,
    listCommunity,
    getCommunity
}