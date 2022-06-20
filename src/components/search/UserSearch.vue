<template>
     <div class="search-results">
          <div class="loading-spinner" v-if="contentLoading"></div>            
          <div class="search-results__list">
               <div class="search-results__list-item" v-for="(user, index) in getSearchResults" :key="index" @click="pushProfile(user.id)">
                    {{user.username}}
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
     data(){
          return{
               applicationUsers: [],
               contentLoading: false,
          }
     },
     methods:{
          getUsers(){
            this.contentLoading = true;
            axios.get(this.apiUrl + 'getApplicationUsers').then( res => {
                console.log(res);

                this.applicationUsers = res.data.data.users;
                this.contentLoading = false;
            }
          )},
          pushProfile(id){
               this.$router.push({name: 'Profil', params:{id: id}})
          },
     },
     mounted(){
          this.getUsers();
     },
     computed:{
          ...mapState({
               apiUrl: state => state.url,
               searchText: state => state.searchText
          }),
          getSearchResults(){
               return this.applicationUsers.filter((user) => {
                    return user.username.toUpperCase().match(this.searchText.toUpperCase());
               }); 
          },
     }    

}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.search-results{
     background-color: grey;
     overflow-y: scroll;
     max-height: 100vh;
     .loading-spinner{
          top: 0;
          bottom: 0;
          margin: auto;
     }

     &__list{
          &-item{
               cursor: pointer;
               padding: 20px 10px;
               text-align: left;
               font-family: $f-roboto;
               font-weight: 400;
               font-size: 12px;
               border-bottom: 2px solid rgb(107, 107, 107);
          }
     }

}
</style>