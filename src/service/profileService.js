const profileSchema = require('../model/profileSchema')
const fs = require('fs');

const addUser = async (user) => {
    const userObj = await new profileSchema(user);
    const result = await findUserByUserName(userObj.username)
    if (result.length == 0) {
        await userObj.save()
        return true
    }
    else {
        if (user.image) {
            fs.unlinkSync(user.image.destination)
        }
        if (user.coverImage) {
            fs.unlinkSync(user.coverImage.destination)
        }
        return { 'message': 'username is already used' }
    }
}

const findUserByUserName = async (username) => {
    const result = await profileSchema.find({ 'username': username })
    return result
}

const updateProfileAndContact = async (profile) => {
    const result = await profileSchema.findById(profile.id)
    if (result) {
        await profileSchema.findByIdAndUpdate(profile.id, profile)
        if (profile.image) {
            fs.unlinkSync(result.image.destination)
        }
        if (profile.coverImage) {
            fs.unlinkSync(result.coverImage.destination)
        }
        return true
    }
}

const insertEducationInfo = async (info) => {
    //console.log(info)
    await profileSchema.findOneAndUpdate(info.id, {
        $push: {
            education: info.education
        }
    }, { upsert: true })
    return true
}

const insertExperienceInfo = async (info) => {
    //console.log(info)
    await profileSchema.findOneAndUpdate(info.id, {
        $push: {
            experience: info.experience
        }
    }, { upsert: true })
    return true
}

const insertSkillInfo = async (info) => {
    //console.log(info)
    await profileSchema.findOneAndUpdate(info.id, {
        $push: {
            skill: info.skill
        }
    }, { upsert: true })
    return true
}

const getProfileById = async (id) => {
    const response = await profileSchema.findById(id)
    return response

}

const insertGuildInfo = async (info) => {
    const response = await profileSchema.findById(info.id)
    //console.log(response.guild)
    if (response.guild.includes(info.guild)) {
        return { 'message': info.guild + ' is already add' }
    }
    await profileSchema.findOneAndUpdate(info.id, {
        $push: {
            guild: info.guild
        }
    }, { upsert: true })
    return true
}


const removeGuildInfo = async (info) => {
    const response = await profileSchema.findById(info.id)
    //console.log(response.guild)
    if (response.guild.includes(info.guild)) {
        await profileSchema.findOneAndUpdate(info.id, {
            $pull: {
                guild: info.guild
            }
        }, { upsert: true })
    }
    return true
}

const removeInterestsInfo = async (info) => {
    const response = await profileSchema.findById(info.id)
    //console.log(response.interests)
    if (response.interests.includes(info.interests)) {
        await profileSchema.findOneAndUpdate(info.id, {
            $pull: {
                interests: info.interests
            }
        }, { upsert: true })
    }
    return true
}

const insertInterestsInfo = async (info) => {
    const response = await profileSchema.findById(info.id)
    //console.log(response.interests)
    if (response.interests.includes(info.interests)) {
        return { 'message': info.interests + ' is already add' }
    }
    await profileSchema.findOneAndUpdate(info.id, {
        $push: {
            interests: info.interests
        }
    }, { upsert: true })
    return true
}



module.exports = {
    addUser,
    updateProfileAndContact,
    findUserByUserName,
    insertEducationInfo,
    getProfileById,
    insertInterestsInfo,
    insertGuildInfo,
    removeGuildInfo,
    removeInterestsInfo,
    insertExperienceInfo,
    insertSkillInfo
}