import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        default: null,
    },
    cart:{
        type: [
            {
                product: {type:mongoose.Schema.Types.ObjectId,ref:'Product'},
                quatity: { type: Number , default: 1},
            }
        ],

        default: [],
    },

    favourites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        default: [],
    },

    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Shopping-Order',
        default: [],
    },
    
},{timestamps: true});

export default  mongoose.model('User',userSchema);