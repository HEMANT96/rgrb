<template>
  <ion-page>
    <ion-content>
      <div style="background-color: #00b2ce; height: 100vh; position: relative">
        <div>
          <img class="auth-image" src="../../../public/assets/img/Regrub.png" />
          <div
            class="signin-link"
            @click="() => router.push({ path: '/signin' })"
          >
            Sign in
          </div>
        </div>
        <div class="input">
          <div class="register">REGISTER</div>
          <div class="form">
            <ion-list>
              <ion-item>
                <img class="img" src="../../../public/assets/img/phone.png" />
                <ion-input
                  class="ion-input"
                  type="tel"
                  placeholder="Phone number"
                  maxlength="10"
                  v-model="phoneNumber"
                  @keyup="onlyNumeric"
                ></ion-input>
              </ion-item>

              <ion-item>
                <img class="img" src="../../../public/assets/img/lock.png" />
                <ion-input
                  v-model="password"
                  class="ion-pass"
                  maxlength="12"
                  id="pwd"
                  placeholder="Password"
                  type="password"
                ></ion-input>
                <img
                  class="img"
                  @click="togglePassword()"
                  id="img"
                  src="../../../public/assets/img/pass.png"
                />
              </ion-item>
              <ion-item>
                <img class="img" src="../../../public/assets/img/lock.png" />
                <ion-input
                  class="ion-pass"
                  id="pwds"
                  maxlength="12"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                  type="password"
                ></ion-input>
                <img
                  class="img"
                  @click="toggleConfirmPassword()"
                  id="imgs"
                  src="../../../public/assets/img/pass.png"
                />
              </ion-item>
            </ion-list>
          </div>
          <div
            style="text-align: center; margin-top: 25px; padding-bottom: 10px"
          >
            <ion-button @click="register" expand="block" class="button"
              >REGISTER</ion-button
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
  IonButton,
  IonIcon,
  IonItem,
  loadingController,
  toastController,
  IonPage,
  IonInput,
  IonList,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";

export default defineComponent({
  data() {
    return {
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      checkValue: "",
      regexPassword: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };
  },
  components: { IonButton, IonItem, IonPage, IonContent, IonInput, IonList },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  methods: {
    async register() {
      debugger;
      if (!this.phoneNumber && !this.password && !this.confirmPassword) {
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

      if (!this.confirmPassword) {
        await $apiService.presentToastWithOptions(
          "Confirm password is a mandatory field."
        );
        return;
      }

      if (this.password != this.confirmPassword) {
        await $apiService.presentToastWithOptions(
          "Confirm password does not match with new password."
        );
        return;
      }
      if (!this.regexPassword.test(this.password)) {
        await $apiService.presentToastWithOptions(
          "Password should be of atleast 8 characters and should contain 1 special Character, 1 upper case, 1 lower case and 1 number."
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
      const registerRes = await $apiService.postCall("user/register", {
        PhoneNumber: this.phoneNumber,
        Password: this.password,
      });
      if (!registerRes.apidata) {
        await $apiService.presentToastWithOptions(
          "Phone number already registered."
        );
      } else {
        window.localStorage.setItem("USERID", registerRes.apidata?._id);

        console.log(registerRes);
        this.resetInput();
        await $apiService.hideLoading();
        await $apiService.presentToastWithOptions(
          "Registration has been done successfully."
        );

        this.gotoPersonalInfo();
      }
    },
    onlyNumeric() {
      this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, "");
    },
    async gotoPersonalInfo() {
      this.$router.push({ path: "/personal-info" });
    },
    async resetInput() {
      this.confirmPassword = "";
      this.phoneNumber = "";
      this.password = "";
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
  right: 20px;
   font-family: 'Permanent Marker', cursive;
  /* font-weight: 500; */
  color: white;
  text-transform: uppercase;
}
.button {
  --border-radius: 25px;
  --background: #ec2885;
  height: 45px;
  letter-spacing: 4px;
    font-family: 'Permanent Marker', cursive;
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
  font-style: normal;
  font-weight: 400;
  text-align: left;
  margin-left: 10px;
}
.text-align {
  text-align: center;
}
.ion-input {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  margin-left: 10px;
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
.input {
  padding: 20px;
  background-color: var(--background);
  position: absolute;
  z-index: 1000;
  width: 100%;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  bottom: 0px;
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
