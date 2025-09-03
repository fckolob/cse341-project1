const mongodb = require('../data/database');
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

const getContactById = async (req, res) => {
    const db = mongodb.getDb();
    const contactId = req.params.id;
    try {
        const contact = await db.collection('contacts').findOne({ _id: ObjectId(contactId) });
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

module.exports = {
    getAllContacts,
    getContactById
};
