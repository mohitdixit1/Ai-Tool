
const { Schema, model } = require('mongoose');

UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
},{timestamps:true})


Usermodel = model('User', UserSchema);



module.exports = Usermodel;
