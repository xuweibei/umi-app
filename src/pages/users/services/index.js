import request from '@/utils/request';

export const fetchUsers = ({ page, pageSize }) => {
  return request(`/api/users/get_users/${page}/${pageSize}`);
};

export const addUsers = payload => {
  return request('/api/users/add_user', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const edit = payload => {
  return request(`api/users/edit_user/${payload.id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const remove = payload => {
  return request(`api/users/delete_user/${payload}`, {
    method: 'DELETE',
  });
};
