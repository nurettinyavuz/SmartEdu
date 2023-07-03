const Course = require('../models/Course');
const Category = require('../models/Category');


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({//Kurs açmak için form'dan bilgileri alacağız
      name: req.body.name,
      description: req.body.description,//req.body.name yazsaydık otomatik olarak name'i alacaktı
      category: req.body.category,
      user: req.session.userID //userID'yi authMiddlewear'da tanımlamıştık (Hangi kullanıcı o an login durumundaysa o işe yarıyor kısacası)
    }); 
    //try-catch yapmamızın nedeni hatayı yakalamak için
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      //Hatalı request gönderilirse dönecek
      //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
      status: 'fail',
      error,
    });
  }
};

//Listelemek için
exports.getAllCourse = async (req, res) => {
  try {
    //Bu kısım kullanıcının kurs sayfasında herhangi bir kategoriye tıkladığı zaman o kategorideki verileri listelemek için filtreledik
    const categorySlug = req.query.categories;

    let filter = {};//İleride seacrhBar'ı aktifleştireceğimiz için boş bir filtre açtık

    if(categorySlug) {//categorySlug değeri mevcutsa aşağıya geçer (Yani kullanıcı kurs sayfasında bir tane kategoriye tıklarsa onu filtrelemek için kullanıyoruz bu kısmı)
      const category = await Category.findOne({slug:categorySlug})
      filter = {category:category._id}
    }
    //try-catch yapmamızın nedeni hatayı yakalamak için
    const courses = await Course.find(filter).sort('-CreatedAt'); //Tüm kursları sıraladı (Eğer kategori seçilmezse filter'ın içi boş olduğu için tüm kursları gösterecek) sort ile de sıraladık en son eklenen en başa geldi

    const categories = await Category.find();//Tüm kategorileri sıraladı 

    res.status(200).render('courses', {
      courses,
      categories,//Kategoriler tüm kursların gözüktüğü sayfada gözüktüğü için buraya yazdık verileri buraya çektik 
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      //Hatalı request gönderilirse dönecek
      //Oluşturulan yeni kursu template'e göndermiyoruz json dosyasında saklıyacaağız
      status: 'fail',
      error,
    });
  }
};

//TEKİL KURS
exports.getCourse = async (req, res) => {
  try {
    //burada Id yerine slug yakalıyoruz linkte ıd yerine title gözüksün diye
    const course = await Course.findOne({ slug: req.params.slug }).populate('user');//belirtilen bir alanı referans olarak saklayan belgeleri başka bir koleksiyondan (burada "user" koleksiyonu) getirir(Çünkü öğretmen adını çekebilmek için)
    res.status(200).render('course', {//Burada yazan isim ejs sayfası
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error, 
    });
  }
};
