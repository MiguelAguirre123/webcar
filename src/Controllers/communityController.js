require('express');
const community = require('../Models/community');

async function createCommunity(req, res) {
    try {
        await community.create({
            communityName: req.body.communityName,
            communityCreator: req.body.communityCreator,
            communityDescription: req.body.communityDescription
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
async function listCommunity(req, res) {
    try {
        await community.findAll({
            attributes: [
                'communityId',
                'communityName',
                'communityCreator',
                'communityDescription'
            ],
            order: ['communityName']
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
async function updateCommunity(req, res) {
    try {
        await community.update({
            communityName: req.body.communityName,
            communityDescription: req.body.communityDescription
        }, {
            where: { communityId: req.params.communityId }
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });

        })
    } catch (e) {
        console.log(e);
    }
}

async function disableCommunity(req, res) {
    try {
        await community.destroy({
            where: { communityId: req.params.communityId }
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });

        })
    } catch (e) {
        console.log(e);
    }
}
async function enableCommunity(req, res) {
    try {
        await community.restore({
            where: { communityId: req.params.communityId }
        }).then(function (data) {
            return res.status(200).json({
                data: data
            });
        }).catch(error => {
            return res.status(400).json({
                error: error
            });
        })
    } catch (e) {
        console.log(e);
    }
}
async function getCommunity(req, res) {
    try {
        await community.findOne({
            where: { communityId: req.params.communityId },
            attributes: [
                'communityId',
                'communityName',
                'communityCreator',
                'communityDescription'
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
    createCommunity,
    updateCommunity,
    disableCommunity,
    enableCommunity,
    listCommunity,
    getCommunity
}