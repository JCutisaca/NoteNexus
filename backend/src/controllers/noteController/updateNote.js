const { where } = require('sequelize');
const { Note } = require('../../database');
const getNoteById = require('./getNoteById');

const updateNote = async ({ userId, id, title, tags, content, archived }) => {
    if (!userId || !id) throw Error("userId and id are required.");
    if (!title && !tags && !content && archived === undefined) throw Error("At least one of the following is required: title, tags, content, archived.");

    const findNote = await getNoteById({ userId, id });

    const updatedArchive = archived !== undefined ? archived : findNote.archived;

    const updateFields = await Note.update({
        title: title ? title : findNote.title,
        tags: tags ? tags : findNote.tags,
        content: content ? content : findNote.content,
        archived: updatedArchive
    }, { where: { id } })

    await findNote.update(updateFields);
    
    return {message: "Note updated successfully."}
}

module.exports = updateNote;