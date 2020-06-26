import request from '@/utils/request'

export function fetchAllusers() {
    return request(`/api/users/all_users`)
}

export function add(payload) {
    return request(`/api/users/add_report/${localStorage.userId}`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}

export function fetchReports({ page, pageSize }) {
    return request(`/api/users/reports/${page}/${pageSize}/${localStorage.userId}`)
}

export function editReports(id) {
    return request(`/api/users/report_detail/${localStorage.userId}/${id}`)
}

export function updateReports(parmars) {
    return request(`/api/users/edit_report/${localStorage.userId}/${parmars.id}`, {
        method: 'POST',
        body: JSON.stringify(parmars)
    })
}



export function removeReoprts(id) {
    return request(`/api/users/delete_report/${localStorage.userId}/${id}`, {
        method: 'DELETE'
    })
}