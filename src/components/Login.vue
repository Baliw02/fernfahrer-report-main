<template>
    <div class="wrapper">
        <div class="login">
            <div class="login-block">
                <div class="login-block__logo">
                    <img src="@/assets/sidebar-logo.png" alt="">
                </div>
                <div class="login-block__form">
                    <div class="login-block__form-info">
                        <div class="login-block__form-info-text">
                            Tipp: Loggen Sie sich mit ihren Eurotransport.de-Daten ein.
                        </div>
                        <div class="login-block__form-info-image">
                            <img src="@/assets/euro_id.svg" alt="">
                        </div>
                    </div>
                    <input type="email" placeholder="E-Mail-Adresse" v-model="email">
                    <input type="password" placeholder="Passwort" v-model="password">
                </div>
                <div class="login-block__form-bottom">
                    <div class="login-block__form-bottom-options">
                        <div class="login-block__form-bottom-options-password" @click="pushPasswordReset">
                            Passwort vergessen?
                        </div>
                        <div class="login-block__form-bottom-options-register" @click="pushRegister">
                            Noch keine Konto?
                        </div>
                    </div>
                    <div class="login-block__from-bottom-send">
                        <button @click="sendLogin()">OK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import rijndael from 'rijndael-js';
import { mapState } from 'vuex';
//siposbalazs2002@gmail.com asd123 bali2
//siposbalazs661@gmail.com 1234567891011121 bali22
//PlayWithBalazs2002@gmail.com  asd123 bali3
export default {
    data(){
        return{
            email: '',
            password: '',
            error: false,
            emailError: false,
            passwordError: false,
        }
    },
    created(){
        if(this.loggedIn){
            this.$router.push({name: 'Start'});
            location.reload();
        }
    },
    methods:{
        async sendLogin(){
            let iv = 'j98watdn9Z (H 9u';
            let secret = 'KjUQ9R6cVMSrEhPq';

            const cipher = new rijndael(secret, 'cbc');
            const ciphertext = Buffer.from(cipher.encrypt(this.password, 128, iv));
            
            var cleanText = ciphertext.toString("hex");
            
            axios.get('http://fernfahrer-reporter.de/api/json/login', {params: {email: this.email, password: cleanText}}).then( res => {
                if(res.data.error.code){
                    this.error = true;
                    this.$cookies.set('authenticated', false);
                }
                else{
                    this.error = false;

                    this.$cookies.set('user', JSON.stringify(res.data.data.user));
                    this.$cookies.set('authenticated', true);
                    this.$router.push({name: 'Start'});
                    location.reload();
                }
            })
        },
        pushRegister(){
            this.$router.push({name: 'Register'});
        },
        pushPasswordReset(){
            this.$router.push({name: 'Password reset'});
        }
    },
    computed:{
        ...mapState({
            loggedIn: state => state.loggedIn
        })
    }
}
</script>

<style lang="scss" scoped>
</style>

