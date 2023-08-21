const Post = require('../model/Post')
const Category = require('../model/Category')
/**
 * Home 
 */
module.exports.home = async (req, res) => {
  try {

    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const data = await Post.aggregate([{ $sort: { createdAt: -1 }, }])
      .limit(6)
      .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
      .unwind('$category')
      .exec()


    res.render('index', {
      locals,
      data,
      currentRoute: '/',
    })

  } catch (error) {
    console.log(error)
  }
}

/**
 * about 
 */
module.exports.about = (req, res) => {
  const locals = {
    title: "About Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDb."
  }
  res.render('about', {
    locals,
    currentRoute: '/about',
  })
}

/**
 * Posts 
 */
module.exports.posts = async (req, res) => {
  try {

    const locals = {
      title: "Blog Posts",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }


    const data = await Post.aggregate([{ $sort: { createdAt: -1 }, }])
      .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
      .unwind('$category')
      .exec()


    res.render('posts', {
      locals,
      data,
      currentRoute: '/posts',
    })

  } catch (error) {
    console.log(error)
  }
}


/**
 * Post : id 
 */
module.exports.postById = async (req, res) => {
  try {

    let slug = req.params.id

    const data = await Post.findById({ _id: slug })

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render('post', {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    })

  } catch (error) {
    console.log(error)
  }
}



/**
 * Post : searchTerm 
 */
module.exports.searchTerm = async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ]
    })

    res.render('search', {
      locals,
      data,
      currentRoute: '/search'
    })

  } catch (error) {
    console.log(error)
  }
}

/**
 * category : id 
 */
module.exports.categoryById = async (req, res) => {
  try {
    const locals = {
      title: "Category",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const category = await Category.findOne({ _id: req.params.id })

    const posts = await Post.aggregate([{ $sort: { createdAt: -1 }, }])
      .match({ $expr: { $eq: ['$category', { $toObjectId: req.params.id }] } })
      .exec()

    res.render('category', {
      locals,
      posts,
      category,
      currentRoute: '/category',
    })

  } catch (error) {
    console.log(error)
  }
}
