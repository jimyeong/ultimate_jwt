import { AuthManagerContainer, GlobalUIControlContainer } from './Containers';
import { AuthenticationPage } from './Authentication';
import { getJwtToken, getRefreshToken } from './helper';
import React, { useEffect } from 'react';
import { setUserLoggedIn, setLogout } from './features/system/systemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Routes, Route } from 'react-router-dom';
import {
  deleteRefreshToken,
  deleteJwtToken,
  checkIfTokenExist,
} from './helper/storage';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);

  useEffect(() => {
    console.log('APP 마운트됨');
    if (checkIfTokenExist()) {
      // 토큰은 아직 만료되지 않아서 가지고 있는데, 로그인 정보가 없는 경우 (새로고침 및 새로 유입한 경우)
      !system.user && dispatch(setUserLoggedIn(navigate));
    }
    if (!checkIfTokenExist())
      navigate('/authentication', {
        prevPath: '/',
        message: 'token not exist',
      });
    return () => {
      console.log('APP 언 마운트됨');
    };
  }, [system.user]);
  console.log(['system'], system);
  if (system.loading === 'loading') return <div>loading</div>;
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
              deleteRefreshToken();
              deleteJwtToken();
              dispatch(setLogout());
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
