const { Product, User , Category} = require('../models') 

module.exports = class Controller {

  static getProducts (req, res) {
    const {categoryId, sortBy, orderBy} = req.query
    const where =  categoryId ? {CategoryId: +categoryId} : null
    const order = sortBy && orderBy ? [[sortBy, orderBy]] :null
    const {role, user} = req.session
    Product.findAll({where, order, include: User})
    .then(data => {
      res.render('product',{ data, role, user })
    })
    .catch(error => {
      res.send(error)
    })
  }

  static createProduct (req, res) {
    Category.findAll()
    .then(data => {
      res.render('addProdcut', {data})
    })
    .catch(error => {
      res.send(error)
    })
    res.redirect('/producs/add')
  }

  static postCreateProduct (req, res) {
    const {user: {id: UserId}} = req.session
    const { name, description, price, imageUrl, CategoryId } = req.body
    const input = { name, description, price, imageUrl,UserId, CategoryId }
    Product.create(input)
    .then(data => {
      res.redirect('/products')
    })
    .catch(error => {
      res.send(error)
    })
  }

  static editProduct (req, res) {
    const {productId} = req.params
    let category = []
    Category.findAll()
    .then(data => {
      category = data
      return Product.findByPk(productId)
    })
    .then(data => {
      res.redirect('editProduct', {data, category})
    })
    .catch(error => {
      res.send(error)
    })
  }

  static postEditProduct (req, res) {  
    const {user:{id: UserId}} = req.session  
    const { productId } = req.params
    const { name, description, price, imageUrl, CategoryId } = req.body
    const input = { name, description, price, imageUrl,UserId, CategoryId }
    Product.update(input, { where: { id: productId }, returning: true } )
    .then(data => {
      res.redirect('/products')
    })
    .catch( error => {
      console.log(error);
      res.semd(error)
    })
  } 

  static deleteProduct (req, res) {
    const { productId } = req.params
    Product.destroy({ where: { id: productId } } )
    .then(data => {
      res.redirect('/products')
    })
    .catch( error => {
      res.send(error)
    })
  }
}