<template>
  <div id="app">
    <SideBar />
    <router-view :key="$route.fullPath"></router-view>
     <UploadBar />
    <!-- {{home}}
    <a @click="printHello()">asd</a> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SideBar from './components/components/SideBar.vue';
import UploadBar from './components/components/UploadBar.vue';
export default {
     name: 'App',
     components: {
          SideBar,
          UploadBar
     },
     created(){
          window.addEventListener('resize', this.handleResize);
          this.handleResize();
     },
     mounted(){
          this.checkLoggedIn();
          setTimeout(() => {
               console.log(this.loggedIn);
          }, 300)
     },
     methods:{
          ...mapActions([
               'checkLoggedIn',
          ]),
          handleResize(){
               this.windowWidthValue = window.innerWidth;
          }

     },
     computed:{
          ...mapState({
               loggedIn: state => state.userModule.loggedIn
          }),
          windowWidthValue: {
               get() {return this.$store.state.windowWidth},
               set( value ) {this.$store.commit('setWindowWidth', value);}
          }
     },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;
#app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: white;
     margin: 0;
     background-color: black;    
}
html, body{
     margin: 0;
     background-color: black;
}
.wrapper{
     max-width: 1200px;
     margin: auto;
     width: 100%;
}
button{
     background-color: $c-theme;
     color: white;
     font-family: Roboto;
     font-weight: 600;
     font-size: 16px;
     padding: 5px 20px;
     width: fit-content;
     border: none;
     margin: 0;
     cursor: pointer;
}
input:not(input[type='checkbox']){
     width: calc(100% - 24px);
     max-width: 320px;
     padding: 10px 10px;
     margin-bottom: 10px;
     font-family: $f-roboto;
     font-size: 16px;
}
select{
     width: calc(100%);
     padding: 10px 10px;
     margin-bottom: 10px;
     font-family: $f-roboto;
     font-size: 16px;
}
.login, .register{
    padding: 50px 10px;
     &-block{
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          height: fit-content;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          max-width: calc(320px + 24px);
          padding: 0px 10px;
          @media only screen and (max-width: 600px) {
               position: static;
               margin-top: 100px;
          }
          &__logo{
               margin-bottom: 10px;
               img{
                    width: 100%;
               }
          }
          &__form{
               max-width: calc(320px + 24px);
               &-info{
                    display: flex;
                    justify-content: space-between;
                    text-align: left;
                    margin-bottom: 10px;
                    &-image{
                         width: fit-content;
                         img{
                         width: 90px;
                         }
                    }
               }
               &-contract{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: baseline;
                    margin-bottom: 10px;
                    &-check{
                         input{
                              background: black;
                              border: 2px solid white;
                              position: relative;
                              &::before{
                                   transition: all .1s linear;
                                   content: '';
                                   position: absolute;
                                   background-color: black;
                                   border: 1px solid white;
                                   width: 13px;
                                   height: 13px;
                              }
                              &:checked{
                                   &::before{
                                        content: '\2713';
                                        text-align: center;
                                        font-size: 10px;
                                        background-color: white;
                                        color: black;
                                   }
                              }
                         }
                    }
                    &-text{
                         text-align: left;
                         margin-left: 10px;
                    }
               }
               &-bottom{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    text-align: right;
                    &-options{
                         text-align: left;
                         text-decoration: underline;
                         font-size: 14px;
                         &-password{
                              &:hover{
                                   cursor: pointer;
                              }
                         }
                         &-register{
                              &:hover{
                                   cursor: pointer;
                              }
                         }
                    }

               }
          }
          
     }
}
.tabs{
     &-content{
          display: flex;
          flex-wrap: no-wrap;
          justify-content: center;
          transition: all .1s linear;
          @media only screen and (max-width: 960px) {
               flex-wrap: no-wrap;
          }
          &__images{
               display: flex;
               width: fit-content;
               height: fit-content;
               padding: 0;
               margin: 10px;
               cursor: pointer;
               transition: all .1s linear;
               
               img{
                    object-fit: cover;
                    width: 100%;
                    max-height: 100%;
               }
               &.center{
                    margin: 10px 0px;
               }
               &:hover{
                    filter: brightness(70%);
               }
               @media only screen and (max-width: 960px) {
                    margin: 0;
               }
          }
     }
     &-content.load{
          filter: brightness(50%);
          touch-action: none;
          pointer-events: none;
     }
     &-content__mission, &-content__categories{
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: auto;
          font-family: $f-roboto;
          .tabs-content__block{
               max-width: calc(50% - 20px);
               margin: 10px 10px;
               cursor: pointer;
               @media only screen and (max-width: 646px) {
                    max-width: 100%;
                    margin: 0;
               }
               &-image{
                    position: relative;
                    img{
                         width: 100%;
                    }
                    &-text{
                         display: flex;
                         justify-content: space-between;
                         width: calc(100% - 20px);
                         position: absolute;
                         text-align: left;
                         z-index: 99;
                         margin: auto;
                         bottom: 10px;
                         padding: 0px 10px;
                         font-size: 20px;
                    }
               }
               &-description{
                    text-align: left;
                    padding: 0px 10px;
                    font-size: 14px;
               }
          }
     }
}
.loading-spinner{
     position: fixed;
     width: 32px;
     height: 32px;
     bottom: 15px;
     top: 0;
     bottom: 0;
     left: 0; 
     right:0;
     margin: auto;
     background-color: transparent;
     border-radius: 100%;
     border-color: rgb(243, 58, 33) rgb(0, 0, 0) rgb(0, 0, 0);
     border-style: solid;
     border-width: 3px;
     border-image: none 100% / 1 / 0 stretch;
     animation: spin infinite 1s;
}
@keyframes spin {
     from {transform: rotate(0deg)};
     to {transform: rotate(360deg)};
}
.tabs{
     background-color: black;
     color: white;
     font-family: $f-roboto;
     margin-top: -5px;
     &-bar{
          display: flex;
          overflow-x: auto;
          @media only screen and (min-width: 560px) {
               justify-content: center;
          }
          &__title{
               padding: 10px 10px;
               position: relative;
               cursor: pointer;
               text-transform: capitalize;
               &::after{
                    transition: all .1s linear;
                    position: absolute;
                    content: '';
                    background-color: $c-theme;
                    width: 0;
                    height: 3px;
                    bottom: 0px;
                    left: 0;
                    border-radius: 2px;
               }
               &.active{
                    position: relative;
                    &::after{
                         width: 100%;
                    }
               }

          }
     }
     
}
.push-notification{
    position: absolute;
    background-color: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: fit-content;
    width: fit-content;
    margin: auto;
    color: black;
    text-align: right;
    padding: 10px 10px; 
    &__title, &__description{
        text-align: left;
    }
    &__description{
        color: grey;
    }
    &__button{
        background-color: white;
        color: $c-theme;
        cursor: pointer;
    }
}
</style>
