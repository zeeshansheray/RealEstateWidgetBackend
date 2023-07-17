const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const { GetDataService } = require("./services")

const GetData = async (req, res) => {
    console.log('zee2')

    const result = await GetDataService(req.query)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

module.exports = {
    GetData
}