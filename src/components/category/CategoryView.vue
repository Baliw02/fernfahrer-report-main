<template>
    <div class="category">
        <div class="category-hero">
               <div class="category-hero__image">
                    <img :src="dataUrl + categoryData.lead_image" :alt="categoryData.lead_text">
                    <div class="category-hero__image-text">
                         <div class="category-hero__image-text-title">
                              {{categoryData.title}}
                         </div>
                    </div>
                    
               </div>
          </div>
          <div class="category-content">
               <div class="category-content__column" >
                    <div class="category-content__images" v-for="(image, index) in leftColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
               <div class="category-content__column" v-if="windowWidth >= 960">
                    <div class="category-content__images center" v-for="(image, index) in centerColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
               <div class="category-content__column">
                    <div class="category-content__images" v-for="(image, index) in rightColumn" :key="index" @click="selectContent(image.id)">
                         <img :src="dataUrl + image.thumb_w300" :alt="image.description + 'image'" v-if="windowWidth > 600">
                         <img :src="dataUrl + image.thumb_w200" :alt="image.description + 'image'" v-else>
                    </div>
               </div>
          </div>
          <div class="loading-spinner" v-if="contentLoading"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';


export default {
     data(){
          return{
               loggedIn: false,
               leftColumn: [],
               centerColumn: [],
               rightColumn: [],

               categoryData: {},

               images: [],
               imagesLeft: [],
               imagesCenter: [],
               imagesRight: [],
               twoImagesLeft: [],
               twoImagesRight: [],

               chunks: 0,
               limiter: 9,

               categoryLoaded: false,

               contentLoading: false
          }
     },
     methods:{
          async getImages(){
               let routeId = this.$route.params.id;
               await axios.get(this.apiUrl + 'getCategory', {params:{id: routeId, limit: this.limiter, from: this.chunks}}).then( res => {
                    if(!this.categoryLoaded){
                         this.categoryData = res.data.data;
                         this.categoryLoaded = true;
                    }
                    if(res.data.data.images != undefined){
                         if(res.data.data.images.length != 0){
                              this.contentLoading = true;
                         }
                         if(res.status === 200 && res.data.data.images.length != 0){
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
               this.chunks += 9;
               this.limiter += 0;
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
                    for( var i = 0; i + 1 < this.images.length; i++){
                         if(i % 2 == 0){
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
          this.setTabContent();
     },
     computed:{
          ...mapState({
               dataUrl: state => state.dataUrl,
               apiUrl: state => state.url,
               windowWidth: state => state.windowWidth,

          }),
     }

}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.category{
     margin-top: 50px;
     width: 100%;
     &-hero{
          &__image{
               position: relative;
               img{
                    width: 100%;
                    max-height: 60vh;
                    object-fit: cover;
               }
               &-text{
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: calc(100% - 20px);
                    left: 10px;
                    bottom: 10px;
                    z-index: 99;
                    &-title{
                         font-family: $f-roboto;
                         font-size: 24px;
                         font-weight: 600;
                         margin-bottom: 10px;
                         width: fit-content;
                         text-shadow: 2px 2px 2px #000000;
                    }
               }
          }
     }
     &-content{
          display: flex;
          flex-wrap: no-wrap;
          justify-content: center;
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
}
</style>