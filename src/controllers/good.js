const models = require('../sequelize')
const errorHandler = require('../utils/errorHandler')
const Sequelize = require('sequelize')

const { Op } = Sequelize

async function get(request, response) {
    await models.Good.findByPk(request.params.id)
        .then(good => {
            response.json(good)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function getAll(request, response) {
    let q = request.query,
        search = q.search || '',
        query

    if (!isNaN(+q.search)) {
        query = {
            [Op.or]: [
                {
                    [Op.or]: [ { title: { [Op.like]: `${search}%` } }, null ]
                },
                {
                    [Op.or]: [ { brand: { [Op.like]: `${search}%` } }, null ]
                },
                {
                    [Op.or]: [ { model: { [Op.like]: `${search}%` } }, null ]
                },
                {
                    [Op.or]: [ { price: { [Op.eq]: +search } }, null ]
                },
            ]
        }
    } else {
        query = {
            [Op.or]: [
                {
                    [Op.or]: [ { title: { [Op.like]: `${search}%` } }, null ]
                },
                {
                    [Op.or]: [ { brand: { [Op.like]: `${search}%` } }, null ]
                },
                {
                    [Op.or]: [ { model: { [Op.like]: `${search}%` } }, null ]
                },
            ]
        }
    }

    await models.Good.findAll({
        where: {
            CatalogId: q.id,
            ...query,
        }
    })
        .then(goods => {
            response.json(goods)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function availableTitle(request, response) {
    await models.Good.findOne({
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
    await models.Good.create(request.body)
        .then(value => {
            response.json(value)
        })
        .catch(reason => {
            errorHandler(response, reason)
        })
}

async function update(request, response) {
    await models.Good.update(request.body, {
        where: {
            id: request.params.id
        },
        fields: [
            'title', 'brand', 'model', 'price', 'description'
        ]
    })
        .then(() => {
            models.Good.findByPk(request.params.id)
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
    await models.Good.destroy({
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
