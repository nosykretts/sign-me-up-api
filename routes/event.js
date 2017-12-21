const express = require('express')
const router = express.Router();
const Image = require('../helper/imageHelper')
const Event = require('../controllers/event')

router.get('/', Event.getEvents)
router.post('/add', Image.multer.single('imageFile'), Image.sendUploadToGCS, Event.createEvent)
router.get('/:id', Event.getEvent)
router.put('/edit/:id', Image.multer.single('imageFile'), Image.sendUploadToGCS, Event.updateEvent)
router.delete('/:id', Event.deleteEvent)

module.exports = router
