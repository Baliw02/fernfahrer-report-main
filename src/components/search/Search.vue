<template>
    <div class="wrapper">
        <div class="search">
            <div class="search-block">
                <div class="search-block__input">
                    <input type="text" v-model="searchText" @input="updateSearch">
                </div>
                <div class="search-block__description">
                    Deine Suche führt zu folgenden Treffen:
                </div>
            </div>
            <div class="tabs">
                <div class="tabs-bar">
                    <div class="tabs-bar__title" v-for="(tab, index) in tabs" :key="index" :class="{active: selectedTab === index}" @click="selectTab(index)">
                            {{tab}}
                    </div>
                </div>
            </div>
            <div class="search-results" v-if="selectedTab === 0">
                <UserSearch />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components:{
        UserSearch: () => import('./UserSearch.vue')
    },
    data(){
        return{
            tabs: ['Benutzername', 'Bilder', 'Videos'],
            contentLoading: false,
            selectedTab: 0,
            searchText: ''
        }
    },
    methods:{
        selectTab(index){
            this.selectedTab = index;
        },
        updateSearch(e){
            this.$store.commit('setSearchText', e.target.value);
        }

    },
    mounted(){
    },
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.search{
    margin-top: 50px;
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
    .tabs{
        &-bar{
            width: 100%;
            overflow: hidden;
            justify-content: space-between;
            &__title{
                text-align: left;
            }
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
        max-height: 100vh;
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
}
</style>