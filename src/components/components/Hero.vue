<template>
     <div class="carousel">
          <div class="carousel-block">
               <carousel v-on:pageChange="carouselPageChange" :loop="true" :autoplayTimeout="5000" :perPage="1" :paginationEnabled="false" :autoplay="true" :navigateTo="currentSlide">
                    <slide v-for="slide in missions" :key="slide.id">
                         <div class="slide-content" @click="selectContent(slide.id)">
                              <img :src="'http://fernfahrer-reporter.de' + slide.lead_image" :alt="slide.lead_text + 'image'">
                              <div class="slide-content__text">
                                   <div class="slide-content__text-title">
                                        {{slide.title}}
                                   </div>
                                   <!-- <div class="slide-content__text-desc" v-if="windowWidth > 960">
                                        {{slide.lead_text}}
                                   </div> -->
                              </div>
                         </div>
                    </slide>
               </carousel>
               <!-- <div class="carousel-block__pagination-icon prev" @click="prevSlide()">
                    <font-awesome-icon :icon="['fa', 'fa-angle-left']" />
               </div>
               <div class="carousel-block__pagination-icon next" @click="nextSlide()">
                    <font-awesome-icon :icon="['fa', 'fa-angle-right']" />
               </div> -->
          </div>
     </div>
</template>

<script>
import { mapState } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
export default {
     data(){
          return{
               currentSlide: 0
          }
     },
     components:{
          Carousel,
          Slide
     },
     methods:{
          carouselPageChange(i){
               this.currentSlide = i;
               console.log(this.currentSlide);
          },
          nextSlide(){
               if(this.missions.length > this.currentSlide){
                    this.currentSlide += 1;
               }
          },
          prevSlide(){
               if(this.currentSlide > 0){
                    this.currentSlide -= 1;
               }
          },
          selectContent(id){
               this.$router.push({name: 'Mission view', params: {id: id}});
          },
     },
     mounted(){
     },
     computed:{
          ...mapState({
               missions: state => state.homeModule.missions,
               windowWidth: state => state.windowWidth
          })
     },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
.carousel{
     margin-top: 50px;
     .slide-content{
          position: relative;
          cursor: pointer;
          &__text{
               position: absolute;
               bottom: 3px;
               color: white;
               text-align: left;
               font-size: 16px;
               font-family: $f-roboto;
               // background-color: rgba(0, 0, 0, 0.274);
               padding: 10px;
               &-title{
                    font-size: 24px;
                    position: relative;
                    margin-bottom: 10px;
                    width: fit-content;
                    text-shadow: 2px 2px 2px #000000;
                    font-weight: 600;              
               }
               &-desc{
                    font-size: 16px;
                    font-weight: 400;
               }
          }
          
     }
     &-block{
          position: relative;
          img{
               width: 100%;
               max-height: 60vh;
               // height: calc(100vh - 50px);
               object-fit: cover;
               object-position: center;
          }
          &__pagination-icon{
               position: absolute;
               background-color: rgb(0, 0, 0);
               color: $c-theme;
               padding: 10px 10px;
               font-size: 24px;
               top: 0;
               bottom: 0;
               height: fit-content;
               margin: auto;
               cursor: pointer;
               &.prev{
                    left: 0;
               }
               &.next{
                    right: 0;
               }
          }

          
     }
}
</style>                      

