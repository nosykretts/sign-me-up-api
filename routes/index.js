const router = require('express').Router()

router.get('/', function(req, res, next) {
  res.status(200).json({
    message : 'This is API index route',
    data : 'OK'
  })
})

router.use('/users', require('./user'))
router.use('/events', require('./event'))
router.use('/guests', require('./guest'))


module.exports = router
