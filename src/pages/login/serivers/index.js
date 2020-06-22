import request from '@/utils/request';

export const login = values => {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });
};
