import cookies from 'vue-cookies';

export default {
     currentUser: {},
     loggedIn: cookies.get('authenticated'),
}