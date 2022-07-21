const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    nickname: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    position: {
        type: String,
    },
    nationality: {
        type: String,
    },
    telephoneNumber: {
        type: String,
    },
    startingDate: {
        type: Date,
    },
    image: {
        name: {
            type: String,
        },
        destination: {
            type: String,
        },
        contentType: {
            type: String,
        }
    },
    coverImage: {
        name: {
            type: String,
        },
        destination: {

        },
        contentType: {
            type: String,
        },
    },
    address: {
        type: String,
    },
    subDistrict: {
        type: String,
    },
    district: {
        type: String,
    },
    province: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    facebook: {
        type: String,
    },
    lineId: {
        type: String,
    },
    instagram: {
        type: String,
    },
    education: [{
        year: String,
        university: String,
    }],
    experience: [{
        year: String,
        workplace: String,
    }],
    skill: [{
        language: String,
        level: Number
    }],
    interests: {
        type: Array, default: [],
    },
    guild: {
        type: Array, default: [],
    }
});

module.exports = mongoose.model('profile', profileSchema)