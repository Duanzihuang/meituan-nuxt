import mongoose from 'mongoose'

const Regions = new mongoose.Schema({
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  code:{
    type:Number,
    required:true
  },
  city:{
    type:String
  },
  description:{
    type:String
  }
})

export default mongoose.model('Regions',Regions)
