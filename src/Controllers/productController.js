const express = require('express');
const jwt = require('jsonwebtoken');
const product = require('../Models/product');
const customer = require('../Models/customer');
const jwtPassword = 'qwe987gfd';

// Función para verificar el token
function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Missing or invalid token" });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwtPassword, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Invalid token" });
            }
            next();
        });
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Middleware para verificar el token en todos los métodos
async function verifyTokenMiddleware(req, res, next) {
    try {
        await verifyToken(req, res, next);
    } catch (error) {
        console.error("Error in verifyTokenMiddleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Crear producto
async function createProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await product.create({
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                customerId: req.body.customerId,
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in createProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Listar productos
async function listProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
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
                    where: { customerId: req.params.customerId },
                    attributes: ['customerName']
                }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in listProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Obtener producto por ID
async function getProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await product.findOne({
                where: { productId: req.params.productId },
                attributes: [
                    'productId',
                    'productName',
                    'productDescription',
                    'productPrice',
                    'customerId'
                ],
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in getProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Actualizar producto
async function updateProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await product.update({
                productName: req.body.productName,
                productDescription: req.body.productDescription,
                productPrice: req.body.productPrice,
                customerId: req.body.customerId,
            }, {
                where: { productId: req.params.productId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                console.error(error);
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in updateProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Deshabilitar producto
async function disableProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await product.destroy({
                where: { productId: req.params.productId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                console.error(error);
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in disableProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Habilitar producto
async function enableProduct(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await product.restore({
                where: { productId: req.params.productId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                console.error(error);
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in enableProduct:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createProduct,
    listProduct,
    updateProduct,
    disableProduct,
    enableProduct,
    getProduct,
    verifyTokenMiddleware
};
