const { User } = require('../../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const userLogin = async ({ email, password }) => {
    if (!email || !password) throw Error("Email and password are required fields.");

    const newEmail = email.trim().toLowerCase();
    const newPassword = password.trim();

    const findUser = await User.findOne({ where: { email: newEmail } });

    if(!findUser) throw Error("User not found.")

    const { id } = findUser.dataValues;
    const validatePass = await bcrypt.compare(newPassword, findUser.dataValues.password)

    if (!validatePass) throw Error("Invalid password. Please check your password and try again.")

    const token = jwt.sign({ id, email }, JWT_SECRET)

    return({idUser: id, token})
}

module.exports = userLogin;