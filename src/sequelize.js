const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { development } = require('./config/config')
const db = {}

let sequelize;
let dsn = `postgres://${development.username}:${development.password}@${development.host}:5432/${development.database}`
sequelize = new Sequelize(dsn)

const modelPath = __dirname + '/models'

fs
    .readdirSync(modelPath)
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(modelPath, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

sequelize.sync({
    alter: true,
    logging: console.log
}).then(() => console.log('Sync'))

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
