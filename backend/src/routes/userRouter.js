const { Router } = require('express');
const { postUserHandler, userLoginHandler } = require('../handlers/userHandler/userHandler');
const userRouter = Router();

userRouter.post("/login", userLoginHandler)
userRouter.post("/create", postUserHandler)

module.exports = userRouter;