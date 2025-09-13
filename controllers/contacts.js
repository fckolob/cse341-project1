const mongodb = require('../routes/data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  const db = mongodb.getDb();
  try {
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const getSingleContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb();
    const contact = await db.collection('contacts').findOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().collection('contacts').insertOne(contact);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while creating the contact');
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the contact');
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().collection('contacts').deleteOne({ _id: contactId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while deleting the contact');
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
