<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div class="dsplay ion-padding theme-color">
          <div @click="() => router.push({ path: '/delivery-details' })">
            <strong> &lt; </strong>
          </div>
          <!-- <div class="head" @click="register">NEXT</div> -->
        </div>
        <div class="dsplay ion-padding">
          <div class="regstr">Verify phone</div>
          <div class="step"><p>Step3/3</p></div>
        </div>
        <p class="pra ion-padding backPer">Enter your phone number to verify</p>
        <div class="inputbtn ion-padding">
          <div class="llable">Phone number</div>
          <input
            class="lname"
            type="tel"
            maxlength="10"
            v-model="phoneNumber"
             @keyup="onlyNumeric"
            placeholder="Phone number"
          />
        </div>
            <div style="position:absolute; bottom:30px; right:0px;">
          <button style="outline:none" @click="register()">Next</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  loadingController,
  toastController,
  IonInput,
  IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";

export default defineComponent({
  data() {
    return {
      phoneNumber: "",
    };
  },
  components: { IonPage,IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted(){
    await $apiService.showLoading();
    const userId = window.localStorage.getItem("USERID");
    console.log(userId)
    const test = await $apiService.getCall("user/" + userId);
    console.log("test", test);
    if(!test.isError) {
      this.phoneNumber = test.apidata.PhoneNumber;
    }
    await $apiService.hideLoading();
  },
  methods: {
    /*  */
    async register() {
      if (!this.phoneNumber) {
        await $apiService.presentToastWithOptions("All fields are mandatory.");
        return;
      }
      await $apiService.showLoading();

      const userId = window.localStorage.getItem("USERID");

      const registerRes = await $apiService.postCall(
        "user/gnerate-otp/" + userId,
        {
          PhoneNumber: this.phoneNumber,
        }
      );
      console.log(registerRes);

      await $apiService.hideLoading();

      await $apiService.presentToastWithOptions(
        " Phone number submitted successfully."
      );
      this.gotoPersonalInfo();
    },
    async gotoPersonalInfo() {
      this.$router.push({ path: "/phone-verification" });
    },  
      onlyNumeric() {
      
     this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
}
   
  },
});
</script>

<style scoped>
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.pra {
  font-family: Poppins;
  font-size: 14px;
  color: #97999f;
  font-weight: 400;
  margin-top: -15px;
}
.text-align {
  text-align: center;
}
.head {
  font-family: Poppins;
  color: #00b2ce;
  font-weight: 600;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}
button {
  border: 0;
  font-weight: 400;

  font-family: "Permanent Marker", cursive;
  float: right;
  font-size: 18px;
  letter-spacing: 1px;
  height: 32px;
  color: #e01b78;
  text-align: left;
  padding: 6px 15px;
  border-radius: 25px 0 0 25px;
  width: 110px;
  background: #feb713;

  line-height: 1;
}
.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  opacity: 0.5;
  color: #8d92a3;

  font-size: 14px;
  margin-top: 10px;
  font-family: Poppins;
  font-weight: 400;
  margin-bottom: 0px;
}

.lname {
  border-top: 1px;
  border-left: 0ch;
  color: #000521;

  height: 30px;
  /* margin-right: 20px; */
  border-right: 0ch;
  border-color: #f1f3f8;
  margin-top: 10px;
  font-family: Poppins;
  font-weight: bold;
  margin-bottom: 10px;
  outline: none;
  width: 100%;
}
.backPer {
  color: black;
  line-height: 21px;
  font-size: 15px;
  font: "Poppins";
  flex-direction: row;
  align-content: left;
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

  align-items: center;
}
.step {
  font-family: Poppins;
  font-weight: 400;
}

.regstr {
  font-size: 32px;
  line-height: 43.17px;

  font-weight: 400;
 font-family: 'Permanent Marker', cursive;
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
