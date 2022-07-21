const mongoose = require('mongoose');
const uri = "mongodb+srv://aomtem:YWCqQ9Tld3O7vqke@usermanagement.ddq0ov8.mongodb.net/?retryWrites=true&w=majority";

async function con() {
    await mongoose.connect(uri);
}

module.exports = con