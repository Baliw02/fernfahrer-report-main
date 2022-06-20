<template>
     <div class="tabs-content__categories">
          <div class="tabs-content__block" v-for="(category, index) in categories" :key="index" @click="selectContent(category.id)">
               <div class="tabs-content__block-image">
                    <img :src="dataUrl + category.lead_image" :alt="category.lead_text + 'image'">
                    <div class="tabs-content__block-image-text">
                         <div class="title">
                              {{category.title}}
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
     methods:{
          selectContent(id){
               this.$router.push({name: 'Category view', params: {id: id}});
          },
          ...mapActions([
               'getCategories'
          ])          
     },
     computed:{
          ...mapState({
               categories: state => state.homeModule.categories,
               
               apiUrl: state => state.url,
               dataUrl: state => state.dataUrl,
               windowWidth: state => state.windowWidth,

          }),
     },
     mounted(){
          this.getCategories();
     }
}
</script>

