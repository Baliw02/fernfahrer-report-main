<template>
     <div class="tabs-outline">
          <div class="tabs-content" :class="{load: contentLoading}">
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
          <div class="loading-spinner" v-if="contentLoading"></div>
     </div>
</template>
<script>
import {mapState} from 'vuex';
import axios from 'axios';

export default {
     components:{
     },
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
               waitType: false
          }
     },
     methods:{
          getImages(searchKey){
               axios.get(this.apiUrl + 'search', {params: {for: 'images', searchString: searchKey}}).then( res => {
                    if(res.data.data.images.length != 0){
                         this.contentLoading = true;
                    }
                    if(res.status === 200){
                         console.log('images at get: ', this.images);
                         this.images = res.data.data.images;
                         this.setThreeColumnImages();
                         this.setTwoColumnImages();          
                         this.columnController();
                         this.contentLoading = false;                              
                    }
               });
          },
          setThreeColumnImages(){
               this.imagesLeft = [];
               this.imagesCenter = [];
               this.imagesRight = [];
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
                    for( var i = 0; i + 1 < this.images.length; i++){
                         if(i % 2 === 0){
                              this.twoImagesLeft.push(this.images[i]);
                         }
                         else{
                              this.twoImagesRight.push(this.images[i]);
                         }
                    }
               }, 200)
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
     },
     created(){
          window.addEventListener('resize', this.columnController);
          this.columnController();
     },
     mounted(){
          this.getImages(this.searchText);
     },
     watch:{
          searchText(){
               this.contentLoading = true;
               this.images.length = 0;
               if(!this.waitType){
                    setTimeout(() => {
                         console.log(this.searchText);
                         this.images.length = 0;
                         this.getImages(this.searchText);
                         this.waitType = false;
                    }, 1000) 
               }
               this.waitType = true;
          }
     },
     computed:{
          ...mapState({
               apiUrl: state => state.url,
               dataUrl: state => state.dataUrl,
               windowWidth: state => state.windowWidth,
               selectedTab: state => state.selectedTab,
               searchText: state => state.searchText,
          }),

     }
}
</script>

<style lang="scss" scoped>
.tabs-outline{
     .loading-spinner{
          top: 0;
          bottom: 0;
          margin: auto;
     }
}
</style>