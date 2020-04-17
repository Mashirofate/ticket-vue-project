import request from '@/utils/request'


export function addEm(data) {
    return request({
        url: '/ts/add',
        method: 'post',
        data: data
    })
}

export function dekEmById(id) {
    return request({
        url: '/ts/' + id,
        method: 'delete'
    })
}


export function getByKeys(params) {
    return request({
        url: '/ts/search',
        method: 'get',
        params: params
    })
}






export function updateEnable(vmId, enable) {
    return request({
        url: '/ts/' + vmId + "/" + enable,
        method: 'put'
    })
}

