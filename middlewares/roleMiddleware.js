module.exports = (roles) => {//roles'ün içinde teacher ve admin var courseRoute sayfasında yazdım
  return (req, res, next) => {
    const userRole = req.body.role; //register.ejs'de name olarak role yazdık oradan geldi
    if (roles.includes(userRole)) {//Eğer kullanıcının rolü, roles dizisindeki bir rolle eşleşiyorsa, yani kullanıcıya yetki verilmişse, next() işlevi çağrılarak sonraki adıma geçilir.
      next();
    } else {//Eğer yetki verdiğimiz kullanıcı type'ı ile seçilen type aynı değilse ve özel bir özelli,k kullanacaksa yazıyı gönderir
      return res.status(401).send('YOU CANT DO IT');
    }
  };
};
