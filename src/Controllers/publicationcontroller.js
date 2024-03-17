require('express');
const publication = require('../Models/publication');

async function createPublication(req, res){
    try{
        await publication.create({
            publicationContent: req.body.publicationContent,
            usuarioId: req.body.usuarioId

        }).then(function (data){
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

async function listPublication(req, res){
    try{
        await publication.findAll({
            attributes: [
                'publicationId',
                'publicationContent',
                'usuarioId'
            ],
            order: ['publicationId']
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

async function updatePublication(req, res){
    try{
        await publication.update({
            publicationContent: req.body.publicationContent,
            usuarioId: req.body.usuarioId


        },{
            where: { publicationId: req.params.publicationId }
        }).then(function (data){
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

async function disablePublication(req, res){
    try{
        await publication.destroy({
            where: { publicationId: req.params.publicationId }
        }).then(function (data){
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

async function enablePublication(req, res){
    try{
        await publication.restore({
            where: { publicationId: req.params.publicationId }
        }).then(function (data){
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
        console.log(e)
    }
}

module.exports = {
    createPublication,
    listPublication,
    updatePublication,
    disablePublication,
    enablePublication
}