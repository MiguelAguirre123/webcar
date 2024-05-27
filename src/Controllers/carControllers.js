const jwt = require('jsonwebtoken');
const car = require('../Models/car');
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

async function verifyTokenMiddleware(req, res, next) {
    try {
        await verifyToken(req, res, next);
    } catch (error) {
        console.error("Error in verifyTokenMiddleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function createCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.create({
                carName: req.body.carName,
                carModel: req.body.carModel,
                carBrand: req.body.carBrand,
                userId: req.body.userId
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in createCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function listCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.findAll({
                attributes: [
                    'carId',
                    'carName',
                    'carModel',
                    'carBrand',
                    'userId'
                ],
                order: ['carId']
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in listCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.update({
                carName: req.body.carName,
                carModel: req.body.carModel,
                carBrand: req.body.carBrand,
                userId: req.body.userId
            }, {
                where: { carId: req.params.carId }
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in updateCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function disableCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.destroy({
                where: { carId: req.params.carId }
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in disableCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function enableCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.restore({
                where: { carId: req.params.carId }
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in enableCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getCar(req, res) {
    try {
        await verifyToken(req, res, async () => {
            await car.findOne({
                where: { carId: req.params.carId },
                attributes: [
                    'carId',
                    'carName',
                    'carModel',
                    'carBrand',
                    'userId'
                ],
            })
            .then(function (data) {
                return res.status(200).json({ data });
            })
            .catch(error => {
                return res.status(400).json({ error });
            });
        });
    } catch (error) {
        console.error("Error in getCar:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createCar,
    listCar,
    updateCar,
    disableCar,
    enableCar,
    getCar,
    verifyTokenMiddleware
};