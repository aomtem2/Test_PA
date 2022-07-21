const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '.jpg'
        cb(null, file.fieldname + '_' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

router.post("/createUser", upload.fields(
    [{
        name: 'image', maxCount: 1
    }, {
        name: 'coverImage', maxCount: 1
    }]), profileController.createUser);
router.put("/editUserAndContact", upload.fields(
    [{
        name: 'image', maxCount: 1
    }, {
        name: 'coverImage', maxCount: 1
    }]), profileController.editUserAndContact);
router.post("/addEducationInfo", profileController.addEducationInfo)
router.post("/addExperienceInfo", profileController.addExperienceInfo)
router.post("/addSkillInfo", profileController.addSkillInfo)
router.post("/addInterestsInfo", profileController.addInterestsInfo)
router.post("/addGuildInfo", profileController.addGuildInfo)
router.delete("/deleteInterestsInfo", profileController.deleteInterestsInfo)
router.delete("/deleteGuildInfo", profileController.deleteGuildInfo)
router.get("/getProfile", profileController.getProfile)

module.exports = router;
