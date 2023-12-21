const { Note, User } = require('../../database');

const postNote = async ({ userId, title, tags, content }) => {
    if (!userId || !title || !content) throw Error("Missing data.");

    const findUser = await User.findOne({ where: { id: userId } });

    if (!findUser) throw Error("User not found.");

    const note = await Note.create({
        title,
        tags: tags ? tags : null,
        content,
        archived: false
    })

    if(!note) throw Error("Failed to create the note. Please try again.")

    await note.setUser(findUser);

    return "Note created successfully.";
}

module.exports = postNote;