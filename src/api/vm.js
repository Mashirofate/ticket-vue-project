import request from '@/utils/request'


export function addVm(data) {
  return request({
    url: '/vm/add',
    method: 'post',
    data: data
  })
}

export function dekVmById(id) {
  return request({
    url: '/vm/' + id,
    method: 'delete'
  })
}


export function getByKeys(params) {
  return request({
    url: '/vm/search',
    method: 'get',
    params: params
  })
}

export function getVmSimples() {
  return request({
    url: '/vm/simple',
    method: 'get',
  })
}

export function updateEnable(vmId, enable) {
  return request({
    url: '/vm/' + vmId + "/" + enable,
    method: 'put'
  })
}

