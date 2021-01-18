import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 模型
const UserSchema=new Schema({
  username:{
    type:String,
    unique:true,
    require: true
  },
  password:{
      type: String,
      require:true,
  },
  createTime:{
      type: Date,
      default: Date.now,
  }
})
//导出
export default mongoose.model('Users', UserSchema)