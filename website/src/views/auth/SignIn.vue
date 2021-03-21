<template>
  <ion-page>
    <ion-content>
      <div style="background-color: #00b2ce; height: 100vh; position: relative">
        <div>
          <img class="auth-image" src="../../../public/assets/img/Regrub.png" />
          <div
            class="signin-link"
            @click="() => router.push({ path: '/register' })"
          >
            Register
          </div>
          <div
            class="signin-link"
            style="left: 20px; width: 200px"
            @click="gotohome()"
          >
            Skip Now
          </div>
        </div>
        <div class="input">
          <div class="register">SIGN IN</div>
          <div class="form">
            <div class="inputBox">
              <img class="inptimg" src="../../../public/assets/img/phone.png" />

              <ion-input
                class="ion-input"
                type="tel"
                maxlength="10"
                placeholder="Phone number"
                v-model="phoneNumber"
                @keyup="onlyNumeric"
              ></ion-input>
            </div>
            <div class="inputBox">
              <img class="inptimg" src="../../../public/assets/img/lock.png" />
              <ion-input
                class="ion-pass"
                id="pwd"
                type="password"
                maxlength="12"
                placeholder="Password"
                v-model="password"
              ></ion-input>
              <img
                class="pass-img"
                @click="togglePassword"
                id="img"
                src="../../../public/assets/img/pass.png"
              />
            </div>
            <div class="forgat" @click.stop.prevent="gotoforgetpassword">
              Forgot Password?
            </div>
          </div>
          <div style="text-align: center; padding-bottom:30px; margin-top: 25px">
            <ion-button class="button" @click.stop.prevent="register()"
              >SIGN IN</ion-button
            >
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  toastController,
  loadingController,
  IonInput,
  IonButton,
  IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
//import json from ''

export default defineComponent({
  data() {
    return {
      phoneNumber: "",
      password: "",
      loader: null,
    };
  },
  components: { IonButton, IonInput, IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },

  methods: {
    async resetInput() {
      this.phoneNumber = "";
      this.password = "";
    },
    async register() {
      if (!this.phoneNumber && !this.password) {
        await $apiService.presentToastWithOptions("All fields are mandatory.");
        return;
      }
      if (!this.phoneNumber) {
        await $apiService.presentToastWithOptions(
          "Phone number is a mandatory field."
        );
        return;
      }
      if (!this.password) {
        await $apiService.presentToastWithOptions(
          "Password is a mandatory field."
        );
        return;
      }
      // const userId = window.localStorage.getItem("USERID");
      // const test = await $apiService.getCall("user/" + userId);
      // console.log("test", test);
      //       console.log(test.apidata.PhoneNumber)
        // console.log(this.phoneNumber);
      await $apiService.showLoading();
      const registerRes = await $apiService.postCall("user/login", {
        PhoneNumber: this.phoneNumber,
        Password: this.password,
      });
    
      await $apiService.hideLoading();
      console.log(registerRes.apidata.isExist);
      //const Otp = window.localStorage.getItem("Otp");
      // if(test.apidata.Otp != null || test.apidata.PhoneNumber != this.phoneNumber){
      if (registerRes.apidata.isExist) {
        if (registerRes.apidata?.user?._id) {
          window.localStorage.setItem("USERID", registerRes.apidata?.user?._id);
          this.resetInput();
        }
        await $apiService.presentToastWithOptions(
          "Signed in successfully."
        );
        this.gotohome();
      } 
      else 
       {
        await $apiService.presentToastWithOptions("Invalid Username Or Password.");
       }
     
      //  } else
      // {
    
      //      await $apiService.presentToastWithOptions("Registeration completed first");
      //  } 
       
    },
    async gotohome() {
      this.$router.push({ path: "/enable" });
    },
    async gotoforgetpassword() {
      this.resetInput();
      this.router.push({ path: "/reset-password" });
    },
    onlyNumeric() {
      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, "");
    },
    async togglePassword() {
      const ps: any = document.getElementById("pwd");
      const imgs: any = document.getElementById("img");
      const srctype = ps.getAttribute("src");
      const typePwd = ps.getAttribute("type");
      if (typePwd == "text") {
        ps.setAttribute("type", "password");
      } else {
        ps.setAttribute("type", "text");
      }
    },
  },
});
</script>


<style scoped>
.img {
  width: 16px;
}
.signin-link {
  position: absolute;
  top: 20px;
   font-family: 'Permanent Marker', cursive;
  /* font-weight: 500; */
  right: 20px;
  color: white;
  text-transform: uppercase;
}

.button {
  width: 100%;
  --border-radius: 25px;
  --background: #ec2885;
  height: 45px;
  letter-spacing: 4px;
    font-family: 'Permanent Marker', cursive;

  /* font-weight: 400; */
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
  margin-left: 4px;
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
  margin-left: 4px;
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
  margin-top: 13px;
  /* margin-right: 20px; */
  width: 16px;
  height: 12px;
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
  margin-top: 14px;
  width: 16px;
  height: 16px;
}
.input {
  padding: 20px;
  background-color: var(--background);
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: auto;
  padding-bottom: 60px  !important;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  bottom: -70px;
}
.inputBox {
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
    font-family: 'Permanent Marker', cursive;
  /* font-weight: 600; */
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
