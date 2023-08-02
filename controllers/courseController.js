const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      //Kurs açmak için form'dan bilgileri alacağız
      name: req.body.name,
      description: req.body.description, //req.body.name yazsaydık otomatik olarak name'i alacaktı
      category: req.body.category,
      user: req.session.userID, //userID'yi authMiddlewear'da tanımlamıştık (Hangi kullanıcı o an login durumundaysa o işe yarıyor kısacası)
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
    const query = req.query.search; //(search yazmamızın nedenicourses.ejs sayfasında name'in adına search dedik ) arama sorgusu bilgilerine erişmek için req.query kullandıldı

    let filter = {}; 
    
    //categorySlug değeri mevcutsa aşağıya geçer (Yani kullanıcı kurs sayfasında bir tane kategoriye tıklarsa onu filtrelemek için kullanıyoruz bu kısmı)
    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }

    // filtre ismi (name) arama sorgusuyla eşleşen kursları listelemek için kullanıldı
    if (query) {
      filter = { name: query };
    }

    //query veya categoryslug yoksa
    if (!query && !categorySlug) {
      (filter.name = ''), (filter.category = null); 
    }

    //$or operatörü kullanılarak filtre, kurs adı veya kategoriye göre uygulanır. $regex ve $options kullanılarak, kurs adının büyük/küçük harfe duyarlı olmaz
    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    }).sort('-CreatedAt').populate('user'); //Tüm kursları sıraladı (Eğer kategori seçilmezse filter'ın içi boş olduğu için tüm kursları gösterecek) sort ile de sıraladık en son eklenen en başa geldi

    const categories = await Category.find(); //Tüm kategorileri sıraladı

    res.status(200).render('courses', {
      courses,
      categories, //Kategoriler tüm kursların gözüktüğü sayfada gözüktüğü için buraya yazdık verileri buraya çektik
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
    const user = await User.findById(req.session.userID);
    const categories = await Category.find(); //Tüm kategorileri çektik çünkü ekranın sağ tarafına doğru verileri yazdırabilmek için

    //burada Id yerine slug yakalıyoruz linkte ıd yerine title gözüksün diye
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    ); //belirtilen bir alanı referans olarak saklayan belgeleri başka bir koleksiyondan (burada "user" koleksiyonu) getirir(Çünkü öğretmen adını çekebilmek için)
    res.status(200).render('course', {
      //Burada yazan isim ejs sayfası
      course,
      user,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    //id'si body'den gelen course_id 'ye eşit olan id'yi kursu o kullanıya ekle
    await user.courses.push({ _id: req.body.course_id }); //course_id yazdığım kısım course.ejs'de Enroll butonuna verdiğim name (push ile ekleme yapıyoruz)
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
