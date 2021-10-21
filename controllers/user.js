const { compareHash } = require('../helpers/bcrypt')
const { User } = require('../models')

module.exports = class Controller {

  static getUserProfile(req, res) {
    const { user: { id: UserId } } = req.session
    User.findByPk(UserId)
    .then( data => {
      res.json(data)
      // res.redirect('userProfile', {data})
    })
    .catch( error => {
      console.log(error)
      res.send(error)
    })

  }

  static register(req,res) {
    res.redirect('/register')
  }

  static postRegister(req, res) {
    const {role, name, phone, email, password, address} = req.body
    const input = {role, name, phone, email, password, address}
    User.create(input)
    .then(data => {
      // redirect ke halaman user setelah login
      console.log(data,">>>");
      res.json(data)
      // res.render('user',{data})
    })
    .catch(error => {
      console.log(error,"<<< error");
      res.json(error)
      // res.send(error)
    })
  }

  static login(req,res) {
    console.log("masuk login");
    res.render('login')
  }

  static postLogin(req,res) {
    const {email, password} = req.body
    User.findOne({ where: {email}})
    .then(data => {
      if (data) {
        const matchedPassword  = compareHash(password, data.password)
        if (matchedPassword) {
          req.session.user = data,
          req.session.role = data.role,
          req.session.isLogin = true,
          console.log(req.session,".>>> sessis");
          // res.json({message: "Logged IN"})
          res.redirect('/products')
        } else {
          // password atau email salah 
          res.send("Wrong Email or Password")
        }
      } else {
        res.send("User not Found")
      }
    })
    .catch(error => {
      res.send(error)
    })
  }
  
  static logout(req, res) {
    console.log("masuk logout");
    req.session.destroy()
    // redirect to landing page
    res.redirect('/login')
  }

}
