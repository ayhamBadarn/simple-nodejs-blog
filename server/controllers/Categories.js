const Category = require('../model/Category')
const adminLayout = '../views/layouts/admin.ejs'



/**
 * Admin - categories  
 */
module.exports.categories = async (req, res) => {
  try {

    const locals = {
      title: "Categories",
    }

    const data = await Category.find()

    res.render('admin/categories/index', {
      locals,
      layout: adminLayout,
      data
    })

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - add categories  
 */
module.exports.addCategory = async (req, res) => {
  try {

    const locals = {
      title: "Add Category",
    }


    res.render('admin/categories/add-category', {
      locals,
      layout: adminLayout
    })

  } catch (error) {
    console.log(error)
  }
}


/**
 * Admin - save categories  
 */
module.exports.saveCategory = async (req, res) => {
  try {

    await new Category({
      name: req.body.name
    }).save()

    res.redirect('categories')


  } catch (error) {
    console.log(error)
  }
}


/**
 * Admin - edit categories  
 */
module.exports.editCategory = async (req, res) => {
  try {

    const locals = {
      title: "Edit Category",
    }

    const category = await Category.findOne({ _id: req.params.id })

    res.render('admin/categories/edit-category', {
      locals,
      layout: adminLayout,
      category
    })

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - update categories  
 */
module.exports.updateCategory = async (req, res) => {
  try {

    await Category.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    })

    res.redirect(`/admin/edit-category/${req.params.id}`)

  } catch (error) {
    console.log(error)
  }
}

/**
 * Admin - delete deleteCategory   
 */
module.exports.deleteCategory = async (req, res) => {
  try {

    await Category.deleteOne({ _id: req.params.id })

    res.redirect('/admin/categories')

  } catch (error) {
    console.log(error)
  }
}
