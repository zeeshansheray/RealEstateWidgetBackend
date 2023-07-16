const { ResponseStatus, UserTypes }                                              = require("../../_enums/enums")
const { tablesVld }                                                              = require("../../_validations")
const { CreateService, GetTablesService, UpdateTableService, ResetTableService } = require('./services')
const Responses                                                                  = require('./responses')
const { getUniqueId }                                                            = require("../../_utils/utils")
const { generatePassHash }                                                       = require("../../_utils/guard")
const { ValidationHandler }                                                      = require('../../_utils/handler')
const axios                                                                       = require('axios')

const CreateCrtl = async (req, res) => {

    const {invalid, value} = ValidationHandler(tablesVld.Create, req.body, res)

    if(invalid) return invalid()

    const table = {
        uuid    : getUniqueId(16),
        name    : value.name,
    }

    const result = await CreateService(table)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const GetTables = async (req, res) => {
    const result = await GetTablesService()

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const UpdateTables = async (req, res) => {
    const { invalid, value } = ValidationHandler(tablesVld.Update, req.body, res)

    if(invalid) {
        console.log('invalid ', invalid)
        return invalid()
    }

    let socket = req.app.get('socketio'); 

    console.log('socket ', socket)

    const result = await UpdateTableService(value, socket)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const ResetTable = async (req, res) => {
    console.log('jave')

    const { invalid, value } = ValidationHandler(tablesVld.Update, req.body, res)


    if(invalid) return invalid()
    let socket = req.app.get('socketio'); 

    value.reset = true;

    const result = await UpdateTableService(value, socket)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const Notification = async (req, res) => {
    try {
        const notification = {
          app_id: '824fc6cd-5af1-4bea-b459-3e4930da8556',
          contents: {
            en: `${req.body.tableNo + 1} SCADUTO !`, // Change the message to your desired content
          },
          included_segments: ['All'],
          ttl: 60, // Add the 'ttl' property with the desired time-to-live value in seconds
        };
    
        // Send the notification using the OneSignal API
        const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic OGMwYTZhZTItNTQ4NS00MDU5LTk1NTAtODYwZGM0ZDA1MDJl`,
          },
        });

        console.log('response ', response)
    
        // Handle the response
        if (response.status === 200) {
          res.status(200).json({ message: 'Notification sent successfully.' });
        } else {
          res.status(500).json({ error: 'Failed to send notification.' });
        }
      } catch (error) {
        console.log('error ', error)
        res.status(500).json({ error: 'An error occurred while sending the notification.' });
      }
}
module.exports = {
    CreateCrtl,
    GetTables,
    UpdateTables,
    ResetTable,
    Notification
}