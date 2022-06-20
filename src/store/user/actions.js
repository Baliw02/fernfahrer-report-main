import axios from 'axios';
import cookies from 'vue-cookies';

export const checkLoggedIn = ({state, commit}) => {
     if(state.loggedIn != null){
          if(cookies.get('user') != null){
               console.log("Itt vok")
               var storageData = cookies.get('user');
               var email = storageData.email;
               var password = storageData.password;
               console.log(password);
               if(password != undefined && email != undefined){
                    axios.get('http://fernfahrer-reporter.de/api/json/login', {params: {email: email, password: password}}).then( res => {
                         if(res.data.error.code){
                              console.log('itt nem')
                              cookies.remove('user');
                              cookies.remove('authenticated');
                              commit('removeUserData');
                         }
                         else{
                              console.log('Itt is')
                              commit('setUserData', res.data.data.user);
                         }
                    });     
               }
               else{
                    cookies.remove('user');
                    cookies.remove('authenticated');
                    location.reload();
               }
          }                    
     }
     else{
          if(cookies.get('user') != undefined){
               cookies.remove('user');
               cookies.remove('authenticated');
          }
     }
};

 