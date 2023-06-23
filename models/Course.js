const mongoose = require('mongoose');
const slugify = require('slugify');

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
  slug:{
    type:String,
    unique:true
  },
  category:{//Kurs sayfasında kategoriler olduğu için eşleşdirdik verileri çekebilmek için
    type:mongoose.Schema.Types.ObjectId,//Dersi açarken önceden açılan kategorinin ID'sini yazıyoruz categoriy kısmına (Postman'de)
    ref:'Category'
  }
});
CourseSchema.pre('validate',function(next){
  this.slug=slugify(this.name, {
    lower:true,//tüm harfleri küçültüyor
    strict:true,//Gereksiz karakterleri yok sayıyor örneğin : işareti vs
  });
  next();
})
//Slug dememizin nedeni slugify npm'ini kullandık bu da link yerinde ıd'yi yakalıyordum orada ıd gözüküyordu şimdi title'ı otomatik düzenleyip gösteriyor,daha güzel gözüküyor

const Course = mongoose.model('Course',CourseSchema);
module.exports=Course;