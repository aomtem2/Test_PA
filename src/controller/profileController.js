
const bcrypt = require("bcrypt");
const {
    addUser,
    updateProfileAndContact,
    insertEducationInfo,
    getProfileById,
    insertInterestsInfo,
    insertGuildInfo,
    removeGuildInfo,
    removeInterestsInfo,
    insertExperienceInfo,
    insertSkillInfo
} = require("../service/profileService");
const path = require('path');

const createUser = async (req, res) => {
    try {
        const user = await req.body
        user.startingDate = new Date(user.startingDate);
        const imageName = req.files.image[0].filename
        const imageType = req.files.image[0].mimetype
        const imageDesc = path.join(__dirname + '../../../upload/' + imageName)
        user.image = { 'name': imageName, 'destination': imageDesc, 'contentType': imageType }
        const coverImageName = req.files.coverImage[0].filename
        const coverImageType = req.files.coverImage[0].mimetype
        const coverImageDesc = path.join(__dirname + '../../../upload/' + coverImageName)
        user.coverImage = { 'name': coverImageName, 'destination': coverImageDesc, 'contentType': coverImageType }
        const result = await addUser(user)
        if (result == true)
            res.status(201).json({ message: 'create user succeeded', status: 201 })
        else
            res.status(200).json({ message: result, status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const editUserAndContact = async (req, res) => {
    try {
        const user = await req.body
        if (req.files) {
            if (req.files.image) {
                const imageName = req.files.image[0].filename
                const imageType = req.files.image[0].mimetype
                const imageDesc = path.join(__dirname + '../../../upload/' + imageName)
                user.image = { 'name': imageName, 'destination': imageDesc, 'contentType': imageType }
            }
            if (req.files.coverImage) {
                const coverImageName = req.files.coverImage[0].filename
                const coverImageType = req.files.coverImage[0].mimetype
                const coverImageDesc = path.join(__dirname + '../../../upload/' + coverImageName)
                user.coverImage = { 'name': coverImageName, 'destination': coverImageDesc, 'contentType': coverImageType }
            }
        }
        const response = await updateProfileAndContact(user)
        if (response == true)
            res.status(200).json({ message: 'edit user succeeded', status: 200 })

    }
    catch {
        res.sendStatus(400)
    }
}

const addEducationInfo = async (req, res) => {
    try {
        const educationInfo = await req.body
        educationInfo.education = { year: educationInfo.education[0], university: educationInfo.education[1] }
        const response = await insertEducationInfo(educationInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const addExperienceInfo = async (req, res) => {
    try {
        const experienceInfo = await req.body
        experienceInfo.experience = { year: experienceInfo.experience[0], workplace: experienceInfo.experience[1] }
        const response = await insertExperienceInfo(experienceInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const addSkillInfo = async (req, res) => {
    try {
        const skillInfo = await req.body
        //console.log(skillInfo)
        skillInfo.skill = { language: skillInfo.skill[0], level: skillInfo.skill[1] }
        const response = await insertSkillInfo(skillInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const addInterestsInfo = async (req, res) => {
    try {
        const interestsInfo = await req.body
        //console.log(interestsInfo)
        const response = await insertInterestsInfo(interestsInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
        else
            res.status(200).json({ response, status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const addGuildInfo = async (req, res) => {
    try {
        const guildInfo = await req.body
        //console.log(guildInfo)
        const response = await insertGuildInfo(guildInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
        else
            res.status(200).json({ response, status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const deleteInterestsInfo = async (req, res) => {
    try {
        const interestsInfo = await req.body
        //console.log(interestsInfo)
        const response = await removeInterestsInfo(interestsInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
        else
            res.status(200).json({ response, status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const deleteGuildInfo = async (req, res) => {
    try {
        const guildInfo = await req.body
        //console.log(guildInfo)
        const response = await removeGuildInfo(guildInfo)
        if (response == true)
            res.status(200).json({ message: 'success', status: 200 })
        else
            res.status(200).json({ response, status: 200 })
    }
    catch {
        res.sendStatus(400)
    }
}

const getProfile = async (req, res) => {
    try {
        const { id } = await req.body
        //console.log(id)
        const response = await getProfileById(id)
        if (response)
            res.status(200).json(response)
    }
    catch {
        res.sendStatus(400)
    }
}


module.exports = {
    createUser,
    editUserAndContact,
    addEducationInfo,
    getProfile,
    addInterestsInfo,
    addGuildInfo,
    deleteGuildInfo,
    deleteInterestsInfo,
    addExperienceInfo,
    addSkillInfo
}