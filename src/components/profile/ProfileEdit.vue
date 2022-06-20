<template>
     <div class="wrapper">
          <div class="profile-edit">
               <div class="profile-edit__block">
                    <select name="" id="" v-model="gender">
                         <option>Mr</option>
                         <option>Mrs</option>
                    </select>
                    <input type="text" placeholder="Vorname" v-model="firstName">
                    <input type="text" placeholder="Nachname" v-model="lastName">
                    <input type="text" placeholder="" v-model="username">
                    <input type="tel" placeholder="Telefonnummer (für Rückfragen)" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" v-model="phoneNumber">
                    <input type="text" placeholder="E-mail addresse" v-model="email">
                    <div class="profile-edit__block-bottom">
                         <button @click="updateProfile">Weiter</button>
                    </div>  
                    <div class="profile-pass__block">
                         <input type="password" placeholder="Passwort *" v-model="oldPassword">
                         <input type="password" placeholder="Passwort wiederholen*" v-model="newPassword">
                         <div class="profile-pass__block-bottom">
                              <button @click="updatePassword">Weiter</button>
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
               firstName: '',
               lastName: '',
               username: '',
               password: '',
               email: '',
               gender: '',
               phoneNumber: 0,
               userId: 0,
               oldPassword: '',
               newPassword: ''
          }
     },
     mounted(){
          this.setDefaultData();
     },
     //http://fernfahrer.webapix.hu/api/xml/profile?user_id={user_id}&title={title}&first_name={first_name}&last_name={last_name}&phone_number={phone_number}

     methods:{
          setDefaultData(){
               this.firstName = this.currentUser.first_name;
               this.lastName = this.currentUser.last_name;
               this.username = this.currentUser.username;
               this.email = this.currentUser.email;
               this.phoneNumber = this.currentUser.phone_number;
               this.gender = this.currentUser.title;
               this.userId = this.currentUser.id;
          },
          async updateProfile(){
               axios.get(this.apiUrl + 'profile', {params: {user_id: this.userId, title: this.gender, first_name: this.firstName, last_name: this.lastName, phone_number: this.phoneNumber}}).then( res => {
                    console.log(res);
               })
          },
          async updatePassword(){
               let iv = 'j98watdn9Z (H 9u';
               let secret = 'KjUQ9R6cVMSrEhPq';

               const cipher = new rijndael(secret, 'cbc');
               const oldCipherPass = Buffer.from(cipher.encrypt(this.oldPassword, 128, iv));
               const newCipherPass = Buffer.from(cipher.encrypt(this.newPassword, 128, iv))
               var oldCleanPassword = oldCipherPass.toString("hex");
               var newCleanPassword = newCipherPass.toString("hex");

               axios.get(this.apiUrl + 'changePassword', {params: {user_id: this.userId, password: oldCleanPassword, password2: newCleanPassword}}).then( res => {
                    if(res.data.error.code){
                         console.log("bad");
                    }
                    else{
                         var user = this.$cookies.get('user');
                         user.password = newCleanPassword;
                         this.$cookies.set('user', user);
                    }
               })
          }
     },
     computed:{
          ...mapState({
               apiUrl: state => state.url,
               currentUser: state => state.userModule.currentUser
          })
     }
}
</script>

<style lang="scss" scoped>
.profile-edit{
     &__block{
          display: flex;
          flex-direction: column;
          align-items: center;
          height: fit-content;
          margin: auto;
          max-width: calc(320px + 24px);
          padding: 0px 10px;
          @media only screen and (max-width: 600px) {
               margin-top: 10px;
          }
          select{
               max-width: 342px;
          }
          &-bottom{
               width: 100%;
               text-align: right;
               margin-bottom: 50px;
          }
     }
     .profile-pass__block{
          &-bottom{
               text-align: right;          
          }
     }
}
</style>