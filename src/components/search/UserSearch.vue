<template>
    <div class="wrapper">
        <div class="search">
            <div class="search-block">
                <div class="search-block__input">
                    <input type="text" v-model="searchText">
                </div>
                <div class="search-block__description">
                    Deine Suche führt zu folgenden Treffen:
                </div>
            </div>
            <div class="loading-spinner" v-if="contentLoading"></div>            
            <div class="search-results" v-if="getSearchResults.length != 0">
                <div class="search-results__list">
                    <div class="search-results__list-item" v-for="(user, index) in getSearchResults" :key="index" @click="pushProfile(user.id)">
                        {{user.username}}
                    </div>
                </div>
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
            searchText: '',
            applicationUsers: [],
            contentLoading: false
        }
    },
    methods:{
        getSearch(){
            this.contentLoading = true;
            axios.get(this.apiUrl + 'getApplicationUsers').then( res => {
                console.log(res);

                this.applicationUsers = res.data.data.users;
                this.contentLoading = false;
            }
        )},
        pushProfile(id){
            this.$router.push({name: 'Profil', params:{id: id}})
        }
    },
    mounted(){
        this.getSearch();
    },
    computed:{
        ...mapState({
            apiUrl: state => state.url
        }),
        getSearchResults(){
            return this.applicationUsers.filter((user) => {
                return user.username.match(this.searchText);
            }); 
        }
    }    
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.search{
    &-block{
        padding: 0px 10px;
        text-align: center;
        font-family: $f-roboto;
        &__input{
            margin-top: 70px;
            input{
                max-width: 100%;
                font-weight: 600;
            }
        }
        &__description{
            text-align: left;
        }
    }
    .loading-spinner{
        top: 0;
        bottom: 0;
        margin: auto;
    }
    &-results{
        background-color: grey;
        overflow-y: scroll;
        height: 100vh;
        &__list{
            &-item{
                padding: 20px 10px;
                text-align: left;
                font-family: $f-roboto;
                font-weight: 400;
                font-size: 12px;
                border-bottom: 2px solid rgb(107, 107, 107);
            }
        }
    }
}
</style>