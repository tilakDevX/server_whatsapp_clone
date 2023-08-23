const {Router} = require("express");
const { userController, getUser } = require("../Controller/userController");
const { newConversation } = require("../Controller/conversation-controller");

const userRouter = Router();

userRouter.get('/' , getUser);
userRouter.post("/signup", userController );
userRouter.post("/conversation/add",  newConversation);


module.exports  ={userRouter}