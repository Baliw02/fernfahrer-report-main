import Vue from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';

import store from './store/store.js';
import { router } from './router/router.js';

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faXmark, faTimes, faAngleLeft, faAngleRight, faAngleUp, faAngleDown, faUser, faClock, faShare, faCirclePlus, faEllipsisV, faCloud, faCamera, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faMessage, faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faSearch, faBars, faXmark, faTimes, faAngleLeft, faAngleRight, faAngleUp, faAngleDown, faUser, faHeart, faHeartSolid, faClock, faShare, faMessage, faImage, faCirclePlus, faEllipsisV, faCloud, faCamera, faEnvelope);


Vue.use(VueLazyload, {
     preLoad: 1,
     // listenEvents: ['scroll', 'touchmove'],
});
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false


new Vue({
     render: h => h(App),
     router,
     store: store,
}).$mount('#app')
