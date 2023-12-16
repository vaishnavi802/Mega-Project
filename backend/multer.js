const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }  
});
const upload = multer({ storage: storage });

// create async function to delete file
const deletefile = async (filename) => {
    fs.unlink(`uploads/${filename}`, (err) => {
        if (err) {
            console.error(err)
            return
        }
    }
    )
}

module.exports = {
    upload,
    deletefile
}