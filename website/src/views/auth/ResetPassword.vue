<template>
  <ion-page>
    <ion-content>
      <div id="container" style="margin-top: 15px">
        <div class="dsplay">
          <img
            @click="() => router.back()"
            style="margin-left: 2px"
            src="../../../public/assets/img/leftarrow.png"
          />
          <div class="dtail">Forgot Password</div>
          <div style="width: 50px"></div>
        </div>

        <div class="inputbtn" v-if="state == 'EMAIL'">
          <div class="llable">Phone Number</div>
          <div class="inputBox">
            <input
              class="lname"
              type="tel"
              id="pd"
              @keyup="onlyNumeric"
              maxlength="10"
              placeholder="Phone Number"
              v-model="phoneNumber"
            />
          </div>
        </div>

        <div class="inputbtn" v-if="state == 'OTP'">
          <div class="llable">OTP</div>
          <div class="inputBox">
            <input
              class="lname"
              type="password"
              id="pd"
              maxlength="6"
              placeholder="6 Digit OTP Code"
              @keyup="onlyNum"
              v-model="otp"
            />
            <img
              style="margin-top: 18px"
              id="im"
              @click="togglePassword"
              src="../../../public/assets/img/passicon.png"
            />
          </div>
        </div>

        <div class="inputbtn" v-if="state == 'PASSWORD'">
          <div class="llable">New Password</div>
          <div class="inputBox">
            <input
              class="lname"
              type="password"
              id="pd"
              maxlength="12"
              placeholder="New Password"
              v-model="password"
            />
            <img
              style="margin-top: 18px"
              id="im"
              @click="togglePassword"
              src="../../../public/assets/img/passicon.png"
            />
          </div>
          <div class="llable">Confirm Password</div>
          <div class="inputBox">
            <input
              class="lnae"
              type="password"
              maxlength="12"
              id="pwds"
              v-model="confirmPassword"
              placeholder="Confirm Password"
            />
            <img
              style="margin-top: 18px"
              id="imgs"
              @click="toggleConfirmPassword()"
              src="../../../public/assets/img/passicon.png"
            />
          </div>
        </div>
        <div class="change">
          <ion-button
            expand="block"
            @click="sendOTP"
            v-if="state == 'EMAIL'"
            class="button"
            >Send OTP</ion-button
          >

          <ion-button
            expand="block"
            @click="verifyOTP"
            v-if="state == 'OTP'"
            class="button"
            >Submit</ion-button
          >

          <ion-button
            expand="block"
            @click.stop.prevent="register()"
            v-if="state == 'PASSWORD'"
            class="button"
            >CHANGE PASSWORD</ion-button
          >
        </div>
        <!-- <div style="text-align: center; margin-top: 25px">
        
        </div> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonButton,
  loadingController,
  IonInput,
  toastController,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";

