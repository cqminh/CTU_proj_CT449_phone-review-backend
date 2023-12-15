const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/phonereview');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

const accountsSchema = Schema({
    uname : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    favorites: {
        type : [String]
    },
},
{
    timestamps: true
});

accountsSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
        .catch(error => {
            console.log(`Error in hashing password: ${error.message}`);
            next(error);
        });
})

const AccountsModel = mongoose.model('Account', accountsSchema);

module.exports = AccountsModel;
