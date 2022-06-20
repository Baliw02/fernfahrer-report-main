<template>
     <div class="tabs">
          <div class="tabs-bar">
               <div class="tabs-bar__title" v-for="(tab, index) in tabs" :key="index" :class="{active: selectedTab === index}" @click="selectTab(index)">
                    {{tab}}
               </div>
          </div>
          <div class="tabs-content" v-if="selectedTab === 0">
               <LatestImages />
          </div>
          <div class="tabs-content" v-if="selectedTab === 1">
               <PopularImages />
          </div>
          <div class="tabs-content" v-if="selectedTab === 2">
               <BestImages />
          </div>
          <div class="tabs-content" v-if="selectedTab === 5">
               <BoughtImages />
          </div>
          
          <div class="tabs-content" v-if="selectedTab === 6">
               <Videos />
          </div>
          <div class="tabs-content__mission" v-if="selectedTab === 3">
               <Missions />
          </div>
          <div class="tabs-content__categories" v-if="selectedTab === 4">
               <Categories />
          </div>
     </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
     components:{
          LatestImages: () => import('./LatestImages.vue'),
          PopularImages: () => import('./PopularImages.vue'),
          BestImages: () => import('./BestImages.vue'),
          BoughtImages: () => import('./BoughtImages.vue'),
          Videos: () => import('./Videos.vue'),
          Missions: () => import('./Missions.vue'),
          Categories: () => import('./Categories.vue')
     },
     data(){
          return{
               tabs:['Neueste', 'Trends', 'Beste', 'Auftrage', 'Rubriken', 'Gekauft', 'Videos'],
               
               leftColumn: this.threeLatestImagesLeft,
               centerColumn: this.threeLatestImagesCenter,
               rightColumn: this.threeLatestImagesRight,
          }
     },
     methods:{
          ...mapMutations([
               'setSelectedTab'
          ]),
          selectTab(index){
               this.setSelectedTab(index);
          },
          selectContent(id){
               console.log(id);
               this.$router.push({name: 'Category view', params: {id: id}});
          },
          
     },
     computed:{
          ...mapState({
               missions: state => state.homeModule.missions,
               categories: state => state.homeModule.categories,

               apiUrl: state => state.url,
               dataUrl: state => state.dataUrl,
               windowWidth: state => state.windowWidth,
               selectedTab: state => state.selectedTab,

          }),
     },
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
    height: 0;
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: transparent;
    height: 0;
    width: 0;
}


</style>