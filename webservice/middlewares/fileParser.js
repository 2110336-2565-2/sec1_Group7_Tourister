const multer = require('multer')

const upload = multer()

const singleImageFileUpload = upload.single("image")
const multipleImageFileUpload = upload.array("images")

module.exports = {
    singleImageFileUpload,
    multipleImageFileUpload,
}