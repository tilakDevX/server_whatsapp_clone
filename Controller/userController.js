const { UserModel } = require("../Models/user.model");

const userController = async (req, res) => {
  try {
    const exist = await UserModel.findOne({ sub: req.body.sub });

    if (exist) {
      return res.status(200).json({ message: "user already exist" });
    }

    const new_user = new UserModel(req.body);
    const user = await new_user.save();

    return res.status(200).json({ message: "Successfully login", user });
  } catch (error) {
    console.log("Error: while saving data into db");
    console.log(error);
  }
};

const getUser = async (request, response) => {
  try {
    const user = await UserModel.find();
    console.log(user);
    response.send(user);
  } catch (error) {
    console.log('error while getting data from user');
    console.log(error);
    response.send(error);
  }
};

module.exports = { userController , getUser};
