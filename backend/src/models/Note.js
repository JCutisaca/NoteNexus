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
            validate: {
                isArrayOfStrings(value) {
                    if (value && !Array.isArray(value)) {
                        throw new Error('Tags must be an array');
                    }
                    if (value && value.some(item => typeof item !== 'string')) {
                        throw new Error('All elements in the tags array must be strings');
                    }
                }
            }
        },
        content: {
            type: DataTypes.TEXT,
            allownull: false,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allownull: false
        }
    }, {
        timestamps: true
    })
}