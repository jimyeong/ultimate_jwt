import { AuthManagerContainer, GlobalUIControlContainer } from './Containers';
import { AuthenticationPage } from './Authentication';
import { getJwtToken, getRefreshToken } from './helper';
import React, { useEffect } from 'react';
import { setUserLoggedIn, setLogout } from './features/system/systemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Routes, Route } from 'react-router-dom';
import {
  removeAllToken,
  deleteRefreshToken,
  deleteJwtToken,
  checkIfTokenExist,
  setLogoutTime,
} from './helper/storage';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const system = useSelector((state) => state.system);
  const signOut = () => {
    removeAllToken();
    dispatch(setLogout());
  };

  const syncLogout = (event) => {
    if (event.key === 'logout') {
      dispatch(setLogout());
      removeAllToken();
      navigate('/authentication');
    }
  };

  useEffect(() => {
    console.log('APP 마운트됨');
    window.addEventListener('storage', syncLogout);
    if (checkIfTokenExist()) {
      // 토큰은 아직 만료되지 않아서 가지고 있는데, 로그인 정보가 없는 경우 (새로고침 및 새로 유입한 경우)
      !system.user && dispatch(setUserLoggedIn(navigate));
    }

    if (!checkIfTokenExist()) {
      navigate('/authentication', {
        prevPath: '/',
        message: 'token not exist',
      });
    }

    return () => {
      console.log('APP 언 마운트됨');
      window.removeEventListener('storage', syncLogout);
    };
  }, [system.user]);

  if (system.loading === 'loading') return <div>loading</div>;
  if (system.loading === 'error') return <div>에러가 발생했습니다.</div>;
  return (
    <GlobalUIControlContainer className="App">
      <Routes>
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Routes>
      {system.user && (
        <div>
          <div>로그인됨, Hi, {system.user.username}</div>
          <div
            onClick={() => {
              setLogoutTime();
              signOut();
            }}
          >
            로그아웃{' '}
          </div>
        </div>
      )}
    </GlobalUIControlContainer>
  );
}

export default App;
