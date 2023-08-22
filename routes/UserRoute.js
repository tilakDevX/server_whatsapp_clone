const {Router} = require("express");
const { userController, getUser } = require("../Controller/userController");

const userRouter = Router();

userRouter.get('/' , getUser);
userRouter.post("/signup", userController );


module.exports  ={userRouter}