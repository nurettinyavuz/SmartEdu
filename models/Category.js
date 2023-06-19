const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

//Postman'de verileri girerken sadece name gireceğiz slug otomatik olarak oluyor
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true, //Doldurulması zorunlu
  },
  slug:{
    type:String,
    unique:true
  }
});
//Slugify kısmı
CategorySchema.pre('validate',function(next){
  this.slug=slugify(this.name, {
    lower:true,//tüm harfleri küçültüyor
    strict:true,//Gereksiz karakterleri yok sayıyor örneğin : işareti vs
  });
  next();
})
//Slug dememizin nedeni slugify npm'ini kullandık bu da link yerinde ıd'yi yakalıyordum orada ıd gözüküyordu şimdi title'ı otomatik düzenleyip gösteriyor,daha güzel gözüküyor

//Bu kısım koleksiyonu oluşturuyor ama ismini otomatik olarak küçük harflere dönüştürür ve çoğul hale getirerek koleksiyon adını belirler (categories olarak oluşturur)
const Category = mongoose.model('Category',CategorySchema); 
module.exports=Category;