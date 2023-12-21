const { Note } = require('../../database');

const getAllNotesByUserId = async ({ userId }) => {
    if (!userId) throw Error("User ID is required.");
    const notes = await Note.findAll({ where: { UserId: userId } })
    return notes;
}

module.exports = getAllNotesByUserId;