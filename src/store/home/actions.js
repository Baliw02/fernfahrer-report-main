import axios from 'axios';

export const printHello = ({commit}) => {
    commit('writeHello');
};

export const getMissions = ({commit}) => {
    axios.get('http://fernfahrer-reporter.de/api/json/getMissions').then( res => {
        commit('setMissions', res.data.data.missions);
    })
};
export const getCategories = ({commit}) => {
     axios.get('http://fernfahrer-reporter.de/api/json/getCategories').then( res => {
          commit('setCategories', res.data.data.categories);
     })
}
export const getLatestImages = ({state, commit}) => {
     axios.get('http://fernfahrer-reporter.de/api/json/latestImages', {params:{limit: 9, from: state.chunks}}).then( res => {
          commit('setLatestImages', res.data.data.images);
          
          setTimeout(() => {
               commit('setThreeColumnLatest');
               commit('setTwoColumnLatest');          
               commit('lazyLoadController');
          }, 100);

     })
};
export const getPopularImages = ({state, commit}) => {
     console.log('Actions chunk: ', state.chunks);
     axios.get('http://fernfahrer-reporter.de/api/json/popularImages', {params:{limit: 9, from: state.chunks}}).then( res => {
          commit('setPopularImages', res.data.data.images);

          setTimeout(() => {
               commit('setThreeColumnPopular');
               commit('setTwoColumnPopular');
               commit('lazyLoadController');
          }, 100);

     })
}
export const getBestImages = ({state, commit}) => {
     axios.get('http://fernfahrer-reporter.de/api/json/bestImages', {params:{limit: 9, from: state.chunks}}).then( res => {
          commit('setBestImages', res.data.data.images);

          setTimeout(() => {
               commit('setThreeColumnBest');
               commit('setTwoColumnBest');
          }, 400);

          commit('lazyLoadController');
     })     
}
export const getVideos = ({state, commit}) => {
     axios.get('http://fernfahrer-reporter.de/api/json/getVideos', {params:{limit: 9, from: state.chunks}}).then( res => {
          commit('setVideos', res.data.data.videos);

          setTimeout(() => {
               commit('setThreeColumnVideos');
               commit('setTwoColumnVideos');
          }, 400);

          commit('lazyLoadController');
     })     
}
// http://fernfahrer-report.de/api/json/boughtImages
// http://fernfahrer-report.de/api/json/boughtVideos

export const getBoughtImages = ({state, commit}) => {
     axios.get('http://fernfahrer-reporter.de/api/json/boughtImages', {params:{limit: 9, from: state.chunks}}).then( res => {
          commit('setBoughtImages', res.data.data.images);

          setTimeout(() => {
               commit('setThreeColumnBought');
               commit('setTwoColumnBought');
          }, 400);
     })
}