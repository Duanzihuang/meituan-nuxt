import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Menu = new Schema({
  menu:{
    type:Array,
    required:true
  }
})

export default mongoose.model('Menu',Menu)
