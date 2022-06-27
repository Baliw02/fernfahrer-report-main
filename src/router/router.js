import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
     {
          props: true,
          name: 'Start',
          path: '/home',
          component: () => import('@/components/Home'),
          meta: {title: 'Fernfahrer | Home'}
     },
     {
          props: true,
          name: 'Not found',
          path: '*',
          component: () => import('@/components/NotFound'),
          meta: {title: '404 Page Not Found'}
     },
     {
          props: true,
          name: 'Video view',
          path: '/video/:id',
          component: () => import('@/components/VideoView'),
          meta: {title: 'Fernfahrer | Video view'}
     },
     {
          props: true,
          name: 'Image view',
          path: '/image/:id',
          component: () => import('@/components/ImageView.vue'),
          meta: {title: 'Fernfahrer | Image view'}
     },
     {
          props: true,
          name: 'Mission view',
          path: '/mission/:id',
          component: () => import('@/components/mission/MissionView.vue'),
          meta: {title: 'Fernfahrer | Mission view'}
     },
     {
          props: true,
          name: 'Aüftrage',
          path: '/missions',
          component: () => import('@/components/tabs/Missions.vue'),
          meta: {title: 'Fernfahrer | Missions'}
     },
     {
          props: true,
          name: 'Category view',
          path: '/category/:id',
          component: () => import('@/components/category/CategoryView.vue'),
          meta: {title: 'Fernfahrer | Categories view'}
     },
     {
          props: true,
          name: 'Rubriken',
          path: '/rubriken',
          component: () => import('@/components/tabs/Categories.vue'),
          meta: {title: 'Fernfahrer | Missions'}
     },
     {
          props: true,
          name: 'Anmeldung',
          path: '/login',
          component: () => import('@/components/Login.vue'),
          meta: {title: 'Fernfahrer | Login'}
     },
     {
          props: true,
          name: 'Register',
          path: '/register',
          component: () => import('@/components/Register.vue'),
          meta: {title: 'Fernfahrer | Register'}
     },
     {
          props: true,
          name: 'Password reset',
          path: '/password-reset',
          component: () => import('@/components/PasswordReset.vue'),
          meta: {title: 'Fernfahrer | Password Reset'}
     },
     {
          props: true,
          name: 'Datenschutz',
          path: '/datenschutz',
          component: () => import('@/components/Datenschutz.vue'),
          meta: {title: 'Fernfahrer | Datenschutz'}
     },
     {
          props: true,
          name: 'AGB',
          path: '/agb',
          component: () => import('@/components/Agb.vue'),
          meta: {title: 'Fernfahrer | AGB'}
     },
     {
          props: true,
          name: 'Profil',
          path: '/profile/:id',
          component: () => import('@/components/profile/Profile.vue') 
     },
     {
          props: true,
          name: 'Suche',
          path: '/search',
          component: () => import('@/components/search/Search.vue') 
     },
     {
          props: true,
          name: 'Image upload',
          path: '/upload',
          component: () => import('@/components/upload/ImageUpload.vue') 
     },
     {
          props: true,
          name: 'Video upload',
          path: '/upload',
          component: () => import('@/components/upload/VideoUpload.vue') 
     },
     
];

export const router = new VueRouter({
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

