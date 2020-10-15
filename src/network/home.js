import {request} from "./request"

export function getHomeMultidata(){
  return request({
    method:'get',
    url:'/home/multidata',
  })
}

export function getHomeGoods(type,page){
return request({
  method:'get',
  url:'/home/data',
  params:{
    type,
    page
  }
})
}