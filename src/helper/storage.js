// Short duration JWT token (5-10 min)
export function getJwtToken() {
  return sessionStorage.getItem('jwt');
}

export function setJwtToken(token) {
  sessionStorage.setItem('jwt', token);
}
// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}
export function setRefreshToken(token) {
  sessionStorage.setItem('refreshToken', token);
}
export function deleteJwtToken() {
  sessionStorage.removeItem('jwt');
}
export function deleteRefreshToken() {
  sessionStorage.removeItem('refreshToken');
}
export function checkIfTokenExist() {
  if (!getJwtToken() && !getRefreshToken()) {
    return false;
  }
  return true;
}
export function setLogoutTime() {
  localStorage.setItem('logout', Date.now());
}

export function removeAllToken() {
  deleteJwtToken();
  deleteRefreshToken();
}

export function logout() {
  setLogoutTime();
  removeAllToken();
  // add the value of logout key on storage changing code
}
