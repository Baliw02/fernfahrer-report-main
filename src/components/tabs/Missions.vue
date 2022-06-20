<template>
     <div class="tabs-content__mission">
          <div class="tabs-content__block" v-for="(mission, index) in missions" :key="index" @click="selectContent(mission.id)">
               <div class="tabs-content__block-image">
                    <img :src="dataUrl + mission.lead_image" :alt="mission.lead_text + 'image'">
                    <div class="tabs-content__block-image-text">
                         <div class="title">
                              {{mission.title}}
                         </div>
                         <div class="date">
                              {{mission.mission_end_labal}}
                         </div>
                    </div>
               </div>
               <div class="tabs-content__block-description">
                    {{mission.lead_text.substring(0, 107) + '...'}}
               </div>
          </div>
     </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
     data(){
          return{

          }
     },
     methods:{
          selectContent(id){
               this.$router.push({name: 'Mission view', params: {id: id}});
          },
          ...mapActions([
               'getMissions'
          ])
     },
     computed:{
          ...mapState({
               missions: state => state.homeModule.missions,

               apiUrl: state => state.url,
               dataUrl: state => state.dataUrl,
               windowWidth: state => state.windowWidth,
               selectedTab: state => state.selectedTab,

          })
     },
     mounted(){
          this.getMissions();
     }
}
</script>

<style lang="scss" scoped>
.tabs-content__mission{
     color: white;
}
</style>
