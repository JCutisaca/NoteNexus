const postUser = require("../../controllers/userController/postUser");
const userLogin = require("../../controllers/userController/userLogin");


const postUserHandler = async (req, res) => {
    try {
        const response = await postUser(req.body);
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const userLoginHandler = async(req, res) => {
    try {
        const response = await userLogin(req.body);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    postUserHandler,
    userLoginHandler
}