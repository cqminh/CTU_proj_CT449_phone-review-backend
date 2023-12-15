const PhonesModel = require('../models/phones.model');
const jwt = require('jsonwebtoken');

const getAllPhones =  (req, res, next) => {
    PhonesModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
}

const getOwnPhones =  (req, res, next) => {
    const accountID = req.params.accountID
    PhonesModel.find({accountID : accountID})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
}

const getOnePhones =  (req, res, next) => {
    const id = req.params.id
    PhonesModel.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
}

const getFavoritePhones =  (req, res, next) => {
    res.json('get favorite phones')
}

const postPhones =  (req, res, next) => {
    const title = req.body.title
    const content = req.body.content
    const link = req.body.link
    const imgs = req.body.imgs
    const token = req.body.token
    try {
        var accountID = jwt.verify(token, 'phonereview')
        PhonesModel.create({
            title : title,
            content : content,
            link : link,
            imgs : imgs,
            accountID : accountID,
        })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ ErrorMessage: 'something wrong' })
        })
    } catch (err) {
        res.json({ ErrorMessage: 'must be login' })
    }
}

const putPhones =  (req, res, next) => {
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const link = req.body.link
    const imgs = req.body.imgs
    const accountID = req.body.accountID
    // const token = req.body.token
    PhonesModel.findByIdAndUpdate( id , {
        title : title,
        content : content,
        link : link,
        imgs : imgs,
        accountID : accountID,
    }, { returnDocument: 'after'})
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.json(err)
        })
}

const deletePhones =  (req, res, next) => {
    const id = req.params.id
    PhonesModel.findByIdAndDelete( id )
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = {getAllPhones, getOnePhones, getFavoritePhones, postPhones, putPhones, deletePhones, getOwnPhones}