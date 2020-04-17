import request from '@/utils/request';




export function login(data) {
  return request({
    url: '/u/login',
    method: 'post',
    data: data
  })
}

export function addUser(data) {
  return request({
    url: '/u/add',
    method: 'post',
    data: data
  })
}

export function downloadModel() {
  return request({
    url: '/u/model/download',
    method: 'get'
  })
}


export function isUserUUser(uUser) {
  return request({
    url: '/u/is/' + uUser,
    method: 'get'
  })
}



export function updateStartusing(uId, uStartusing) {
  return request({
    url: '/u/' + uId + "/" + uStartusing,
    method: 'put'
  })
}



export function getInfo(token) {
  return request({
    url: '/u/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/u/logout',
    method: 'post'
  })
}

export function getByKeys(params) {
  return request({
    url: '/u/search',
    method: 'get',
    params: params
  })
}


export function delById(uId) {
  return request({
    url: '/u/' + uId,
    method: 'delete'
  })
}

export function delByIds(ids) {
  return request({
    url: '/u/batch',
    method: 'delete',
    params: {
      ids: ids
    }
  })
}