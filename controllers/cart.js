const { Cart, CartItem, Product, Transaction, Order} = require('../models')

module.exports = class Controller {
  static getCart(req, res) {
    const { user: { id: UserId }, role } = req.session
   
    // update cart subtotal 
    Cart.findOne({ where: { UserId }, include: {all: true, nested: true} } )
    .then(data => {
      let subTotal = 0
      // IF CART ADA 
      if(data) {
        data.dataValues.CartItems.forEach(el => {
          subTotal += el.subTotal
        })
        return Cart.update({ subTotal },  { where: {UserId},  returning:true })
      }

    })
    .then(data => {
      //get cart beserta cartITem
      // IF CART ADA
      if(data) {
        return Cart.findOne({ where: { UserId }, include: {all: true, nested: true} } )
      }
    })
    .then(data => {
      // tampilkan cart beserta cartitem
      res.render('cart', {data, role})
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })

  }

  static addToCart(req, res) {
    const { user: { id: UserId } } = req.session
    const ProductId  = +req.body.ProductId
    const itemInput = { quantity: 1, ProductId }
    let price = 0

    Product.findByPk(ProductId)
    .then( data => {
      price = data.price
      return Cart.findOrCreate( { where: { UserId }, defaults: { UserId } } )
    })
    .then(data => {
      // if cart belum ada, KETERANGAN TRUE/FALSE --> TRUE: CREATE,, FALSE: FIND
      if ( data[1] ) {
        //DATA ADA DI INDEX KE [0]
        // res.json({message: "inidari  CREATE" , data})

       
      } else {
        // if cart ditemukan
        // res.json({message: "ini dari find", data})
      }

      //HITUNG subtotal di front end atau di controller

      // update the cartId in itemInput
      itemInput.CartId = data[0].dataValues.id
      itemInput.subTotal = price
      
      //CARO APAKAH PRODUCT SUDAH ADA DI CART ITEM
      
      return CartItem.findOrCreate( { where: { ProductId }, defaults: itemInput } )
    })
    .then( data => {
      if ( !data[1] ) {
        // res.json({message: "ini dari find", data})
        // update quantity by one 
        const updateInput = { ...data[0].dataValues }
        delete updateInput.id
        updateInput.quantity += 1
        updateInput.subTotal = updateInput.quantity * price
        return CartItem.update( updateInput, {  where: { id: data[0].id } } )

      } 

    })
    .then( data => {
      // res.json("aku sudah di then terakhir nih")
      //redirect to cart page
      res.redirect('/carts')
      // res.json({message:"ini sudah di increment by 111 ", data})
    })
    .catch(error => {
      console.log(error);
      res.send(error)
    })

  }

  static deleteItem(req, res) {

  }

  static checkout(req,res) {
    const { user: {id: UserId}} = req.session
    let transactionId  = 0 

    Transaction.create( {UserId})
    .then(data => {
      transactionId = data.id
      return Cart.findOne({ where: { UserId }, include: {all: true, nested: true} } )
    })
    .then(data => {
      // cart && cart items
      console.log("MASUK KE CART -----------------------");
      const bulkOrderInput = data.CartItems.map (el => {
        const {name, price, description, imageUrl} = el.Product
        return {
          itemName: name,
          itemImageUrl: imageUrl,
          itemPrice: price,
          itemDescription: description,
          quantity: el.quantity,
          subTotal: el.subTotal,
          TransactionId: transactionId
        }
      })
      // console.log(data.CartItems[0].Product,"<<<<< ini data dari  PRODUCTTTTfind one");
      // res.render('transaction', {data})

      return Order.bulkCreate(bulkOrderInput)
    })
    .then(data => {
      //DELTE CART 

      return Cart.destroy({where: {UserId}, returning:true})
    })
    .then(data => {
      res.redirect('/products')
      console.log(data, "CART SUDAH DI DELETE");
    })
    .catch(error => {
      console.log(error, ">>>>> errrorrorroororoor");
      res.send(error)
    })

  }



//   try {
//     const newTransaction = await Transaction.create(input)
//     console.log(newTransaction);
//     const cartItems = await Cart_Item.findAll({ where: { User_ID: userId }, include: [Product] })

//     cartItems.forEach(async el => {
//         const { price: itemPrice, name: itemName, image_url } = el.Product
//         const { itemQuantity, id } = el
//         const orderData = { itemName, itemPrice, itemQuantity, image_url, User_ID: userId, Transaction_ID: newTransaction.id }

//         const newOrder = await Order.create(orderData)
//         const deletedCart = await Cart_Item.destroy({ where: { id } })
//         res.status(201).json(newTransaction)
//     });

// }
}