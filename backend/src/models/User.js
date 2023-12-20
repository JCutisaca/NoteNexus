const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allownull: false,
        },
        email: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allownull: false
        },
        image: {
            type: DataTypes.STRING,
            allownull: true,
            defaultValue: null
        }
    }, {
        timestamps: false
    })
}