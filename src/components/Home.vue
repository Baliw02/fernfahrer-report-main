<template>
     <div class="home">
               <div class="home-carousel">
                    <Hero />
               </div>
          <div class="wrapper">
               <div class="home-tabs">
                    <Tabs />
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
     components:{
          Hero: () => import('./components/Hero'),
          Tabs: () => import('./tabs/Tabs')
     },
     methods:{
          ...mapActions([
               'getMissions',
               'getCategories',
          ]),
     },
     mounted(){
          this.getMissions();
          this.getCategories();
     },
     computed:{
          ...mapState({
               selectedTab: state => state.selectedTab,
          })
     },
}
</script>

<style scoped lang="scss">
.home{
     &-carousel{
          img{
               width: 100%;
               height: 80vh;
               object-fit: cover;
               object-position: top;
          }
     }
     min-height: 100vh;
}

</style>                      

