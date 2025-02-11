const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    contact_id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { type: String, required: true, unique: true, match: /^\d{10}$/ },
    address: { type: String }
}, { timestamps: true });

// Auto-increment contact_id
contactSchema.pre('save', async function (next) {
    if (!this.contact_id) {
        const lastContact = await mongoose.model('Contact').findOne().sort({ contact_id: -1 });
        this.contact_id = lastContact ? lastContact.contact_id + 1 : 1;
    }
    next();
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
