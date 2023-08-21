const router = require('express').Router()
const { loginPage, loginAction, registerAction, logout } = require('../controllers/Auth')
const { addPost, dashboard, deletePost, editPost, savePost, updatePost } = require('../controllers/Admin')
const { categories, addCategory, saveCategory, editCategory, updateCategory, deleteCategory } = require('../controllers/Categories')
const { authMiddleware } = require('../middlewares/AuthMeddleware')

// Auth
router.route('/').get(loginPage).post(loginAction)
router.route('/register').post(registerAction)

router.use(authMiddleware)
// Auth logout 
router.route('/logout').get(logout)

// Admin - dashboard  
router.route('/dashboard').get(dashboard)
router.route('/add-post').get(addPost).post(savePost)
router.route('/edit-post/:id').get(editPost).put(updatePost)
router.route('/delete-post/:id').delete(deletePost)


// Admin - categories
router.route('/categories').get(categories)
router.route('/add-category').get(addCategory).post(saveCategory)
router.route('/edit-category/:id').get(editCategory).put(updateCategory)
router.route('/delete-category/:id').delete(deleteCategory)

module.exports = router