import { fetch } from 'dva';
import { notification } from 'antd';
import router from 'umi/router';

export default async function request(url, options) {
  return await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .catch(checkFrrorStatus);
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  const errorText = res.statusText;

  notification.error({
    message: `请求错误 ${res.status} ${res.url}`,
    description: errorText,
  });
  const error = new Error(errorText);
  error.name = res.status;
  error.response = res;
  throw error;
}

function checkFrrorStatus(err) {
  if (err && err.response) {
    const { status } = err.response;
    if (status === 403) {
      router.push('/exception/403');
    }
    if (status <= 504 && status >= 500) {
      router.push('/exception/500');
    }
    if (status > 404 && status <= 422) {
      router.push('/exception/404');
    }
  }
}
