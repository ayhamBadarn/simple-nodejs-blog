const router = require('express').Router()
const { home, about, posts, postById, searchTerm, categoryById } = require('../controllers/Post')

router.get('/', home)

router.get('/about', about)

router.get('/posts', posts)
router.get('/post/:id', postById)

router.get('/category/:id', categoryById)

router.post('/search', searchTerm)

module.exports = router