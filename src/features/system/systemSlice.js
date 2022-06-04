import { useDispatch } from 'react-redux';
import { axiosManager } from '../../helper';
import { useNavigate } from 'react-router-dom';

export const loadingState = {
  idle: 'idle',
  loading: 'loading',
  loaded: 'loaded',
  reload: 'reload',
  error: 'error',
};
const initialState = {
  user: null,
  messages: [],
  loading: loadingState.idle,
};
const systemReducer = (systemState = initialState, action) => {
  switch (action.type) {
    case 'system/logout':
      return {
        ...systemState,
        user: action.payload,
      };
    case 'system/login':
      return {
        ...systemState,
        user: action.payload,
      };
    case 'system/loading':
      return {
        ...systemState,
        loading: action.payload,
      };

    default:
      return systemState;
  }
};

export const setUserLoggedIn = (navigate) => {
  return async function setUserLoggedInThunk(dispatch, getState) {
    const url = '/v1/auth';
    const method = 'GET';
    let user;
    try {
      dispatch(setLoading(loadingState.loading));
      const { data } = await axiosManager(url, method);
      dispatch(setLogin(data.decoded));
    } catch (error) {
      console.log(['error'], error);
      dispatch({ type: 'system/logout', payload: null });
      dispatch(setLoading(loadingState.error));
      navigate('/');
    } finally {
      dispatch(setLoading(loadingState.loaded));
    }
  };
};

/* 
loading: "idle"
loading: "error"
loading: "loading"
loading: "loaded"
loading: "reload"
*/
export const setLoading = (loadingState) => ({
  type: 'system/loading',
  payload: loadingState,
});

export const setLogout = () => ({
  type: 'system/logout',
  payload: null,
});

const setLogin = (user) => ({
  type: 'system/login',
  payload: user,
});

export default systemReducer;
