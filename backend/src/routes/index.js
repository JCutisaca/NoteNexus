const { Router } = require('express');
const router = Router();

router.use("/user", userRouter)

module.exports = router;