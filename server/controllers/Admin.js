const Post = require('../model/Post')
const Category = require('../model/Category')
const adminLayout = '../views/layouts/admin.ejs'

/**
 * Admin - dashboard  
 */
module.exports.dashboard = async (req, res) => {
  try {

    const locals = {
      title: "Dashboard",
    }

    const data = await Post.find()

    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - add post  
 */
module.exports.addPost = async (req, res) => {
  try {

    const locals = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const category = await Category.find()

    res.render('admin/add-post', {
      locals,
      layout: adminLayout,
      category
    })

  } catch (error) {
    console.log(error)
  }
}


/**
 * Admin - save post  
 */
module.exports.savePost = async (req, res) => {
  try {


    try {
      await new Post({
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
      }).save()

      res.redirect('/admin/dashboard')
    } catch (error) { }


  } catch (error) {
    console.log(error)
  }
}



/**
 * GET /
 * Admin - Edit post  
 */
module.exports.editPost = async (req, res) => {
  try {

    const locals = {
      title: "Edit Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const post = await Post.findOne({ _id: req.params.id }).populate('category')
    const category = await Category.find()

    res.render('admin/edit-post', {
      post,
      locals,
      category,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error)
  }
}



/**
  * Admin - Update post  
 */
module.exports.updatePost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    })
    res.redirect(`/admin/edit-post/${req.params.id}`)

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - Delete post
 */

module.exports.deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id })
    res.redirect('/admin/dashboard')
  } catch (error) {
    console.log(error)
  }
}
