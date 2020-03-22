// @flow
import axios from 'axios'
import config from './config'

const instance = axios.create({
  baseURL: config.apiEndPoint,
})

const requestSetupServer = async (uid: string, retention: string) => {
  const url = `/create?uuid=${uid}&rp=${retention}`
  await instance.post(url)
}

export default {
  requestSetupServer,
}
