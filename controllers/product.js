const { Product } = require('../models') 

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
    res.redirect('/producs/add')
  }

  static postCreateProduct (req, res) {
    //get the USER ID from the SESSION
    // const {user: {id: UserId}} = req.session
    const UserId = 1
    const { name, description, price, imageUrl, CategoryId } = req.body
    const input = { name, description, price, imageUrl,UserId, CategoryId }
    console.log("masuk product controller");
    Product.create(input)
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      console.log(error,".>>> werreo ");
      res.send(error)
    })
    
  }

  static editProduct (req, res) {
    const {productId} = req.params
    Product.findByPk( productId, { include: Categories } )
    .then(data => {
      res.redirect('editProduct', {data})
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
    const input = { name, description, price, imageUrl,UserId, CategoryId }
    //returning mengambalikan data setelah di edit, nanti dihapus
    Product.update(input, { where: { id: productId }, returning: true } )
    .then(data => {
      res.json(data)
      //res.redirect('/products')
    })
    .catch( error => {
      console.log(error);
      res.semd(error)
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