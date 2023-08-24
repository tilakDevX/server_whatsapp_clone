const {Router} = require("express");

//imports
const { userController, getUser } = require("../Controller/userController");
const { newConversation,getConversation } = require("../Controller/conversation-controller");
const { newMessage, getMessage } = require("../Controller/message-controller");
const { uploadFile, getImage } = require("../Controller/image-controller");
const { upload } = require("../utils/upload");

const userRouter = Router();

userRouter.get('/' , getUser);
userRouter.post("/signup", userController );
userRouter.post("/conversation/add",  newConversation);
userRouter.post("/conversation/get",  getConversation);
userRouter.post("/conversation/message/add",  newMessage);


userRouter.get("/message/get/:id",  getMessage);
userRouter.post("/file/upload", upload.single("file"),  uploadFile);
userRouter.get("/file/:filename", getImage)

module.exports  ={userRouter}