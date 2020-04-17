import request from '@/utils/request'


export function addVa(data) {
    return request({
        url: '/va/add',
        method: 'post',
        data: data
    })
}

export function delVaById(id) {
    return request({
        url: '/va/' + id,
        method: 'delete'
    })
}


export function getByKeys(params) {
    return request({
        url: '/va/search',
        method: 'get',
        params: params
    })
}

export function getOpenActivies(params) {
    return request({
        url: '/va/open',
        method: 'get',
        params: params
    })
}

export function updateEnable(vmId, enable) {
    return request({
        url: '/va/' + vmId + "/" + enable,
        method: 'put'
    })
}

export function getVaByVaId(vaId) {
    return request({
        url: '/va/' + vaId,
        method: 'get'
    })
}

