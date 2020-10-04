const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Good extends Model {
        static associate(models) {
            Good.belongsTo(models.Catalog, { targetKey: 'id' })
        }
    }

    Good.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
            defaultValue: '',
        },
        brand: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        model: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
    }, {
        sequelize,
        modelName: 'Good',
        timestamps: false,
    })

    return Good
}
