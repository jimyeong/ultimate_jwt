import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosManager, setJwtToken, setRefreshToken } from '../helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserLoggedIn } from '../features/system/systemSlice';

const AuthenticationPageBlock = styled.div``;
const AuthenticationPage = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intialValue = { username: '', userPassword: '' };
  const [values, setValues] = useState(intialValue);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const onReset = () => {
    setValues(intialValue);
  };
  const login = async () => {
    const url = '/v1/login';
    const method = 'POST';
    const data = values;
    return axiosManager(url, method, data);
  };
  const onSubmit = () => {
    onReset();
    login()
      .then((response) => {
        if (response.status == 200) {
          const { accessToken, refreshToken } = response.data;
          setJwtToken(accessToken);
          setRefreshToken(refreshToken);
          dispatch(setUserLoggedIn(navigate));
          navigate('/', { prevPath: '/authentication', message: 'login ok' });
        }
      })
      .catch((error) => {});
  };

  return (
    <AuthenticationPageBlock>
      <input
        type="text"
        name="username"
        value={values.userId}
        onChange={onChange}
        placeholder="username"
      />
      <input
        type="password"
        name="userPassword"
        value={values.userPassword}
        onChange={onChange}
        placeholder="password"
      />
      <button onClick={onSubmit}>제출</button>
    </AuthenticationPageBlock>
  );
};

export default AuthenticationPage;
