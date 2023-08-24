const mongoose = require('mongoose');
const Grid = require('gridfs-stream');



let gfs, gridFsBucket;

const conn = mongoose.connection;

conn.once('open', ()=>{

    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName:"fs"
    })
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})


const url = "http://localhost:8500"

const uploadFile = async(req, res)=>{

    if(!req.file){
        return res.status(404).json("File Not Found")
    }

    const imageUrl = `${url}/user/file/${req.file.filename}`
    return res.status(200).json(imageUrl)
}

const getImage=async(req, res)=>{

    try {
        const file = await gfs.files.findOne({filename: req.params.filename})

        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);


    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {uploadFile,getImage}