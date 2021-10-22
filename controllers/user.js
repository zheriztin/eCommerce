const { compareHash } = require('../helpers/bcrypt')
const { User } = require('../models')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: "phase1ecommerce@gmail.com",
    pass: "Phase123@ecommerce"
  },
  sendMail:true
})

module.exports = class Controller {

  static getUserProfile(req, res) {
    const { user: { id: UserId } } = req.session
    User.findByPk(UserId)
    .then( data => {
      // res.redirect('userProfile', {data})
    })
    .catch( error => {
      res.send(error)
    })

  }

  static register(req,res) {
    console.log(req.query.errors)
    const {errors} = req.query 
    const newError = errors? errors.split(',') : null
    res.render('register',{errors: newError})
  }

  static postRegister(req, res) {
    const {role, name, phone, email, password, address} = req.body
    const input = {role, name, phone, email, password, address}
    User.create(input)
    .then(data => {
      return transporter.sendMail({
        from: "'Shopping Mania' phase1ecommerce@gmail.com",
        to: data.email,
        subject: "Welcome",
        text: "Welcome to Shopping Mania",
        html: `<h1> Welcome to Shopping Mania </h1> 
        <a href="http://localhost:3000/login"> Click this link to shop at Shopping Mania</a>`
      })
    })
    .then(info => {
      res.redirect('/login')
    })
    .catch(error => {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map(el => {
          return el.message
        })
        console.log(errors)
        res.redirect (`/register?errors=${errors}`)
      } else {
        res.send(error)
      }
    })
  }


  static login(req,res) {
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
    req.session.destroy()
    res.redirect('/login')
  }

}
