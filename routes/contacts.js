const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);

module.exports = router;