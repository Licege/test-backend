const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Catalog extends Model {
        static associate(models) {
            Catalog.hasMany(models.Good, {
                as: 'goods',
                onDelete: 'CASCADE',
            })
        }
    }

    Catalog.init({
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
            }
        },
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Catalog',
        timestamps: false,
    })

    return Catalog
}
