const { User } = require('../../database');
const bcrypt = require('bcryptjs');

const postUser = async ({ name, surname, email, password, image }) => {
    const validateURL = /^(ftp|http|https):\/\//;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!name || !surname || !email || !password) throw Error("Missing required data: name, surname, email, password.");
    
    const newName = name.trim();
    const newSurname = surname.trim();
    const newEmail = email.trim().toLowerCase();
    const newPassword = password.trim();
    const newImage = image ? (validateURL.test(image.trim()) ? image.trim() : null) : null;

    if (!newName || !newSurname || !newEmail || !newPassword) throw Error("Missing required data: name, surname, email, password.");
    if (!regexEmail.test(newEmail)) throw Error("Invalid email address entered.");
    if(newPassword.length < 6 || newPassword.length > 14) throw Error("Password must be between 6 and 14 characters in length.")

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [user, created] = await User.findOrCreate({
        where: {
            name: newName,
            surname: newSurname,
            email: newEmail,
            password: hashedPassword,
            image: newImage
        }
    })

    if (!created) throw Error("User with the provided email already exists.")
    return ({ message: `User Created: ${user.name}` })
}

module.exports = postUser;