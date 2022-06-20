<template>
     <div class="profile">
          <div class="profile-banner">
               <div class="profile-banner__image">
                    <img src="@/assets/profilehero.jpg" alt="Profile Banner Image">
                    <div class="wrapper">
                         <!-- <font-awesome-icon :icon="['fa', 'fa-angle-left']" v-if="!menuActive && newRoute != 'Start'" /> -->
                         <div class="profile-banner__image-data">
                              <div class="profile-banner__image-data-top">
                                   {{userData.username}}
                              </div>
                              <div class="profile-banner__image-data-bottom">
                                   <div class="likes">
                                        <font-awesome-icon :icon="['far', 'fa-heart']" />
                                        {{userData.numberOfLikes}}
                                   </div>
                                   <div class="comments">
                                        <font-awesome-icon :icon="['far', 'fa-message']" />
                                        {{userData.comments_count}}
                                   </div>
                                   <div class="images">
                                        <font-awesome-icon :icon="['far', 'fa-image']" />
                                        {{userData.images_count}}
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div class="tabs">
               <div class="tabs-bar">
                    <div class="tabs-bar__title" v-for="(item, index) in menu" :key="index" :class="{active: index === selectedTab}" @click="selectTab(index)">
                         {{item}}
                    </div>
               </div>
               <div class="tabs-content" v-if="selectedTab === 0">
                    <ProfileImages />
               </div>
               <div class="tabs-content" v-if="selectedTab === 1">
                    <ProfileVideos />
               </div>
               <div class="tabs-content" v-if="selectedTab === 2">
                    <ProfileFavourites />
               </div>
               <div class="tabs-content" v-if="selectedTab === 5">
                    <ProfileEdit />
               </div>
          </div>
     </div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';

export default {
     components:{
          ProfileImages: () => import('./ProfileImages.vue'),
          ProfileVideos: () => import('./ProfileVideos.vue'),
          ProfileFavourites: () => import('./ProfileFavourites.vue'),
          ProfileEdit: () => import('./ProfileEdit.vue')
     },
     data(){
          return{
               userData: {},

               menu: [],
               notAuthMenu: ['bilder', 'videos', 'favoriten', 'kommentare', 'hinweise'],
               authMenu: ['bilder', 'videos', 'favoriten', 'kommentare', 'hinweise', 'profil'],
               
               selectedTab: 0,
          }
     },
     created(){
     },
     mounted(){
          this.getUser(this.$route.params.id);
          setTimeout(() => {
               this.menuController();
          },200)
     },
     methods:{
          async getUser(userId){
               await axios.get(this.apiUrl + 'getUser', {params: {user_id: userId}}).then( res => {
                    this.userData = res.data.data;
               })
          },
          selectTab(index){
               this.selectedTab = index;
          },
          menuController(){
               if(this.currentUser.id === this.userData.id && this.loggedIn){
                    this.menu = this.authMenu;
               }
               else{
                    this.menu = this.notAuthMenu;
               }
          }
     },
     computed:{
          ...mapState({
               apiUrl: state => state.url,
               currentUser: state => state.userModule.currentUser,
               loggedIn: state => state.userModule.loggedIn
          })
     },
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    height: 0;
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: transparent;
    height: 0;
    width: 0;
}

.profile{
     margin-top: 50px;
     &-banner{
          &__image{
               position: relative;
               img{
                    object-fit: cover;
                    max-height: 80px;
                    width: 100%;
               }
               &-data{
                    position: absolute;
                    height: fit-content;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    left: 10px;
                    font-family: $f-roboto;
                    font-weight: 600;
                    &-top{
                         text-align: left;
                         width: 100%;
                         font-size: 14px;
                         text-shadow: 2px 2px 2px #000000;
                    }
                    &-bottom{
                         display: flex;
                         justify-content: space-between;
                         .likes, .comments, .images{
                              text-shadow: 2px 2px 2px #000000;
                              font-size: 16px;
                              display: flex;
                              align-items: center;
                              margin-right: 10px;
                         }
                         
                    }
               }
          }
     }
     .tabs{
          &-bar{
               &__title{
                    text-transform: uppercase;
               }
          }
     }
}
</style>

