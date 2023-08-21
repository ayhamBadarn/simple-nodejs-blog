const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User')

const adminLayout = '../views/layouts/admin.ejs'
const jwtSecret = process.env.JWT_SECRET

/**
 * Admin - login page 
 */
module.exports.loginPage = async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('admin/index', {
      locals,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error)
  }
}


/**
 * Admin - login action 
 */
module.exports.loginAction = async (req, res) => {
  try {

    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' })

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, jwtSecret)
    res.cookie('token', token, { httpOnly: true })

    res.redirect('admin/dashboard')

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - register action
 */

module.exports.registerAction = async (req, res) => {
  try {

    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {

      const user = await User.create({ username, password: hashedPassword })
      res.status(201).json({ message: 'user Created', user })

    } catch (error) {
      if (error.code === 11000)
        res.status(409).json({ message: 'User already in use' })

      res.status(500).json({ message: 'Internal server error' })
    }

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - Logout
 */

module.exports.logout = async (req, res) => {
  res.clearCookie('token')
  res.redirect('/')
}