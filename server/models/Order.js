import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    products:{
        type: [
            {
                product: {type: mongoose.Schema.ObjectId,ref:'Product'},
                quatity: { type: Number , default: 1},
            }
        ] ,
        
        required: true,
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User', 
       required: true,
    },
    total_amount:{
        type: mongoose.Types.Decimal128,
        required: true,
    },
    address:{
        type: String,
        default:"",
    },
    status:{
        type: String,
        default: 'Payment Done'
    },
   
},{timestamps: true});

export default  mongoose.model('Shopping-Order',orderSchema);