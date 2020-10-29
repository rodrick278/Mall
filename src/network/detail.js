import {request} from "./request"

export function getDetailnfo(iid) {
  return request({
    method: 'get',
    url: '/detail',
    params: {
      iid
    }
  })
}