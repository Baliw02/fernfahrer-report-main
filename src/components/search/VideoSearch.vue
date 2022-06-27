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

               videos: [],
               videosLeft: [],
               videosCenter: [],
               videosRight: [],
               twoVideosLeft: [],
               twoVideosRight: [],

               chunks: 0,
               limiter: 15,

               contentLoading: false,
               waitType: false,
               firstLazyLoad: true
          }
     },
     methods:{
          resetAllColumns(){
               this.videos = [];
               this.videosLeft = [];
               this.videosCenter = [];
               this.videosRight = [];
               this.twoVideosLeft = [];
               this.twoVideosRight = [];
          },
          getVideos(searchKey){
               if(this.searchText != ''){
                    window.removeEventListener('scroll', this.lazyLoadController);
                    axios.get(this.apiUrl + 'search', {params: {for: 'videos', searchString: searchKey}}).then( res => {
                         if(res.data.data.videos.length != 0){
                              this.contentLoading = true;
                         }
                         if(res.status === 200){
                              console.log('videos at get: ', this.videos);
                              this.videos = res.data.data.videos;
                              this.setThreeColumnVideos();
                              this.setTwoColumnVideos();          
                              this.columnController();
                              this.contentLoading = false;                              
                              this.firstLazyLoad = true;
                         }
                    });
               }
               else{
                    window.addEventListener('scroll', this.lazyLoadController);
                    if(this.firstLazyLoad){
                         this.firstLazyLoad = false;
                         this.resetAllColumns();
                         this.chunks = 0;
                         console.log('belement');
                         axios.get(this.apiUrl + 'getVideos', {params:{limit: this.limiter, from: this.chunks}}).then( res => {
                              if(res.data.data.videos.length != 0){
                                   this.contentLoading = true;
                              }
                              console.log('ide is')
                              if(res.status === 200){
                                   console.log(res.headers);
                                   this.videos = [...res.data.data.videos];
                                   this.firstLazyLoad = false;
                                   setTimeout(() => {
                                        this.setThreeLazyColumnVideos();
                                        this.setTwoLazyColumnVideos();          
                                        this.lazyLoadLimiter();
                                        this.contentLoading = false;
                                   }, 200);
                              }
                         });
                         this.columnController();
                    }
                    else{
                         axios.get(this.apiUrl + 'getVideos', {params:{limit: this.limiter, from: this.chunks}}).then( res => {
                              if(res.data.data.videos.length != 0){
                                   this.contentLoading = true;
                              }
                              if(res.status === 200){
                                   console.log(res.headers);
                                   this.videos = [...res.data.data.videos];
                                   setTimeout(() => {
                                        this.setThreeLazyColumnVideos();
                                        this.setTwoLazyColumnVideos();          
                                        this.lazyLoadLimiter();
                                        this.contentLoading = false;
                                   }, 200);
                              }
                         });

                    }
               }
               
          },
          getLazyVideos(){
               axios.get(this.apiUrl + 'getVideos', {params:{limit: this.limiter, from: this.chunks}}).then( res => {
                    if(res.data.data.videos.length != 0){
                         this.contentLoading = true;
                    }
                    if(res.status === 200){
                         console.log(res.headers);
                         this.videos = [...res.data.data.videos];
                         setTimeout(() => {
                              this.setThreeLazyColumnVideos();
                              this.setTwoLazyColumnVideos();          
                              this.lazyLoadLimiter();
                              this.contentLoading = false;
                         }, 200);
                    }
               });
          },
          async lazyLoadLimiter(){
               this.chunks += 15;
          },
          setThreeColumnVideos(){
               this.videosLeft = [];
               this.videosCenter = [];
               this.videosRight = [];
               setTimeout(() => {
                    for( var i = 0; i + 1 <= this.videos.length; i+=3 ){
                         this.videosLeft.push(this.videos[i]);
                    }
                    for( var j = 1; j + 1 <= this.videos.length; j+=3 ){
                         this.videosCenter.push(this.videos[j]);
                    }
                    for( var k = 2; k + 1 <= this.videos.length; k+=3 ){
                         this.videosRight.push(this.videos[k]);
                    }
               }, 200)
          },
          setThreeLazyColumnVideos(){
               setTimeout(() => {
                    for( var i = 0; i + 1 <= this.videos.length; i+=3 ){
                         this.videosLeft.push(this.videos[i]);
                    }
                    for( var j = 1; j + 1 <= this.videos.length; j+=3 ){
                         this.videosCenter.push(this.videos[j]);
                    }
                    for( var k = 2; k + 1 <= this.videos.length; k+=3 ){
                         this.videosRight.push(this.videos[k]);
                    }
               }, 200)
          },
          setTwoColumnVideos(){
               this.twoVideosLeft = [];
               this.twoVideosRight = [];
               setTimeout(() => {
                    for( var i = 0; i < this.videos.length; i++){
                         if(i % 2 === 0){
                              this.twoVideosLeft.push(this.videos[i]);
                         }
                         else{
                              this.twoVideosRight.push(this.videos[i]);
                         }
                    }
               }, 200)
          },
          setTwoLazyColumnVideos(){
               setTimeout(() => {
                    for( var i = 0; i < this.videos.length; i++){
                         if(i % 2 === 0){
                              this.twoVideosLeft.push(this.videos[i]);
                         }
                         else{
                              this.twoVideosRight.push(this.videos[i]);
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
                         this.leftColumn = this.videosLeft;
                         this.centerColumn = this.videosCenter;
                         this.rightColumn = this.videosRight;
                    }                    
                    else{
                         this.leftColumn = this.twoVideosLeft;
                         this.rightColumn = this.twoVideosRight;
                    }

               }, 500)
          },
          columnController(){
               this.setTabContent();
          },
          selectContent(id){
               this.$router.push({name: 'Video view', params: {id: id}});
          },
          lazyLoadController(){
               let bottomWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
               if(bottomWindow){
                    this.getVideos();
               }
          },

     },
     created(){
          window.addEventListener('resize', this.columnController);
          window.addEventListener('scroll', this.lazyLoadController);
          this.columnController();
          console.log('mounted:', this.searchText)
     },
     mounted(){
          this.getVideos(this.searchText);
     },
     watch:{
          searchText(){
               this.videos.length = 0;
               this.contentLoading = true;
               this.videos.length = 0;
               if(!this.waitType){
                    setTimeout(() => {
                         console.log(this.searchText);
                         this.videos.length = 0;
                         this.getVideos(this.searchText);
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