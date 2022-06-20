<template>
    <div class="wrapper">
        <div class="register">
            <div class="register-block">
                <div class="register-block__logo">
                    <img src="@/assets/sidebar-logo.png" alt="">
                </div>
                <div class="register-block__form">
                    <div class="register-block__form-info">
                        <div class="login-block__form-info-text">
                            Tipp: Loggen Sie sich mit ihren Eurotransport.de-Daten ein.
                        </div>
                    </div>
                    <select name="" id="" v-model="gender">
                        <option value="">Mr</option>
                        <option value="">Mrs</option>
                    </select>
                    <input type="text" placeholder="Vorname" v-model="firstName">
                    <input type="text" placeholder="Nachname" v-model="lastName">
                    <input type="text" placeholder="Benutzername*" v-model="username">
                    <input type="text" placeholder="Telefonnummer (für Rückfragen)" v-model="phoneNumber">
                    <input type="text" placeholder="E-Mail*" v-model="email">
                    <input type="text" placeholder="Passwort*" v-model="firstPassword">
                    <input type="text" placeholder="Passwort wiederholen*" v-model="secPassword">
                </div>
                <div class="register-block__form-contract">
                    <div class="register-block__form-contract-check">
                        <input type="checkbox">
                    </div>
                    <div class="register-block__form-contract-text">
                        Ich habe die Datenschutzbestimmungen und dia AGB gelesen und akzeptiert.*
                    </div>
                </div>
                <div class="register-block__form-bottom">
                    <div class="register-block__form-bottom-options">
                        <div class="register-block__form-bottom-options-password" @click="pushDaten">
                            Datenschutz
                        </div>
                        <div class="register-block__form-bottom-options-register" @click="pushAgb">
                            AGB
                        </div>
                    </div>
                    <div class="register-block__from-bottom-send">
                        <button @click="sendRegister">Weiter</button>
                    </div>
                </div>                
            </div>
        </div>    
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import rijndael from 'rijndael-js';

export default {
    data(){
        return{
            gender: '',
            firstName: '',
            lastName: '',
            username: '',
            phoneNumber: '',
            email: '',
            firstPassword: '',
            secPassword: '',
            checked: false
        }
    },
    methods:{
        pushAgb(){
            this.$router.push({name: 'AGB'});
        },
        pushDaten(){
            this.$router.push({name: 'Datenschutz'});
        },
        async sendRegister(){
            if(this.checked){
                let iv = 'j98watdn9Z (H 9u';
                let secret = 'KjUQ9R6cVMSrEhPq';

                const cipher = new rijndael(secret, 'cbc');
                const oldCipherPass = Buffer.from(cipher.encrypt(this.firstPassword, 128, iv));
                const newCipherPass = Buffer.from(cipher.encrypt(this.secPassword, 128, iv))
                
                var oldCleanPassword = oldCipherPass.toString("hex");
                var newCleanPassword = newCipherPass.toString("hex");
                
                if(oldCleanPassword === newCleanPassword){
                    console.log(newCleanPassword);
                    axios.get(this.apiUrl + 'registration', {params: {username: this.username, email: this.email, password: oldCleanPassword, last_name: this.lastName, first_name: this.firstName, phone_number: this.phoneNumber}}).then( res => {
                        console.log(res);
                        this.$router.push({name: 'Anmeldung'});
                    });
                }
                else{
                    console.log("Pass is not equal.");
                }

            }else{
                console.log("Not checked");
            }
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
</style>