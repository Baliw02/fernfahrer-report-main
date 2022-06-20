<template>
    <div class="wrapper">
        <div class="password">
            <div class="password-block">
                <div class="password-block__logo">
                    <img src="@/assets/sidebar-logo.png" alt="">
                </div>
                <div class="password-block__form">
                    <input type="text" placeholder="E-Mail-Adresse" v-model="email">
                </div>                
                <div class="password-block__form-bottom">
                    <button @click="sendReset">Ok</button>
                </div>
            </div>
            <div class="push-notification" v-if="success">
                <div class="push-notification__title">
                    Reporter
                </div>
                <div class="push-notification__description">
                    Wir haben dir eben eine E-Mail geschickt, mit der du dein Passwort zurüksetzen kannst.<br>
                    {{this.email}}
                </div>
                <div class="push-notification__button" @click="pushLogin">
                    Ok
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
            email: '',
            success: false
        }
    },
    methods: {
        async sendReset(){
            axios.get(this.apiUrl + 'passwordReset', {params: {email: this.email}}).then( res => {
                if(res.data.error.code){
                    console.log('Wrong email');
                    this.success = false;
                }   
                else{
                    console.log('Good email');
                    this.success = true;
                }
            })
        },
        pushLogin(){
            this.$router.push({name: 'Anmeldung'});
        }
    },
    computed: {
        ...mapState({
            apiUrl: state => state.url
        })
    }
}
</script>

<style lang="scss" scoped>
$c-theme: #ED1D24;
$f-poppins: 'Poppins', sans-serif;
$f-roboto: 'Roboto';
$icon-size: 20px;

.password{
    padding: 50px 10px;
    &-block{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        height: fit-content;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: calc(320px + 24px);
        padding: 0px 10px;
        &__logo{
            margin-bottom: 10px;
            img{
                width: 100%;
            }
        }
        &__form{
            width: 100%;
            max-width: calc(320px + 24px);
            &-bottom{
                width: 100%;
                text-align: right;
            }
        }
    }
    &-success{
        
    }
}

</style>