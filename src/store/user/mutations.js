import cookies from 'vue-cookies';

export const setUserData = (state, data) => {
     state.currentUser = data;
     // console.log(state.currentUser);
};
export const removeUserData = (state) => {
     state.currentUser = {};
};
export const logOut = () =>{
     cookies.remove('authenticated');
     cookies.remove('user');
}
