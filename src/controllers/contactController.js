const Contact = require('../models/contactModel');

// Utility function to validate email format
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Utility function to validate phone number format
const isValidPhone = (phone) => /^\d{10}$/.test(phone);

// Get all contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single contact by `contact_id`
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findOne({ contact_id: req.params.id });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, Email, and Phone are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format. Email must contain @ and .' });
        }

        // Validate phone number format (exactly 10 digits)
        if (!isValidPhone(phone)) {
            return res.status(400).json({ message: 'Invalid phone number. Must be exactly 10 digits.' });
        }

        // Check if email or phone already exists
        const existingContact = await Contact.findOne({ $or: [{ email }, { phone }] });
        if (existingContact) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        // Create a new contact (contact_id auto-increments in model)
        const newContact = new Contact({ name, email, phone, address });
        await newContact.save();

        res.status(201).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a contact by `contact_id`
exports.updateContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const contactId = req.params.id;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, Email, and Phone are required' });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format. Email must contain @ and .' });
        }

        // Validate phone number format (exactly 10 digits)
        if (!isValidPhone(phone)) {
            return res.status(400).json({ message: 'Invalid phone number. Must be exactly 10 digits.' });
        }

        // Check if email or phone exists in another record
        const existingContact = await Contact.findOne({
            $or: [{ email }, { phone }],
            contact_id: { $ne: contactId }, // Exclude the current contact being updated
        });

        if (existingContact) {
            return res.status(400).json({ message: 'Email or phone number already exists' });
        }

        // Update contact
        const contact = await Contact.findOneAndUpdate(
            { contact_id: contactId },
            { name, email, phone, address },
            { new: true, runValidators: true }
        );

        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a contact by `contact_id`
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ contact_id: req.params.id });

        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
