const express = require('express');
const jwt = require('jsonwebtoken');
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

// Crear cliente
async function createCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await customer.create({
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerDescrip: req.body.customerDescrip,
                customerAddress: req.body.customerAddress,
                customerEmail: req.body.customerEmail,
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in createCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Listar clientes
async function listCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await customer.findAll({
                attributes: [
                    'customerId',
                    'customerName',
                    'customerPhone',
                    'customerDescrip',
                    'customerAddress',
                    'customerEmail'
                ],
                order: ['customerName']
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in listCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Obtener cliente por ID
async function getCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
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
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in getCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Actualizar cliente
async function updateCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await customer.update({
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone,
                customerAddress: req.body.customerAddress,
                customerEmail: req.body.customerEmail,
            }, {
                where: { customerId: req.params.customerId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in updateCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Deshabilitar cliente
async function disableCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await customer.destroy({
                where: { customerId: req.params.customerId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in disableCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Habilitar cliente
async function enableCustomer(req, res) {
    try {
        await verifyTokenMiddleware(req, res, async () => {
            await customer.restore({
                where: { customerId: req.params.customerId }
            }).then(function (data) {
                return res.status(200).json({ data });
            }).catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (e) {
        console.error("Error in enableCustomer:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createCustomer,
    listCustomer,
    updateCustomer,
    disableCustomer,
    enableCustomer,
    getCustomer,
    verifyTokenMiddleware
};
