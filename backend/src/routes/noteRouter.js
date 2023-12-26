const { Router } = require('express');
const { postNoteHandler, getAllNotesByUserIdHandler, updateNoteHandler, getNoteByIdHandler, deleteNoteHandler } = require('../handlers/noteHandler/noteHandler');
const verifyTokenParams = require('../middlewares/verifyTokenParams');
const verifyToken = require('../middlewares/veryfyTokenjs');
const noteRouter = Router();

noteRouter.post("/create", verifyToken, postNoteHandler);

noteRouter.put("/update", verifyToken, updateNoteHandler);

noteRouter.delete("/delete/:userId/:id", verifyTokenParams, deleteNoteHandler);

noteRouter.get("/user/:userId", verifyTokenParams, getAllNotesByUserIdHandler);
noteRouter.get("/:userId/:id", verifyTokenParams, getNoteByIdHandler);

module.exports = noteRouter;