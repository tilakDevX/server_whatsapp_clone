const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    iss:{type: String},
    azp:{type: String},
    aud:{type: String},
    sub:{type: String, required:true},
    email:{type: String, required:true},
    email_verified:{type: Boolean, required:true},
    nbf:{type: Number},
    name:{type: String, required:true},
    picture:{type: String, required:true},
    given_name:{type: String, required:true},
    family_name:{type: String, required:true},
    locale:{type: String },
    iat:{type: Number },
    exp:{type: Number },
    jti:{type: String },
})



const UserModel = mongoose.model("user", userSchema)

module.exports= {UserModel}