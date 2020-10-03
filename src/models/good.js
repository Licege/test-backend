const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Good extends Model {
        static associate(models) {
            Good.belongsTo(models.Catalog)
        }
    }

    Good.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id',
        },
        catalog_id: DataTypes.INTEGER,
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        cost: DataTypes.INTEGER,
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Good',
        timestamps: false,
    })

    return Good
}
