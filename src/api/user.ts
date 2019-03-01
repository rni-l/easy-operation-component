import request from '@/utils/request'
import { LOGIN } from './types'

export const api_userLogin = (params: any, opts?: utils.requestHanldeType) => {
  return request.post(`${LOGIN}/login.php`, params, opts)
}
