<template>
     <div class="video">
          <!-- {{videoData.id}} -->
          <div class="wrapper">
               <div class="video-player">
                    <video class="video-player__video" :src="dataUrl + videoData.video_url" controls :poster="dataUrl + videoData.image_url"></video>
                    <!-- <button class="video-player__pagination prev" @click="lowerVideoController">
                         <font-awesome-icon :icon="['fa', 'fa-angle-left']" />
                    </button>
                    <button class="video-player__pagination next" @click="upperVideoController">
                         <font-awesome-icon :icon="['fa', 'fa-angle-right']" />
                    </button> -->
               </div>
               <div class="video-info">
                    <div class="video-info__bar">
                         <div class="video-info__bar-left">
                              <div class="video-info__bar-left-top" v-if="videoData.user != undefined">
                                   {{videoData.user.username}}
                              </div>
                              <div class="video-info__bar-left-bottom">
                                   <div class="like" @click="sendLike">
                                        <div class="like-icon" :class="{liked: liked}">
                                             <font-awesome-icon :icon="['fas', 'fa-heart']" />
                                        </div>
                                        <div class="like-number">
                                             {{videoData.numberOfLikes}}
                                        </div>
                                   </div>
                                   <div class="date">
                                        <div class="date-icon">
                                             <font-awesome-icon :icon="['fas', 'fa-clock']" />                                        
                                        </div>
                                        {{videoData.uploaded}} Tage
                                   </div>
                              </div>
                         </div>
                         <div class="video-info__bar-right">
                              <font-awesome-icon :icon="['fas', 'fa-share']" />
                         </div>
                    </div>
                    <div class="video-info__description" v-if="videoData.description != ''">
                         {{videoData.description}}
                    </div>
               </div>
               <div class="video-comment" v-if="!loggedIn">
                    <div class="video-comment__left">
                         Neueste Kommentare
                    </div>
                    <div class="vide-comment_right">
                         Kommentieren
                    </div>
               </div>
               <div class="video-comment__list none" v-if="videoData.comment === undefined">
                    Es gibt noch keine Kommentare!
               </div>
          </div>
           <div class="push-notification" v-if="pushNotification">
               <div class="push-notification__title">
                    Reporter
               </div>
               <div class="push-notification__description">
                    Bitte melde dich an!
               </div>
               <div class="push-notification__button">
                    <div class="push-notification__button-close" @click="closePush">
                         Abrechen
                    </div>
                    <div class="push-notification__button-login" @click="pushLogin">
                         Anmelden
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';


export default {
     data(){
          return{
               loggedIn: false,
               liked: false,
               currentUserLiked: [],
               pushNotification: false
          }
     },
     methods:{
          ...mapActions([
               'getVideo',
               'checkLoggedIn'
          ]),
          getId(){
               console.log(this.$route.params.id);
          },
          lowerVideoController(){
               // this.$route.params.id -= 1;
               // this.getVideo(this.$route.params.id);
               var currentId = this.$route.params.id -= 1;
               this.$router.push({name: 'Video view', params: {id: currentId}});
               this.getVideo(this.$route.params.id);
          },
          upperVideoController(){
               var currentId = this.$route.params.id += 1;
               this.$router.push({name: 'Video view', params: {id: currentId}});
               this.getVideo(this.$route.params.id);
          },
          closePush(){
               this.pushNotification = false;
          },
          pushLogin(){
               this.$router.push({name: 'Anmeldung'});
          },
          async getCurrentUserFavourite(){
               axios.get(this.apiUrl + 'getFavouriteVideos', {params: {user_id: this.currentUser.id}}).then( res => {
                    if(res.data.error.code){
                         console.log('error');
                    }
                    else{
                         this.currentUserLiked = res.data.data.videos;
                         this.checkUserLiked();
                    }
                    console.log(this.liked);
               })
          },
          checkUserLiked(){
               console.log('liked: ', this.currentUserLiked);
               for(let i = 0; i < this.currentUserLiked.length; i++){
                    if(this.currentUserLiked[i].id === this.videoData.id){
                         this.liked = true;
                         
                    }
               }
          },
          sendLike(){
               if(Object.keys(this.currentUser).length != 0){
                    if(!this.liked){
                         axios.get(this.apiUrl + 'likeVideo', {params: {user_id: this.currentUser.id, id: this.videoData.id}}).then( res => {
                              console.log('like', res);
                              this.liked = true;
                              this.videoData.numberOfLikes += 1;
                         })
                    }
                    else{
                         axios.get(this.apiUrl + 'unlikeVideo', {params: {user_id: this.currentUser.id, id: this.videoData.id}}).then( res => {
                              console.log('unlike', res);
                              this.liked = false;
                              this.videoData.numberOfLikes -= 1;
                         })
                    }
               }
               else{
                    this.pushNotification = true;
               }
          }
     },
     mounted(){
          this.getVideo(this.$route.params.id);
          this.checkLoggedIn();
          if(this.currentUser != {}){
               setTimeout(() => {
                    this.getCurrentUserFavourite();
               }, 500);
          }
     },
     computed:{
          ...mapState({
               videoData: state => state.viewModule.video,
               dataUrl: state => state.dataUrl,
               apiUrl: state => state.url,
               currentUser: state => state.userModule.currentUser
          }),
     }

}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$icon-size: 20px;

button{
     margin-top: 50px;
}
.video{
     margin-top: 50px;
     font-family: $f-poppins;
     &-player{
          position: relative;
          &__video{
               max-height: 600px;
               width: 100%;
               @media only screen and (max-width: 560px) {
                    object-fit: cover;
               }

          }
          &__pagination{
               position: absolute;
               background-color: transparent;
               color: $c-theme;
               padding: 10px 10px;
               font-size: 24px;
               top: 0;
               bottom: 0;
               height: fit-content;
               margin: auto;
               cursor: pointer;
               &.prev{
                    left: 0;
               }
               &.next{
                    right: 0;
               }
          }

     }
     &-info{
          font-family: $f-poppins;
          padding: 0px 10px;
          background-color: black;
          margin-top: -7px;
          &__bar{
               display: flex;
               justify-content: space-between;
               align-items: center;
               &-left{
                    display: flex;
                    flex-direction: column;
                    &-top{
                         color: #1766cf;
                         font-weight: 600;
                         font-size: 16px;
                         text-align: left;
                    }
                    &-bottom{
                         display: flex;
                         .like{
                              display: flex;
                              margin-right: 10px;
                              &-icon{
                                   margin-right: 5px;
                                   &.liked{
                                        color: $c-theme;
                                   }
                              }
                         }
                         .date{
                              display: flex;
                              &-icon{
                                   margin-right: 5px;
                              }
                         }
                    }
               }
          }
          &__description{
               text-align: left;
          }
          
     }
     &-comment{
          display: flex;
          justify-content: space-between;
          background-color: #2c3138;
          color: #1766cf;
          padding: 0px 10px;
          &__left{
               font-weight: 600;
          }
     }
     &-comment__list.none{
          padding: 50px 0px;
     }
}
.push-notification{
     width: 300px;
     &__description{
          margin: 20px 0px;
     }
     &__button{
          display: flex;
          justify-content: space-between;
     }
}
</style>