const { Transaction } = require('../models')
// const nodemailer = require('nodemailer')

module.exports = class Controller {
  static listTransactions(req, res) {
    console.log("MASUK LIST TRANSACTION", req.session);
    const {user:{ id: UserId}, role} = req.session

    Transaction.findAll({ where: {UserId} })
    .then(data => {
      console.log("masuk then terakhisr");
      res.render('transaction', {data,role})
    })
    .catch(error => {
      console.log(error);
      res.send(error)

    })
  }

  static getTransactionDetail(req,res) {
    const {id} = req.params
    
    Transaction.findByPk(id, {include: {all: true, nested: true}} )
    .then(data => {
      res.render('transactionDetail', {data})

    })
    .catch(error => {
      res.send(error)
    })
  }



  // static sendInvoice (req,res) {
  //   const { 
  //     user: {
  //       id: UserId,
  //       name,
  //       email
  //     }
  //   } = req.session
  //   console.log("MASUK TRANSACITON  SEND INVOCIE");
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     secure: false,
  //     auth: {
  //       user: "phase1ecommerce@gmail.com",
  //       pass: "Phase123@ecommerce"
  //     },
  //     sendMail:true
  //   })

  //   transporter.sendMail({
  //     from: "'Shopping Mania' phase1ecommerce@gmail.com",
  //     to: "mwitaryo@gmail.com",
  //     subject: "Invoice",
  //     text: "DAfatar bbelaanjarfasfasfsa",
  //     html: '<h1> THANK YOUUUU </h1>'
  //   })
  //   .then(info => {
  //     console.log("Message sent: %s", info.messageId);
  //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //     console.log("masuk thennnnnnn>>>>>>>>>>>>>>>>>>>>>>><<<<<<<");
  //     res.send(nodemailer.getTestMessageUrl(info))
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }
  }

