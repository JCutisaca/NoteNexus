const { Note } = require('../../database');

const getNoteById = async ({ userId, id }) => {
    if (!userId || !id) throw Error("userId and id are required.");

    const findNote = await Note.findOne({ where: { id } });

    if (!findNote) throw Error("Note not found.");
    if (findNote.UserId !== userId) throw Error("Unauthorized access.");

    return findNote;
}

module.exports = getNoteById;