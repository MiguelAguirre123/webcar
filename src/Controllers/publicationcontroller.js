const jwt = require('jsonwebtoken');
const publication = require('../Models/publication');
const jwtPassword = 'qwe987gfd';

// Función para verificar el token
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

// Middleware para verificar el token en todos los métodos
async function verifyTokenMiddleware(req, res, next) {
    try {
        await verifyToken(req, res, next);
    } catch (error) {
        console.error("Error in verifyTokenMiddleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Métodos para operaciones de publicación
async function createPublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la creación de la publicación
            await publication.create({
                publicationContent: req.body.publicationContent,
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
        console.error("Error in createPublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function listPublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la obtención de las publicaciones
            await publication.findAll({
                attributes: [
                    'publicationId',
                    'publicationContent',
                    'userId'
                ],
                order: ['publicationId']
            })
                .then(function (data) {
                    return res.status(200).json({ data });
                })
                .catch(error => {
                    return res.status(400).json({ error });
                });
        });
    } catch (error) {
        console.error("Error in listPublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getPublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la obtención de la publicación específica
            await publication.findOne({
                where: { publicationId: req.params.publicationId },
                attributes: [
                    'publicationId',
                    'publicationContent',
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
        console.error("Error in getPublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updatePublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la actualización de la publicación
            await publication.update({
                publicationContent: req.body.publicationContent,
                userId: req.body.useroId
            }, {
                where: { publicationId: req.params.publicationId }
            })
                .then(function (data) {
                    return res.status(200).json({ data });
                })
                .catch(error => {
                    return res.status(400).json({ error });
                });
        });
    } catch (error) {
        console.error("Error in updatePublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function disablePublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la desactivación de la publicación
            await publication.destroy({
                where: { publicationId: req.params.publicationId }
            })
                .then(function (data) {
                    return res.status(200).json({ data });
                })
                .catch(error => {
                    return res.status(400).json({ error });
                });
        });
    } catch (error) {
        console.error("Error in disablePublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function enablePublication(req, res) {
    try {
        await verifyToken(req, res, async () => {
            // Si el token es válido, continuar con la activación de la publicación
            await publication.restore({
                where: { publicationId: req.params.publicationId }
            })
                .then(function (data) {
                    return res.status(200).json({ data });
                })
                .catch(error => {
                    return res.status(400).json({ error });
                });
        });
    } catch (error) {
        console.error("Error in enablePublication:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createPublication,
    listPublication,
    getPublication,
    updatePublication,
    disablePublication,
    enablePublication,
    verifyTokenMiddleware
};