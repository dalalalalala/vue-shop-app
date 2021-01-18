import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 模型
const cartSchema=new Schema({
  userId: {
    type: String,
    require: true,
  },
  imgurl:{
    type: String,
    require: true,
  },
  title:{
        type: String,
        require: true,
    },
  vipprice:{
      type: String,
      require: true,
  },
  price:{
      type: String,
      require: true,
  },
  number:{
      type: Number,
      require: true,
  },
  sku:{
      type: String,
  },
  shop:{
      type: String,
  },
  saleNum:{
      type: Number,
      require: true,
  },
  expressAmount:{
      type: Number,
      require: true,
  },
  goodsAddress:{
      type: String,
      require: true,
  },
  createTime:{
      type: Date,
      default: Date.now,
  }
})

//导出
export default mongoose.model('Cart', cartSchema)