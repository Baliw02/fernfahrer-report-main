<template>
     <div class="upload">
          <div class="upload-bar" @click="pushUpload">
               <div class="upload-bar__circle">
                    <div class="upload-bar__circle-icon">
                         <font-awesome-icon :icon="['fas', 'fa-circle-plus']" />
                    </div>
               </div>
          </div>
          <div class="upload-block" v-if="uploadOpened">
               <input type="file" accept="image/*" capture id="image-camera" ref="image_camera" @change="handleImage">
               <label for="image-camera">Nimm ein Bild auf</label>
               <input type="file" accept="image/*" id="image">
               <label for="image">Bilder durchsuchen</label>
               <input type="file" accept="video/mp4,video/x-m4v,video/*" capture id="video-camera">
               <label for="video-camera">Nimm ein Video auf</label>
               <input type="file" accept="video/mp4,video/x-m4v,video/*" id="video">
               <label for="video">Videos durchsuchen</label>
          </div>
     </div>
</template>

<script>
export default {
     data(){
          return{
               uploadOpened: false
          }
     },
     methods:{
          pushUpload(){
               if(!this.uploadOpened){
                    this.uploadOpened = true;
               }
               else{
                    this.uploadOpened = false;
               }
          },
          handleImage(){
               console.log(this.$refs.image_camera.files[0]);
          }
     }
}
</script>

<style lang="scss" scoped>
.upload{
     &-bar{
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.247);
          position: fixed;
          width: 100%;
          height: 55px;
          bottom: 0;
          z-index: 9999;
          cursor: pointer;
          
          &__circle{
               text-align: center;
               &-icon{
                    width: fit-content;
                    max-height: 30px;
                    border: 1px solid white;
                    border-radius: 100%;
                    padding: 5px;
                    font-size: 30px;
               }
          }
     }
     &-block{
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: fit-content;
          width: 100%;
          background-color: white;
          color: black;
          margin: auto;
          z-index: 99999;
          padding: 10px;
          text-align: left;
          max-width: 280px;
          input[type="file"]{
               display: none;               
          }
          label{
               padding: 10px;
               cursor: pointer;
          }
     }
}
</style>