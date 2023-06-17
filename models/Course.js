const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true, //Doldurulması zorunlu
  },
  description: {
    type: String,
    required: true, //Doldurulması zorunlu
    trim: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course',CourseSchema);
module.exports=Course;