import Vue from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';
import VueRouter from 'vue-router';

import store from './store/store';

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faXmark, faTimes, faAngleLeft, faAngleRight, faAngleUp, faAngleDown, faUser, faClock, faShare, faCirclePlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart, faMessage, faImage} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret, faSearch, faBars, faXmark, faTimes, faAngleLeft, faAngleRight, faAngleUp, faAngleDown, faUser, faHeart, faHeartSolid, faClock, faShare, faMessage, faImage, faCirclePlus, faEllipsisV);


Vue.use(VueLazyload, {
     preLoad: 1,
     // listenEvents: ['scroll', 'touchmove'],
});
Vue.use(VueRouter);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

const routes = [
     {
          props: true,
          name: 'Start',
          path: '/home',
          component: () => import('./components/Home'),
          meta: {title: 'Fernfahrer | Home'}
     },
     {
          props: true,
          name: 'Not found',
          path: '*',
          component: () => import('./components/NotFound'),
          meta: {title: '404 Page Not Found'}
     },
     {
          props: true,
          name: 'Video view',
          path: '/video/:id',
          component: () => import('./components/VideoView'),
          meta: {title: 'Fernfahrer | Video view'}
     },
     {
          props: true,
          name: 'Image view',
          path: '/image/:id',
          component: () => import('./components/ImageView.vue'),
          meta: {title: 'Fernfahrer | Image view'}
     },
     {
          props: true,
          name: 'Mission view',
          path: '/mission/:id',
          component: () => import('./components/mission/MissionView.vue'),
          meta: {title: 'Fernfahrer | Mission view'}
     },
     {
          props: true,
          name: 'Aüftrage',
          path: '/missions',
          component: () => import('./components/tabs/Missions.vue'),
          meta: {title: 'Fernfahrer | Missions'}
     },
     {
          props: true,
          name: 'Category view',
          path: '/category/:id',
          component: () => import('./components/category/CategoryView.vue'),
          meta: {title: 'Fernfahrer | Categories view'}
     },
     {
          props: true,
          name: 'Rubriken',
          path: '/rubriken',
          component: () => import('./components/tabs/Categories.vue'),
          meta: {title: 'Fernfahrer | Missions'}
     },
     {
          props: true,
          name: 'Anmeldung',
          path: '/login',
          component: () => import('./components/Login.vue'),
          meta: {title: 'Fernfahrer | Login'}
     },
     {
          props: true,
          name: 'Register',
          path: '/register',
          component: () => import('./components/Register.vue'),
          meta: {title: 'Fernfahrer | Register'}
     },
     {
          props: true,
          name: 'Password reset',
          path: '/password-reset',
          component: () => import('./components/PasswordReset.vue'),
          meta: {title: 'Fernfahrer | Password Reset'}
     },
     {
          props: true,
          name: 'Datenschutz',
          path: '/datenschutz',
          component: () => import('./components/Datenschutz.vue'),
          meta: {title: 'Fernfahrer | Datenschutz'}
     },
     {
          props: true,
          name: 'AGB',
          path: '/agb',
          component: () => import('./components/Agb.vue'),
          meta: {title: 'Fernfahrer | AGB'}
     },
     {
          props: true,
          name: 'Profil',
          path: '/profile/:id',
          component: () => import('./components/profile/Profile.vue') 
     },
     {
          props: true,
          name: 'Suche',
          path: '/search',
          component: () => import('./components/search/Search.vue') 
     },
     
];

const router = new VueRouter({
     mode: 'history',
     routes
});


const originalPush = router.push
router.push = function push(location, onResolve, onReject)
{
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
 
    return originalPush.call(this, location).catch((err) => {
        if (VueRouter.isNavigationFailure(err)) {
            return err
        }
   
        return Promise.reject(err)
    })
}

new Vue({
     render: h => h(App),
     router,
     store: store,
}).$mount('#app')
