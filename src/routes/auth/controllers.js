const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const Responses                       = require('./responses')
const { ValidationHandler }          = require('../../_utils/handler')
const { GetDataService } = require("./services")

const GetData = async (req, res) => {
    const result = await GetDataService(req.query)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

module.exports = {
    GetData
}