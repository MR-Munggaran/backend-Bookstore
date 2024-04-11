const express = require('express')
const route = express.Router()
const Progres = require('../Controllers/Books/index')
const MiddleAuth = require('../middlewares/auth')

route.use(MiddleAuth)

route.get('/', Progres.allData)

route.get('/:id', Progres.detailData)

route.post('/', Progres.createData)

route.put('/:id', Progres.updateData)

route.delete('/:id', Progres.deleteData)


module.exports = route