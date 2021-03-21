<template>
  <ion-page>
    <ion-content>
      <div style="height: 100vh">
        <div class="dsply">
         <div 
          @click="closeMod" 
            class="arrow" >
              &lt;
           </div>
         </div>
        <div class="dsply"><div class="addrs" >New Address</div></div>
        <div class="input">
          <div class="form">
            <div class="inputBox">
              <ion-input
                class="ion-input"
                type="text"
                maxlength="16" 
                placeholder="Full Name"
                v-model="Nick"
              ></ion-input>
            </div>
            <div class="inputBox">
              <ion-input
                class="ion-pass"
                type="text"
                maxlength="16" 
                placeholder="Address"
                v-model="Address"
              ></ion-input>           
            </div>
          <div class="check" style="font-size:14px; color: gray;">  
          <ion-checkbox style="margin: 4px 8px; width:14px; height:14px; radius:20px;" v-model="IsDefault" color="primary" >  </ion-checkbox>  
            <div> Default </div> 
          </div>
          </div>
          <div style="text-align: center; margin-top: 45px">
            <ion-button class="button" @click="register">Add Address</ion-button>
          </div> 
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonCheckbox,
  toastController,
  loadingController,
  IonInput,
  IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import { modalController } from "@ionic/vue";

//import json from ''
export default defineComponent({
  data() {
    return {
      user:[],
      Nick: "",
      Address: "",
      IsDefault: false,
      loader: null,
      noDataMessage: false,
    };
  },
  components: { IonCheckbox, IonButton, IonInput, IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
 async mounted() {
   
    const userId = window.localStorage.getItem("USERID");
    if(userId){
    await $apiService.showLoading();
    const test = await $apiService.getCall("user/" + userId);
    this.user = test.apidata || [];
    if ((this.user || []).length == 0) {
      this.noDataMessage = true;
    }
    await $apiService.hideLoading();
    } else {
      this.router.push({ path: '/signin' });
    }
  },
  methods: {
      closeMod(){
        modalController.dismiss({added: false})
      },
    async resetInput() {
         this.Nick = "";
         this.Address = "";
         this.IsDefault = false;
    },
    async register() {
        if (!this.Nick && !this.Address) {
        await $apiService.presentToastWithOptions("All fields are mandatory.");
        return;
      }
      if (!this.Nick) {
        await $apiService.presentToastWithOptions(
          "Fullname is a mandatory field."
        );
        return;
      }
      if (!this.Address) {
        await $apiService.presentToastWithOptions(
          "Address is a mandatory field."
        );
        return;
      }
      // call api for add  
      await $apiService.showLoading();   

     const userId = window.localStorage.getItem("USERID");

      const registerRes = await $apiService.postCall("user/add-address/" + userId, {
          Nick: this.Nick,
          Address: this.Address,
          IsDefault: this.IsDefault,
      })
      console.log(registerRes);

      await $apiService.hideLoading();

      modalController.dismiss({added: true});

    },
    async gotohome() {
      this.$router.push({ path: "/tabs/explore" });
    },
  },
});
</script>


<style scoped>


.dsply {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0px;
  padding-top: 30px;
  padding-right: 30px;
  padding-left: 30px;
  align-items: center;
}

.addrs {
  font-family: Abril Fatface;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
}


.img {
  width: 16px;
}
.signin-link {
  position: absolute;
  top: 20px;
  font-family: Poppins;
  font-weight: 500;
  right: 20px;
  color: white;
  text-transform: uppercase;
}

.button {
  width: 100%;
  --border-radius: 25px;
  --background: #ec2885;
  height: 55px;

  font-weight: 400;
}
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.ion-pass {
  font-family: Poppins;
  font-size: 16px;
  margin-left: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.text-align {
  text-align: center;
}
.ion-input {
  font-family: Poppins;
  font-size: 16px;
  margin-left: 8px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}

.form {
  font-size: 6vw;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  margin: 10px 0px;
}
.form ion-item {
  margin-top: 10px;
}
.pass-img {
  margin-top: 10px;
  /* margin-right: 20px; */
  width: 16px;
  height: 16px;
}

.forgat {
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  justify-content: right;
  text-align: right;
  text-decoration: underline;
  color: #b5b8c2;
}

.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  margin-left: 30px;
  opacity: 0.5;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0px;
}
.inptimg {
  margin-top: 10px;
  width: 18px;
  height: 18px;
}
.input {
  padding: 10px 20px;
  background-color: var(--background);
  /* position: absolute; */
  z-index: 1000;
  width: 100%;
  /* border-top-left-radius: 60px;
  border-top-right-radius: 60px; */
  bottom: 0px;
}
.inputBox {
  display: flex;
  position: relative;
  z-index: 1;
  margin-top: 15px;
}
.check {
  display: flex;
  position: relative;
  z-index: 1;
  margin-top: 20px;
}

.inputBox:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  padding-left: 20px;
  margin-left: 0px;
  margin-right: 0px;
  width: 95%;
  border-bottom: 1px solid #f1f3f8;
}
.inputBox:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}

.icon {
  position: absolute;
  float: right;
  right: 0;
  font-size: 21px;
  margin-top: 14px;
  color: #07509d;
}
.backPer {
  background-color: #f8f8f8;
  font-size: 20px;
  flex-direction: row;
  align-content: left;
  padding: 10px;
  margin-top: 25px;
  text-align: center;
}

.display {
  display: flex;
  align-content: space-between;
  margin-top: 30px;
}
.theme-color {
  color: #00b2ce;
}
.dsplay {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}

.regstr {
  font-size: 32px;
  font-weight: 700px;
  font-family: "Abril Fatface";
}
.register {
  text-align: center;
  color: #00b2ce;
  font-family: Poppins;
  font-weight: 600;
  font-size: 24px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
