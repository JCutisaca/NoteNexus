const { Note } = require('../../database');
const getNoteById = require('./getNoteById');

const deleteNote = async ({ userId, id }) => {
    if (!userId || !id) throw Error("userId and id are required.");

    const findNote = await getNoteById({ userId, id });

    await Note.destroy({ where: { id } });

    return "Note deleted successfully.";
}

module.exports = deleteNote;