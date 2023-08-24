const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config()

const storage = new GridFsStorage({
    url:process.env.MONGO_URL,
    options:{useUnifiedTopology:true, useNewUrlParser: true},
    file: (request, file)=>{
        const match = ["image/png", "image/jpg","image/jpeg"];

        if(match.indexOf(file.mimeType)=== -1){
            return `${Date.now()}-file-${file.originalname}`
        }

        return{
            bucketName:"photos",
            filename:   `${Date.now()}-file-${file.originalname}`
        }
    }
})
const upload = multer({ storage }); 

module.exports = { upload };