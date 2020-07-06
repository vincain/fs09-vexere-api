const multer = require("multer")

module.exports.uploadImages = (type) => {
    const storage = multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, `./uploads/${type}s`)
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })

    const upload = multer({storage: storage})
    return upload.single(type)
}
