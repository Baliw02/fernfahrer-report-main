import Vue from 'vue';
import Vuex from 'vuex';

import cookies from 'vue-cookies';

// import axios from 'axios';

Vue.use(Vuex);

import homeModule from './home/main';
import viewModule from './view/main';
import userModule from './user/main';

export default new Vuex.Store({
     modules:{
          homeModule,
          viewModule,
          userModule,
     },
     state:{
          windowWidth: 0,
          url: 'http://fernfahrer-reporter.de/api/json/',
          dataUrl: 'http://fernfahrer-reporter.de/',
          selectedTab: 0,
          loggedIn: cookies.get('authenticated'),
          currentUser: {},
          searchText: '',
          searchType: false,
          fileName: ''
     },
     mutations:{
          setWindowWidth(state, data){
               state.windowWidth = data;
          },
          setSelectedTab(state, index){
               state.selectedTab = index;
          },
          setSearchText(state, data){
               state.searchText = data;
               console.log(state.searchText);
          },
          setSearchType(state){
               state.searchType = false;
               state.searchType = true;
          },
          setFileUpload(state, data){
               state.fileName = data;
          }
     },
});
