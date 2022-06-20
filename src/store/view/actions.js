import axios from 'axios';

export const printHello = ({commit}) => {
    commit('writeHello');
};

export const getVideo = ({commit}, id) => {          
     axios.get('http://fernfahrer-reporter.de/api/json/getVideo/', {params: {id: id}}).then( res => {
          // console.log('Video data: ', res.data.error);
          if(res.data.error.code != 107){
               commit('setVideo', res.data.data);
          }
          else{
               commit('setErrorMessage', res.data.error);
          }
     });
};

export const getImage = ({commit}, id) => {
     axios.get('http://fernfahrer-reporter.de/api/json/getImage/', {params: {id: id}}).then( res => {
          // console.log('Video data: ', res.data.error);
          if(res.data.error.code != 107){
               commit('setImage', res.data.data);
          }
          else{
               commit('setErrorMessage', res.data.error);
          }
     });

};
export const getMission = ({commit}, id) => {
     axios.get('http://fernfahrer-reporter.de/api/json/getMission/', {params: {id: id}}).then( res => {
          // console.log('Video data: ', res.data.error);
          if(res.data.error.code != 107){
               commit('setMission', res.data.data);
               commit('setThreeColumnMission');
               commit('setTwoColumnMission');
          }
          else{
               commit('setErrorMessage', res.data.error);
          }
     });

};

export const getCategory = ({commit}, id) => {
     axios.get('http://fernfahrer-reporter.de/api/json/getCategory/', {params: {id: id}}).then( res => {
          if(res.data.error.code != 107){
               commit('setCategory', res.data.data);
               commit('setThreeColumnCategory');
               commit('setTwoColumnCategory');
          }
          else{
               commit('setErrorMessage');
          }
     })
}


