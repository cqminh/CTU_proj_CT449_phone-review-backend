const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/phonereview');

const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

const phonesSchema = Schema({
    accountID: { type: ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String},
    imgs: {
        type : [String]
    },
},
{
    timestamps: true
});

const PhonesModel = mongoose.model('Phone', phonesSchema);

module.exports = PhonesModel;
