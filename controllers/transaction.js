const { Transaction } = require('../models')

module.exports = class Controller {
  static listTransactions(req, res) {
    console.log("MASUK LIST TRANSACTION", req.session);
    const {user:{ id: UserId}, role} = req.session

    Transaction.findAll({ where: {UserId}, include: {all: true, nested: true} })
    .then(data => {
      // IF TRANSACTION ADA
      if(data) {
        console.log("masuk di IF TRANSACTION ADA");
        const bulkUpdateInput = data.map(transaction => {
          let total = 0
          transaction.Orders.forEach(order => {
            total += order.subTotal
          })
          return { total}
        })
        return Transaction.bulkUpdate(bulkUpdateInput, { where: {UserId}, returning: true})
      } else {
        console.log("ini di else transatcion FINDONE");
      }

    })
    .then(data => {
      //IF TRANSACTION ADA
      if(data) {
        console.log("MASUK DI IF TRANSACTION UPDATE");
        return Transaction.findAll({ where: {UserId}, include: {all: true, nested: true} })
      } else {
        console.log("ini di ELSE TRANSACTION UDPATE");
      }
    })
    .then(data => {
      console.log("masuk then terakhisr");
      res.render('transaction', {data,role})
    })
    .catch(error => {
      console.log(error);
      res.send(error)

    })
  }
}