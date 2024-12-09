import axios from 'axios'
import { ChangePasswordModel } from './_models'

const API_URL = process.env.REACT_APP_API_URL
export const CHANGE_PASSWORD_URL = `${API_URL}/auth/admin/changePassword`

export function changePassword(values:Object) {
  return axios.put<ChangePasswordModel>(CHANGE_PASSWORD_URL,values)
}

