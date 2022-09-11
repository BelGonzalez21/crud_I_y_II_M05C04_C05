const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/products')); //doble puntos porque public está afuera de src
    },
    filename : function (req, file, cb) {
        cb(null, `${Date.now()}_image_${path.extname(file.originalname)}`)
    }
})

const uploadImage = multer({ storage: storage})
module.exports = uploadImage