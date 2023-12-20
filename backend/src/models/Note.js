const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Note', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING(50),
            allownull: false,
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allownull: true,
        },
        content: {
            type: DataTypes.STRING,
            allownull: true,
        }
    }, {
        timestamps: true
    })
}