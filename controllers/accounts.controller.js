const AccountsModel = require('../models/accounts.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getOneUser =  (req, res, next) => {
    const id = req.params.id
    AccountsModel.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
}

const postUser =  (req, res, next) => {
    const { uname, password } = req.body
    try {
        AccountsModel.create({
            uname: uname,
            password: password,
        })
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    }catch (err) {
        res.json({ ErrorMessage: 'something went wrong'})
    }
}

const putUser =  (req, res, next) => {
    const id = req.params.id
    const { uname, password, favorites } = req.body

    AccountsModel.findByIdAndUpdate( id , {
        uname: uname,
        password: password,
        favorites: favorites
    }, { returnDocument: 'after'})
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.json(err)
        })
}

const deleteUser =  (req, res, next) => {
    const id = req.params.id
    AccountsModel.findByIdAndDelete( id )
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.json(err)
        })
}

const loginAccount = (req, res, next) => {
    const uname = req.body.uname
    const password = req.body.password
    // res.json(req.body.uname)
    AccountsModel.findOne({
        uname: uname,
    })
        .then(data => {
            if (data) {
                // res.json(data)
                bcrypt.compare(password, data.password, function (err, result) {
                    if (result) {
                        var token = jwt.sign({
                            _id: data._id
                        }, 'phonereview')
                        //10 ngay
                        res.cookie('token', token,
                            { expires: new Date(Date.now() + 864000000) });
                        res.json({ message: 'dang nhap thanh cong', token: token, data })
                    } else {
                        res.json({ wrongPassword: 'Sai mật khẩu' })
                    }
                })
            } else {
                res.json({ wrongUsername: 'Username không tồn tại' })
            }
        })
        .catch(err => {
            res.json({ message: 'co loi server' })
        })
}

module.exports = {getOneUser, postUser, putUser, deleteUser, loginAccount}