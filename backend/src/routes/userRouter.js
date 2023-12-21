const { Router } = require('express');
const { postUserHandler, userLoginHandler } = require('../handlers/userHandler/userHandler');
const userRouter = Router();

userRouter.get("/login", userLoginHandler)

userRouter.post("/create", postUserHandler)

module.exports = userRouter;