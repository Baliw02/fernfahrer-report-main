<template>
     <div class="sidebar">
          <div class="sidebar-bar">
               <div class="sidebar-bar__icon" @click="sideBarController()" v-if="!menuActive && newRoute === 'Start'">
                    <font-awesome-icon :icon="['fa', 'fa-bars']" />
               </div>
               <div class="sidebar-bar__icon" @click="backToRoute()" v-if="!menuActive && newRoute != 'Start'">
                    <font-awesome-icon :icon="['fa', 'fa-angle-left']" v-if="!menuActive && newRoute != 'Start'" />
               </div>
               <div class="sidebar-bar__logo" :class="{fixed: menuActive}">
                    <img v-lazy="require('@/assets/sidebar-logo' + '.png')" alt="Fernfahrer logo">
               </div>
               <div class="sidebar-bar__notification" :class="{fixed: menuActive}">
                    <div class="sidebar-bar__notification-not" v-if="!loggedIn">
                         ?                    
                    </div>
                    <div class="sidebar-bar__notification-counter" v-if="loggedIn" >
                         {{currentUser.notifications}}
                    </div>
               </div>
          </div>
          <div class="sidebar-block" :class="{active: menuActive}">
               <div class="sidebar-block__title" v-if="!loggedIn">
                    Reporter
               </div>
               <div class="sidebar-block__title" v-else>
                    Hallo, {{currentUser.username}}
               </div>
               <div class="sidebar-block__close" @click="sideBarController()">
                    <font-awesome-icon :icon="['fas', 'fa-times']" v-if="menuActive" />
               </div>
               <div class="sidebar-block__list" v-if="!loggedIn">
                    <div class="sidebar-block__list-item" v-for="(item, index) in menu" :key="index" :class="{active: activeIndex === index}" @click="selectMenu(index), selectSite(item)">
                         {{item}}
                    </div>
               </div>
               <div class="sidebar-block__list" v-else>
                    <div class="sidebar-block__list-item" v-for="(item, index) in authMenu" :key="index" :class="{active: activeIndex === index}" @click="selectMenu(index), selectSite(item)">
                         {{item}}
                    </div>
               </div>
          </div>
     </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
     data(){
          return{
               menu: ['Start', 'Anmeldung', 'Suche', 'Rubriken', 'Aüftrage', 'Benachrichtigungen', 'Haufige Fragen', 'Datenschutz', 'AGB', 'Impressum'],
               authMenu: ['Start', 'Suche', 'Rubriken', 'Aüftrage', 'Profil', 'Benachrichtigungen', 'Haufige Fragen', 'Datenschutz', 'AGB', 'Impressum', 'Abmelden'],
               activeIndex: 0,
               menuActive: false,
               oldRoute: '',
               newRoute: '',
               userId: '',
               imageId: ''
          }
     },
     mounted(){
     },
     methods:{
          selectMenu(index){
               this.activeIndex = index;
          },
          sideBarController(){
               if(!this.menuActive){
                    this.menuActive = true;
               }
               else{
                    this.menuActive = false;
               }
          },
          selectSite(name){
               if(name === 'Profil'){
                    this.$router.push({name: 'Profil', params: {id: this.currentUser.id}});
               }
               if(name === 'Abmelden'){
                    this.$store.commit('logOut');
                    location.reload();
               }
               if(name != 'Profil' && name != 'Abmelden'){
                    this.$router.push({name: name});
               }
               this.menuActive = false;
          },
          backToRoute(){
               this.$router.go(-1);
          },
     },
     watch: {
          $route(to, from){
               this.oldRoute = from;
               this.newRoute = to.name;
          }
     },
     computed:{
          ...mapState({
               loggedIn: state => state.userModule.loggedIn,
               currentUser: state => state.userModule.currentUser
          })
     }
}
</script>

<style scoped lang="scss">
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;
.sidebar{
     background-color: grey;
     position: fixed;
     z-index: 99999;
     width: 100%;
     top: 0;
     &-bar{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          padding: 0px 10px;
          &__icon{
               color: white;
               font-size: $icon-size;
               cursor: pointer;
          }
          &__logo{
               position: relative;
               img{
                    max-width: 220px;
               }
               &.fixed{
                    position: absolute;
                    left: -6px;
                    right: 0;
                    margin: auto;
               }
          }
          &__notification{
               display: flex;
               justify-content: center;
               align-items: center;
               width: 24px;
               height: 24px;
               border-radius: 100%;
               background-color: $c-theme;
               color: white;
               font-size: 16px;
               position: relative;
               &.fixed{
                    position: absolute;
                    right: 10px;
                    z-index: 0;
               }
          }
     }
     &-block{
          height: 100vh;
          position: absolute;
          // width: 100%;
          left: -100%;
          top: 0;
          width: 320px;
          transition: all .1s linear;
          background-color: grey;
          // transform: translateX(-100%);
          &__title{
               background-color: black;
               font-size: 20px;
               text-align: left;
               padding: 13.5px 10px; 
          }
          &__close{
               position: absolute;
               right: 10px;
               color: white;
               font-size: $icon-size + 6;
               cursor: pointer;
          }
          &__list{
               text-align: left;
               padding: 30px 10px;
               &-item{
                    width: fit-content;
                    position: relative;
                    font-size: 20px;
                    font-family: $f-roboto;
                    color: white;
                    margin: 10px 0px;
                    cursor: pointer;
                    
                    // &::after{
                    //      transition: all .1s linear;
                    //      position: absolute;
                    //      content: '';
                    //      background-color: $c-theme;
                    //      width: 0;
                    //      height: 3px;
                    //      bottom: -3px;
                    //      left: 0;
                    //      border-radius: 2px;
                    // }
                    // &.active{
                    //      position: relative;
                    //      &::after{
                    //           width: 100%;
                    //      }
                    // }
               }
          }
          &.active{
               left: 0;
               top: 0;
          }
     }

}
</style>