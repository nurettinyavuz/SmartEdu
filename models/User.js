const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true, //Doldurulması zorunlu
  },
  email: {
    type: String,
    required: true, //Doldurulması zorunlu
    unique: true, //Uniqe dediğimiz ise 2 kullanıcı aynı veriyi giremiyor
  },
  password: {
    type: String,
    required:true,
  },
  role:{
    type:String,
    enum:["student","teacher","admin"],
    default:"student",
  }
});
//bcrypt modelini kullandık kullanmamızda ki amaç ;
//kullanıcı şifresini girdiği zaman veritabanında gözükmesin diye öyle yaptık çünkü herhangi biri veri tabanına erişebilidği zaman
//aşırı derecede güvenlik açığına sebep olacaktır
UserSchema.pre('save', function (next){
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
      user.password = hash;
      next();
  })
})

//Slug dememizin nedeni slugify npm'ini kullandık bu da link yerinde ıd'yi yakalıyordum orada ıd gözüküyordu şimdi title'ı otomatik düzenleyip gösteriyor,daha güzel gözüküyor

const User = mongoose.model('User',UserSchema);
module.exports=User;