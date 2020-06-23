import request from '@/utils/request';

export const fetchUsers = () => {
  return request('/api/users/get_users/1/3');
};
