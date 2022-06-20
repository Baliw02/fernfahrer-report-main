<template>
     <div class="image">
          <div class="image-options" v-if="currentUser.id === imageData.user_id" @click="pushOptions">
               <font-awesome-icon icon="fas fa-ellipsis-v" />
          </div>
          <div class="image-options__list" v-if="imageOptions">
               <div class="image-options__list-item">
                    <div class="image-options__list-item-delete">
                         Bearbeiten
                    </div>
                    <div class="image-options__list-item-delete" @click="pushDelete">
                         Löschen
                    </div>
               </div>
          </div>
          <div class="push-notification" v-if="pushDeleteNotification">
               <div class="push-notification__title">
                    Reporter
               </div>
               <div class="push-notification__description">
                    Bist du sicher, dass du dieses Video/Bild löschen möchtest?
               </div>
               <div class="push-notification__button">
                    <div class="push-notification__button-close" @click="deleteImage(imageData.id)">
                         Ja
                    </div>
                    <div class="push-notification__button-login" @click="closePush">
                         Nein
                    </div>
               </div>
          </div>
          <!-- {{imageData.id}} -->
          <div class="wrapper" :class="{outfocus: pushLoginNotification}">
               <div class="image-box">
                    <img class="image-box__image" :src="dataUrl + imageData.image_url">
                    <!-- <button class="image-player__pagination prev" @click="lowerimageController">
                         <font-awesome-icon :icon="['fa', 'fa-angle-left']" />
                    </button>
                    <button class="image-player__pagination next" @click="upperimageController">
                         <font-awesome-icon :icon="['fa', 'fa-angle-right']" />
                    </button> -->
               </div>
               <div class="image-info">
                    <div class="image-info__bar">
                         <div class="image-info__bar-left">
                              <div class="image-info__bar-left-top" v-if="imageData.user != undefined" @click="viewUserProfile(imageData.user.user_id)">
                                   {{imageData.user.username}}
                              </div>
                              <div class="image-info__bar-left-bottom">
                                   <div class="like" @click="sendLike">
                                        <div class="like-icon" :class="{liked: liked}">
                                             <font-awesome-icon :icon="['fa', 'fa-heart']" />
                                        </div>
                                        <div class="like-number">
                                             {{imageData.numberOfLikes}}
                                        </div>
                                   </div>
                                   <div class="date">
                                        <div class="date-icon">
                                             <font-awesome-icon :icon="['fas', 'fa-clock']" />                                        
                                        </div>
                                        {{imageData.uploadedHours}} Stunden
                                   </div>
                              </div>
                         </div>
                         <div class="image-info__bar-right">
                              <font-awesome-icon :icon="['fas', 'fa-share']" />
                         </div>
                    </div>
                    <div class="image-info__description" v-if="imageData.description != ''">
                         {{imageData.description}}
                    </div>
               </div>
               <div class="image-comment" v-if="!loggedIn">
                    <div class="image-comment__left">
                         Neueste Kommentare
                    </div>
                    <div class="image-comment_right">
                         Kommentieren
                    </div>
               </div>
               <div class="image-comment__list none" v-if="imageData.comment === undefined">
                    Es gibt noch keine Kommentare!
               </div>
          </div>
          <div class="push-notification" v-if="pushLoginNotification">
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
               currentUserLiked: [],
               liked: false,
               pushLoginNotification: false,
               pushDeleteNotification: false,
               imageOptions: false
          }
     },
     methods:{
          ...mapActions([
               'getImage',
               'checkLoggedIn'
          ]),
          pushOptions(){
               if(!this.imageOptions){
                    this.imageOptions = true;
               }
               else{
                    this.imageOptions = false;
               }
          },
          pushDelete(){
               if(!this.pushDeleteNotification){
                    this.pushLoginNotification = false;
                    this.pushDeleteNotification = true;
               }
               else{
                    this.pushDeleteNotification = false;
               }
          },
          getId(){
               console.log(this.$route.params.id);
          },
          viewUserProfile(userId){
               this.$router.push({name: 'Profil', params: {id: userId}});
          },
          closePush(){
               this.pushLoginNotification = false;
               this.pushDeleteNofication = false;
          },
          pushLogin(){
               this.$router.push({name: 'Anmeldung'});
          },
          async getCurrentUserFavourite(){
               axios.get(this.apiUrl + 'getFavouriteImages', {params: {user_id: this.currentUser.id}}).then( res => {
                    if(res.data.error.code){
                         console.log('error');
                    }
                    else{
                         this.currentUserLiked = res.data.data.images;
                         this.checkUserLiked();
                    }
                    console.log(this.liked);
               })
          },
          checkUserLiked(){
               console.log('liked: ', this.currentUserLiked);
               for(let i = 0; i < this.currentUserLiked.length; i++){
                    if(this.currentUserLiked[i].id === this.imageData.id){
                         this.liked = true;
                         
                    }
               }
          },
          sendLike(){
               if(Object.keys(this.currentUser).length != 0){
                    if(!this.liked){
                         axios.get(this.apiUrl + 'likeImage', {params: {user_id: this.currentUser.id, id: this.imageData.id}}).then( res => {
                              console.log('like', res);
                              this.liked = true;
                              this.imageData.numberOfLikes += 1;
                         })
                    }
                    else{
                         axios.get(this.apiUrl + 'unlikeImage', {params: {user_id: this.currentUser.id, id: this.imageData.id}}).then( res => {
                              console.log('unlike', res);
                              this.liked = false;
                              this.imageData.numberOfLikes -= 1;
                         })
                    }
               }
               else{
                    this.pushLoginNotification = true;
                    this.pushDeleteNotification = false;
               }
          },
          async deleteImage(){
               axios.get(this.apiUrl + 'deleteImage', {params: {id: this.imageData.id, user_id: this.currentUser.id}}).then( res => {
                    console.log(res);
                    this.$router.push('Start');
               })
          }
     },
     mounted(){
          this.getImage(this.$route.params.id);
          this.checkLoggedIn();
          if(this.currentUser != {}){
               setTimeout(() => {
                    this.getCurrentUserFavourite();
                    
               }, 500);
          }
     },
     computed:{
          ...mapState({
               imageData: state => state.viewModule.image,
               dataUrl: state => state.dataUrl,
               apiUrl: state => state.url,
               currentUser: state => state.userModule.currentUser
          }),
     }

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

button{
     margin-top: 50px;
}
.image{
     margin-top: 50px;
     font-family: $f-roboto;
     &-options{
          position: fixed;
          background-color: grey;
          top: 0;
          right: 0;
          padding: 10px;
          padding-right: 0;
          width: 30px;
          margin: auto;
          z-index: 99999;
          cursor: pointer;
          font-size: 20px;
     }
     &-options__list{
          position: fixed;
          background-color: white;
          color: black;
          z-index: 999999;
          top: 45px;
          right: 0;
          text-align: left;
          border-radius: 3px;
          &-item{
               &-delete{
                    padding: 10px 0px;
                    padding-right: 60px;
                    padding-left: 10px;
                    cursor: pointer;
               }
          }
     }
     .wrapper{
          transition: all .1s linear;
          &.outfocus{
               filter: brightness(50%);
          }
     }
     &-box{
          position: relative;
          &__image{
               height: 100%;
               max-height: 600px;
               width: 100%;
               object-fit: contain;
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
          font-family: $f-roboto;
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
                         cursor: pointer;
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
