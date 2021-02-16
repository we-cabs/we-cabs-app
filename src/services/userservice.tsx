let  userSigninInfo = {};

export const getUserSigninInfo = () => {
    const userSigninInfo = (localStorage.getItem('userInfo')) ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;
    return userSigninInfo;
}
export const setUserSigninInfo = (payload:any) => {
  userSigninInfo = payload;
}