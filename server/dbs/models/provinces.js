import mongoose from 'mongoose'

const Provinces = new mongoose.Schema({
  id:{
    type:String,
    require:true
  },
  value:{
    type:String,
    require:true
  }
})

export default mongoose.model('Provinces',Provinces)
