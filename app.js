require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session');
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers')

const app = express()

// Connect to DB
connectDB()


// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  // cookie: { maxAge: new Date(Date.now() + (3600000)) }
}))

// template Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.locals.isActiveRoute = isActiveRoute

// router
app.use('/', require('./server/routes/main'))
app.use('/admin', require('./server/routes/admin'))

// listen
const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}`)
})