import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }
})

export default mongoose.model('User',UserSchema)
