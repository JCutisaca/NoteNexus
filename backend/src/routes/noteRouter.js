const { Router } = require('express');
const { postNoteHandler, getAllNotesByUserIdHandler, updateNoteHandler, getNoteByIdHandler, deleteNoteHandler } = require('../handlers/noteHandler/noteHandler');
const noteRouter = Router();

noteRouter.post("/create", postNoteHandler);

noteRouter.put("/update", updateNoteHandler);

noteRouter.delete("/delete/:userId/:id", deleteNoteHandler);

noteRouter.get("/user/:userId", getAllNotesByUserIdHandler);
noteRouter.get("/:userId/:id", getNoteByIdHandler);

module.exports = noteRouter;