// @flow

import 'babel-polyfill'
import { config, https, database } from 'firebase-functions'
import * as admin from 'firebase-admin'
import _cors from 'cors'

import promisify from 'es6-promisify'
import * as httpHandlers from './http-handlers'
import * as dbHandlers from './db-handlers'
import ServerSetup from './server-setup'
import SERVER_SETUP_STATUS from './const/server-setup-status'

admin.initializeApp(config().firebase)
const cors = promisify(_cors())

type Handler = (req: Object, res: Object, config: Object) => Promise<*>
type Method = 'get' | 'post' | 'put' | 'delete' | 'options'

const prepareHttpFunction = (
  method: Method,
  handler: Handler
): Function => async (req, res) => {
  await cors(req, res)
  console.log(
    `method: ${req.method}, url: ${req.originalUrl}, params: %j, body: %j`,
    req.params,
    req.body
  )
  if (req.method.toLowerCase() !== method) {
    res.status(400).send(`http method ${req.method} is not supported.`)
    return
  }
  handler(req, res, config())
}

// http triggers
export const hello = https.onRequest(
  prepareHttpFunction('get', (req, res) => res.send('ok'))
)
export const customers = https.onRequest(
  prepareHttpFunction('post', httpHandlers.createCustomer)
)
export const changeCard = https.onRequest(
  prepareHttpFunction('post', httpHandlers.changeCard)
)
export const webhooks = https.onRequest(
  prepareHttpFunction('post', httpHandlers.handle)
)

// db triggers
export const sendInquiryNotification = database
  .ref('/inquiries/{id}')
  .onWrite(async event =>
    dbHandlers.sendInquiryNotification(event, admin, config)
  )

export const requestServerSetup = database
  .ref('/users/{uid}/serverSetup/status')
  .onWrite(async (change, context) => {
    const status = change.after.val()
    if (status === SERVER_SETUP_STATUS.NOT_STARTED) {
      const uid = context.params.uid
      const retention = change.after.ref.parent.parent.child('retention')

      const parentRef = change.after.ref.parent
      let updates = {}
      try {
        await ServerSetup.requestSetupServer(uid, retention)
        updates = {
          status: SERVER_SETUP_STATUS.BUILDING,
        }
      } catch (error) {
        const errorCode = 'creation_request_error'
        const errorMessage = error.toString()
        updates = {
          status: SERVER_SETUP_STATUS.ERRORED,
          errorCode,
          errorMessage,
        }
      } finally {
        console.log(updates)
        parentRef.update(updates)
      }
    }
  })
