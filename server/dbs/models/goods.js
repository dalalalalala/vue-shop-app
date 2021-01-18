import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 模型
const goodsSchema=new Schema({
  imgurl:{
    type:String,
    require: true
  },
  title:{
    type: String,
    require:true,
  },
  vipprice:{
    type: String,
  },
  price:{
    type: String,
  },
  content:{
    type: String,
  },
  createTime:{
    type: Date,
    default: Date.now,
  }
})
//导出
export default mongoose.model('goods', goodsSchema)