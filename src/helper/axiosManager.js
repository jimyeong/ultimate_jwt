import axios from 'axios';
import { getJwtToken, getRefreshToken, deleteJwtToken } from '.';
import { deleteRefreshToken, logout } from './storage';
axios.defaults.withCredentials = true;

const axiosManager = async (url, method, data = {}) => {
  const host = process.env.REACT_APP_API_HOST;
  const token = getJwtToken();
  const endpoint = `${host}${url}`;

  const responseHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  let requestResult;
  let err;
  try {
    if (method === 'GET' || method === 'get') {
      requestResult = await axios.get(endpoint, responseHeader);
    }
    if (method === 'POST' || method === 'post') {
      requestResult = await axios.post(endpoint, data, responseHeader);
    }
    if (method === 'DELETE' || method === 'delete') {
      requestResult = await axios.delete(endpoint, responseHeader);
    }
    if (method === 'PUT' || method === 'put') {
      requestResult = await axios.put(endpoint, data, responseHeader);
    }
  } catch (error) {
    console.log(err);
    if (error.response.status == 404) alert('페이지를 찾을 수 없음');
    if (error.response.status == 401) {
      alert('토큰만료');
      logout();
    }
    err = error;
  }
  const p = new Promise((resolve, reject) => {
    if (err) return reject(err);
    resolve(requestResult);
  });
  return p;
};

export default axiosManager;
