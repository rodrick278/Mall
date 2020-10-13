import {request} from "./request"

export function getHomeMultidata(){
  return request({
    method:'get',
    url:'/home/multidata',
  })
}