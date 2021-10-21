const { Product, Category, User } = require('../models') 

module.exports = class Controller {

  static getProducts (req, res) {
    // const {sort, name} = req.query
    // const where = name ? {name} : null

    const {role} = req.session
    Product.findAll()
    .then(data => {
      res.render('product',{ data, role })
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })
  }


  static createProduct (req, res) {
    Category.findAll()
    .then(data => {
      // console.log(data[1].Category.name);
      res.render('addProduct', {data})
    })
    .catch(err => {
      res.send(err)
    })
  }
  //Post create Product masih error
  static postCreateProduct (req, res) {
    //get the USER ID from the SESSION
    const {user: {id: UserId}} = req.session
    // const UserId = 1  // ini masih belum tau apa
    const { name, description, price, CategoryId, imageUrl  } = req.body
    const input = { name, description, price, CategoryId, UserId, createdAt: new Date(), updatedAt: new Date(), imageUrl }  //Menghapus UserId
    // console.log("masuk product controller");
    Product.create(input)
    .then(data => {
      res.redirect("/products")
    })
    .catch(error => {
      // console.log(error,".>>> werreo ");
      res.send(error)
    })
    
  }

  static editProduct (req, res) {
    let id = req.params.productId
    // const {productId} = req.params
    Product.findAll({
      where: { 
        id:id
      },
      include: {
        model: Category
      }
    })
    .then(data => {
      res.render('editProduct', {data})
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })
  }

  static postEditProduct (req, res) {
    //GET USER ID FROM SESSION AND MAKE SURE THE ROLE IN THE MIDDLEWARE
    const UserId = 1
    const { productId } = req.params
    const { name, description, price, imageUrl, CategoryId } = req.body
    const input = { name, description, price, imageUrl, UserId, CategoryId }
    //returning mengambalikan data setelah di edit, nanti dihapus
    Product.update(input, { where: { id: productId }, returning: true } )
    .then(data => {
      // res.json(data)
      res.redirect('/products')
    })
    .catch( error => {
      console.log(error);
      res.send(error)
    })
  } 

  static deleteProduct (req, res) {
    const UserId = 1
    const { productId } = req.params
    Product.destroy({ where: { id: productId } } )
    .then(data => {
      res.json(data)
      // res.redirect('/products')
    })
    .catch( error => {
      console.log(error)
      res.send(error)
    })
  }
}