import mongoose from 'mongoose'

const Cities = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  value:{
    type:Array
  }
})

export default mongoose.model('Cities',Cities)
