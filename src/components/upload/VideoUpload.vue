<template>
     <div class="upload">
          <div class="upload-send" @click="sendVideo()">
               <font-awesome-icon icon="fa fa-angle-right" />
          </div>
          <div class="upload-background">
               <video :src="videoPreview" alt="The choosed video to upload." autoplay="false"></video>
          </div>
          <div class="upload-menu">
               <div class="upload-menu__list" v-if="selectedMenu === '' && !descriptionOpened">
                    <div class="upload-menu__list-item" v-for="item in menu" :key="item.text">
                         <div class="upload-menu__list-item-title" @click="selectContent(item.menu)">
                              <div class="upload-menu__list-item-title-icon" v-if="item.icon">
                                   <font-awesome-icon :icon="item.icon" />
                              </div>
                              <div class="upload-menu__list-item-title-text">
                                   {{item.text}}                         
                              </div>

                         </div>
                    </div>
               </div>
               <div class="description" v-if="descriptionOpened">
                    <div class="description-title">
                         Hier kannst Du eine Beschreibung hinzufügen:
                    </div>
                    <div class="description-input">
                         <input type="text" v-model="videoDescription">
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
     data(){
          return{
               menu: [{text: 'In die Community hochladen und mit anderen teilen.', menu: 'category', icon: 'fa-solid fa-cloud'}, {text: 'Direkt an die FERNFAHRER-Redaktion schicken.', menu: 'mail', icon: 'fa-solid fa-envelope'}],
               videoPreview: '',
               selectedMenu: '',
               descriptionOpened: false,
               videoDescription: '',
               videoData: null,
          }
     },
     methods:{
          setPreviewUrl(){
               this.videoPreview = URL.createObjectURL(this.video);
          },
          selectContent(name){
               this.selectedMenu = name;
               this.descriptionOpened = true;
          },
          async sendVideo(){
               this.videoData = new FormData();
               this.videoData.append('video', this.video);

               if(this.descriptionOpened && this.videoDescription.length > 0){
                    if(this.selectedMenu === 'category'){
                         axios.post(this.apiUrl + 'uploadVideo', this.videoData, {params: {user_id: this.currentUser.id, description: this.videoDescription}}).then(res => {
                              console.log(res);
                              this.$router.push({name: 'Start'});
                              URL.revokeObjectURL(this.videoPreview);
                         });
                    }
                    else{
                         axios.post(this.apiUrl + 'uploadVideo', this.videoData, {params: {user_id: this.currentUser.id, description: this.videoDescription}}).then(res => {
                              console.log(res);
                              this.$router.push({name: 'Start'});
                              URL.revokeObjectURL(this.videoPreview);
                         });
                    }
               }
          }
     },
     mounted(){
          if(this.video){
               this.setPreviewUrl();
               console.log(this.video);
          }
          else{
               this.$router.push({name: 'Start'});
          }
     },
     computed:{
          ...mapState({
               video: state => state.fileName,
               currentUser: state => state.userModule.currentUser,
               apiUrl: state => state.url
          })
     },
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.upload{
     margin-top: 50px;
     position: relative;
     font-family: $f-roboto;
     height: calc(100vh - 50px);
     overflow: hidden;
     &-send{
          position: fixed;
          background-color: red;
          top: 10px;
          right: 10px;
          padding: 2px;
          padding-right: 0;
          width: 30px;
          margin: auto;
          z-index: 99999;
          cursor: pointer;
          font-size: 20px;
     }
     &-background{
          width: 100%;
          position: absolute;
          z-index: 0;
          video{
               height: 100vh;
               width: 100%;
               object-position: center;
               object-fit: cover;
          }
     }
     &-menu{
          position: absolute;
          height: fit-content;
          width: fit-content;
          overflow-y: scroll;
          max-height: 80vh;
          background-color: rgba(0, 0, 0, 0.712);
          padding: 10px;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 80%;
          &__list{
               cursor: pointer;
               &-item-title{
                    display: flex;
                    align-items: center;
                    margin: 10px 0px;
                    background-color: white;
                    color: black;
                    &-icon{
                         background-color: red;
                         color: white;
                         font-size: 32px;
                         max-height: 32px;
                         padding: 5px;
                         .fa-cloud{
                              width: 32px;
                         }
                    }
                    &-text{
                         padding: 0px 5px;
                         color: black;
                         text-align: left;
                         font-size: 14px;
                         font-weight: 600;
                    }
               }
          }
          .dropdown__list{
               &-title{
                    display: flex;
                    align-items: center;
                    background-color: white;
                    color: black;
                    margin-bottom: 10px;
                    &-icon{
                         background-color: red;
                         color: white;
                         font-size: 32px;
                         max-height: 32px;
                         padding: 5px;
                         .fa-cloud{
                              width: 32px;
                         }
                    }
                    &-text{
                         padding: 0px 5px;
                         color: black;
                         text-align: left;
                         font-size: 14px;
                         font-weight: 600;
                    }
               }
               &-item{
                    background-color: white;
                    text-align: left;
                    font-size: 14px;
                    color: black;
                    padding: 10px 5px;
                    margin: 5px 0px;
                    cursor: pointer;
                    &.active{
                         background-color: red;
                         color: white;
                    }
               }
          }
     }
}
</style>

