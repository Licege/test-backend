const models = require('../sequelize')
const errorHandler = require('../utils/errorHandler')
const Sequelize = require('sequelize')

async function get(request, response) {
    await models.Catalog.findByPk(request.params.id)
        .then(catalog => {
            response.json(catalog)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function getAll(request, response) {
    await models.Catalog.findAll({
        include: [
            {
                model: models.Good,
                attributes: [],
            }
        ],
        attributes: {
            include: [[Sequelize.fn('COUNT', Sequelize.col('Goods.id')), 'count']]
        },
        group: [Sequelize.col('Catalog.id')],
    })
        .then(catalogs => {
            response.json(catalogs)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function availableTitle(request, response) {
    await models.Catalog.findOne({
        where: { title: request.params.title.trim() }
    })
        .then(value => {
            response.json(!value)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function create(request, response) {
    const { title, description } = request.body
    await models.Catalog.create({
        title,
        description
    })
        .then(value => {
            response.json(value)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function update(request, response) {
    await models.Catalog.update(request.body, {
        where: {
            id: request.params.id
        },
        fields: [
            'title', 'description'
        ]
    })
        .then(() => {
            models.Catalog.findByPk(request.params.id)
                .then(value => {
                    response.json(value)
                })
                .catch(reason => {
                    errorHandler(response, reason)
                })
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function destroy(request, response) {
    await models.Catalog.destroy({
        where: {
            id: request.params.id
        }
    })
        .then(() => {
            response.status(204).send()
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

module.exports = {
    get,
    getAll,
    create,
    update,
    destroy,
    availableTitle,
}