export default defineComponent({
  data() {
    return {
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      loader: null,
      otp: "",
      state: "EMAIL",
      regexPassword: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };
  },
  components: { IonButton, IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  methods: {
    /*  */
    async resetPhoneNumber() {
      this.phoneNumber = "";
    },
    onlyNumeric() {
      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, "");
    },
    onlyNum() {
      this.otp = this.otp.replace(/[^0-9]/g, "");
    },

    async sendOTP() {
      if (!this.phoneNumber) {
        await $apiService.presentToastWithOptions(
          "Phone Number is a mandatory field."
        );
        return;
      }
      if (!/^\d{10}$/.test(this.phoneNumber)) {
        await $apiService.presentToastWithOptions(
          "Phone number should be of 10 digits."
        );
        return;
      }
      await $apiService.showLoading();
      // const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.postCall("user/gnerate-otp/-1", {
        PhoneNumber: this.phoneNumber,
      });
      this.resetPhoneNumber();
      // const test = await $apiService.getCall("user/" );
      // console.log(test);
      console.log(registerRes);
      if (!registerRes.apidata) {
        await $apiService.presentToastWithOptions(
          "Phone Number is not registered."
        );
      } else {
        this.state = "OTP";
      }
    },
    async resetPhoneNumberOtp() {
      this.otp = "";
    },

    async verifyOTP() {
      if (!this.otp) {
        await $apiService.presentToastWithOptions("OTP is a mandatory field.");
        return;
      }
        if (this.otp.length<6) {
        await $apiService.presentToastWithOptions("Invalid OTP.");
        return;
      }
      await $apiService.showLoading();
      const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.postCall("user/verify-otp", {
        _id: userId,
        Otp: this.otp,
      });

      this.resetPhoneNumberOtp();

      this.state = "PASSWORD";
    },
    async resetPassword() {
      this.password = "";
      this.confirmPassword = "";
    },

    async register() {
      await $apiService.showLoading();
      if (!this.password) {
        await $apiService.presentToastWithOptions(
          "New password and confirm password are mandatory."
        );
        return;
      }
      if (!this.confirmPassword) {
        await $apiService.presentToastWithOptions(
          "Confirm password is mandatory."
        );
        return;
      }
      if (this.password !== this.confirmPassword) {
        await $apiService.presentToastWithOptions(
          "Confirm password does not match with new password."
        );
        return;
      }
      if (!this.regexPassword.test(this.password)) {
        await $apiService.presentToastWithOptions(
          "Password should have atleast 8 characters and should contain 1 special charcter, 1 upper case, 1 lower case and 1 number."
        );
        return;
      }

      const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.putCall("user/password/" + userId, {
        Password: this.password,
      });
      this.hideLoading();

      await $apiService.presentToastWithOptions(
        "Password has been updated successfully."
      );

      this.state = "EMAIL";
      this.gotohome();
      this.resetPassword();
    },
    async hideLoading() {
      if (this.loader) {
        // await this.loader!.dismiss();
      }
    },
    async gotohome() {
      const strQ: string = this.$router.currentRoute.value.query
        .redirect as string;
      if (strQ) {
        this.$router.push({ path: strQ });
      } else {
        this.$router.push({ path: "/signin" });
      }
    },
    async togglePassword() {
      const ps: any = document.getElementById("pd");
      const imgs: any = document.getElementById("im");
      const srctype = ps.getAttribute("src");
      const typePwd = ps.getAttribute("type");
      if (typePwd == "text") {
        ps.setAttribute("type", "password");
      } else {
        ps.setAttribute("type", "text");
      }
    },
    async toggleConfirmPassword() {
      const ps: any = document.getElementById("pwds");
      const imgs: any = document.getElementById("imgs");
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
.Doption {
  display: flex;
}
.change {
  position: absolute;
  /* left: 6.2%; */
  /* right: 6.4%; */
  /* top: 84.19%; */
  bottom: 5%;
  /* padding: 30px; */
  width: 100%;
  /* border-radius: 28px; */
  text-align: -webkit-center;
}
.inputBox {
  display: flex;
  margin-right: 30px;
  padding-right: 6px;
  position: relative;
}
.inputBox:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  padding-left: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 91%;
  border-bottom: 1px solid #f1f3f8;
}
.inputBox:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.Pout {
  display: flex;
  color: #00b2ce;
  justify-content: space-between;
}
.imgdor {
  padding-right: 10px;
}
img {
  width: 16px;
  height: 12px;
}
.button {
  --border-radius: 25px;
  --background: #ec2885;
  height: 50px;
   font-family: 'Permanent Marker', cursive;
  margin-top: 20px;
  /* font-weight: 400; */
  letter-spacing: 2px;
  font-size: 16px;
  width: 90%;
}

.Dtodoor {
  display: flex;
  justify-content: space-between;
  width: 92%;
  padding: 4px;
  margin-left: 18px;
  margin-top: 10px;
  align-items: center;
}
.PtoOutSide {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  width: 92%;
  margin-left: 18px;
  margin-top: 6px;
  align-items: center;
}
.doption {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: #8d92a3;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
  align-items: center;
}
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.arrow-size {
  font-size: 18px;
  color: #8c8c8c;
  margin-right: 6px;
  padding-bottom: 5px;
}
.dtail {
  /* font-family: Avenir; */
  font-size: 18px;
  font-style: normal;
    font-family: 'Permanent Marker', cursive;
  font-weight: 400;
  line-height: 30px;
  letter-spacing:1px;
  color: #080040;
  margin-left: 45px;
  text-align: left;
}
.text-align {
  text-align: center;
}
.dspy {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  background: #f1f3f8;
  align-items: center;
  /*   border-bottom-color:#F1F3F8;
 */
  margin-top: 20px;
  margin-left: 18px;
  width: 92%;
  position: relative;
  z-index: 1;
}
.serchicon {
  width: 34px;
  height: 37px;
  margin-left: 0px;
  padding: 10px;
}
.regstr {
  line-height: 43.17px;
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
}
.dspy:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  margin-right: 100px;
  width: 99%;
  border-bottom: 1px solid #f1f3f8;
}
.dspy:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}

.inputbtn {
  justify-content: center;
  width: 100%;
  margin-top: 45px;
}

.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  margin-left: 25px;
  opacity: 0.5;
  font-size: 14px;
  margin-top: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

  margin-bottom: 0px;
}
.lname {
  border-top: 1px;
  border-left: 0ch;
  color: #080040;
  border: 0cm;
  letter-spacing: 1.5px;
  padding-bottom: 0px;
  outline: 0ch;
  height: 30px;
  width: 90%;
  margin-top: 8px;
  margin-left: 10px;
  padding-left: 12px;
  margin-bottom: 0px;
  margin-right: 20px;
  border-right: 0ch;
  border-color: #444141;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 18px;
  text-align: left;
  padding-left: 16px;
}
.lnae {
  border-top: 1px;
  border-left: 0ch;
  color: #080040;
  border: 0cm;
  letter-spacing: 1.5px;
  padding-bottom: 0px;
  outline: 0ch;
  height: 30px;
  width: 90%;
  margin-top: 8px;
  margin-left: 10px;
  padding-left: 12px;
  margin-bottom: 2px;
  margin-right: 20px;
  border-right: 0ch;
  border-color: #444141;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
  line-height: 18px;
  text-align: left;
  padding-left: 16px;
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
  margin-top: 8px;
  align-items: center;
}

.regstr {
  font-size: 32px;
  font-weight: 700px;
  font-family: "Abril Fatface";
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
