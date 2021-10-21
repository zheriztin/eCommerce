const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const router = require('./routes')

const oneDay = 1000 * 60 * 60 * 24
app.use(
  session({
    secret: 'session-coder',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay}
  })
)


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)

app.listen(port, (req, res) => {
  console.log(`App running on port: ${port}`)
})
