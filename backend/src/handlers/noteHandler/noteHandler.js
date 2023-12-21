const deleteNote = require("../../controllers/noteController/deleteNote");
const getAllNotesByUserId = require("../../controllers/noteController/getAllNotesByUserId");
const getNoteById = require("../../controllers/noteController/getNoteById");
const postNote = require("../../controllers/noteController/postNote");
const updateNote = require("../../controllers/noteController/updateNote");


const postNoteHandler = async (req, res) => {
    try {
        const response = await postNote(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllNotesByUserIdHandler = async (req, res) => {
    try {
        const response = await getAllNotesByUserId(req.params);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateNoteHandler = async (req, res) => {
    try {
        const response = await updateNote(req.body);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getNoteByIdHandler = async (req, res) => {
    try {
        const response = await getNoteById(req.params);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteNoteHandler = async (req, res) => {
    try {
        const response = await deleteNote(req.params);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    postNoteHandler,
    getAllNotesByUserIdHandler,
    updateNoteHandler,
    getNoteByIdHandler,
    deleteNoteHandler
}