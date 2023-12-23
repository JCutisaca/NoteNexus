const { Note } = require('../../database');

const getAllNotesByUserId = async ({ userId }) => {
    if (!userId) throw Error("User ID is required.");
    const notes = await Note.findAll({ where: { UserId: userId } })
    const activeNotes = notes.filter(note => !note.archived);
    const archivedNotes = notes.filter(note => note.archived);

    return { activeNotes, archivedNotes };
}

module.exports = getAllNotesByUserId;