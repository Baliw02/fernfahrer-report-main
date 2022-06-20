<template>
     <div class="tabs-outline">
          <div class="tabs-content" :class="{load: contentLoading}" v-if="!noContent">
               <div class="tabs-content__column" >
                    <div class="tabs-content__images" v-for="(image, index) in leftColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
               <div class="tabs-content__column" v-if="windowWidth >= 960">
                    <div class="tabs-content__images center" v-for="(image, index) in centerColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
               <div class="tabs-content__column">
                    <div class="tabs-content__images" v-for="(image, index) in rightColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
          </div>
          <div class="loading-spinner" v-if="contentLoading && !noContent"></div>
          <div class="tabs-no-content" v-if="noContent">Keine Inhalte vorhanden.</div>
     </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
     data(){
          return{
               leftColumn: [],
               centerColumn: [],
               rightColumn: [],

               images: [],
               imagesLeft: [],
               imagesCenter: [],
               imagesRight: [],
               twoImagesLeft: [],
               twoImagesRight: [],

               chunks: 0,
               limiter: 15,

               contentLoading: false,
               noContent: false
          }
     },
     methods:{
          async getImages(){
               var userId = this.$route.params.id;
               if(this.leftColumn.length === 0){
                    this.noContent = true;
               }
               await axios.get(this.apiUrl + 'getUploadedImages', {params:{user_id: userId, limit: this.limiter, from: this.chunks}}).then( res => {
                    if(res.data.data.images != undefined){
                         if(res.data.data.images.length != 0){
                              this.noContent = false;
                              this.contentLoading = true;
                         }
                         if(res.status === 200){
                              this.images = [...res.data.data.images];
                              setTimeout(() => {
                                   this.setThreeColumnImages();
                                   this.setTwoColumnImages();          
                                   this.lazyLoadLimiter();
                                   this.contentLoading = false;
                              }, 200);
                         }
                    }
               });
          },
          async lazyLoadLimiter(){
               this.chunks += 15;
          },
          setThreeColumnImages(){
               setTimeout(() => {
                    for( var i = 0; i + 1 <= this.images.length; i+=3 ){
                         this.imagesLeft.push(this.images[i]);
                    }
                    for( var j = 1; j + 1 <= this.images.length; j+=3 ){
                         this.imagesCenter.push(this.images[j]);
                    }
                    for( var k = 2; k + 1 <= this.images.length; k+=3 ){
                         this.imagesRight.push(this.images[k]);
                    }
               }, 200)
          },
          setTwoColumnImages(){
               setTimeout(() => {
                    for( var i = 0; i < this.images.length; i++){
                         if(i % 2 == 0){
                              this.twoImagesLeft.push(this.images[i]);
                         }
                         else{
                              this.twoImagesRight.push(this.images[i]);
                         }
                    }
               }, 200)
               // for( var j = 1; j + 1 <= this.bestImages.length; j += 2){
               //      this.twobestImagesRight.push(this.bestImages[j]);
               // }
          },
          setTabContent(){
               this.leftColumn = [];
               this.centerColumn = [];
               this.rightColumn = [];
               setTimeout(() => {
                    if(this.windowWidth >= 960){
                         this.leftColumn = this.imagesLeft;
                         this.centerColumn = this.imagesCenter;
                         this.rightColumn = this.imagesRight;
                    }                    
                    else{
                         this.leftColumn = this.twoImagesLeft;
                         this.rightColumn = this.twoImagesRight;
                    }

               }, 500)
          },
          columnController(){
               this.setTabContent();
          },
          selectContent(id){
               this.$router.push({name: 'Image view', params: {id: id}});
          },
          lazyLoadController(){
               let bottomWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
               if(bottomWindow){
                    this.getImages();
               }
          }
     },
     created(){
          window.addEventListener('resize', this.columnController);
          window.addEventListener('scroll', this.lazyLoadController);
          this.columnController();


     },
     mounted(){
          this.getImages();
          // this.lazyLoadController();
          this.setTabContent();
     },

     computed:{
          ...mapState({
               apiUrl: state => state.url,
               dataUrl: state => state.dataUrl,
               windowWidth: state => state.windowWidth,
               selectedTab: state => state.selectedTab,
          }),
     }
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.tabs-no-content{
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     width: fit-content;
     height: fit-content;
     margin: auto;
     font-family: $f-roboto;
}
</style>