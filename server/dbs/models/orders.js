import mongoose from 'mongoose'
const Schema = mongoose.Schema

//模型
const orderSchema = new Schema({
    goodId:{
        type: String,
        require: true,
    },
    reciever:{
        type: String,
        require: true,
    },
    recieverPhone:{
        type: String,
        require: true,
    },
    recieverAddress:{
        type: String,
        require: true,
    },
    totalPrice:{
        type: String,
        require: true,
    },
    payType:{
        type: String,
        require: true,
    },
    userId:{
        type: String,
        require: true,
    },
    createTime:{
        type: Date,
        default: Date.now,
    }
})

//导出
export default mongoose.model('Orders', orderSchema)