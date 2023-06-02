const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const userSchema= new mongoose.Schema(
{
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: "admin"
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    //wishlist: [{type: ObjectId, ref:"Product"}]
},
    {timestamps: true}
);

//creezi modelul User pe baza lui userSchema si il exporti
module.exports = mongoose.model("User", userSchema)