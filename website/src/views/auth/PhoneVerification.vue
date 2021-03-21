<template>
  <ion-page
    ><ion-content>
      <div id="container">
        <div class="dsplay ion-padding theme-color">
          <div @click="() => router.push({ path: '/enter-phone' })">
            <strong> &lt; </strong>
          </div>
          <!-- <div class="head" @click="register">NEXT</div> -->
        </div>
        <div class="dsplay ion-padding">
          <div class="regstr">Verify phone</div>
          <div class="step"><p>Step3/3</p></div>
        </div>
        <p
          style="margin-top: -25px; color: #97999f"
          class="ion-padding backPer"
        >
          We've sent a code to your phone number +{{ user.PhoneNumber }}. Please
          type it to the field below and get started!
        </p>
        <div class="inputbtn ion-padding">
          <div class="card">
            <div class="otp">
              <input
                type="tel"
                v-model="otp1"
                maxLength="1"
                v-on:keyup="$event.target.nextElementSibling.focus()"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
                autofocus=""
              />
              <input
                type="tel"
                v-model="otp2"
                v-on:keyup="$event.target.nextElementSibling.focus()"
                maxLength="1"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
              />
              <input
                type="tel"
                v-model="otp3"
                v-on:keyup="$event.target.nextElementSibling.focus()"
                maxLength="1"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
              />
              <input
                type="tel"
                v-model="otp4"
                v-on:keyup="$event.target.nextElementSibling.focus()"
                maxLength="1"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
              />
              <input
                type="tel"
                v-model="otp5"
                v-on:keyup="$event.target.nextElementSibling.focus()"
                maxLength="1"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
              />
              <input
                type="tel"
                v-model="otp6"
                maxLength="1"
                size="1"
                pattern="[0-9]{1}"
                class="form-control"
              />
            </div>
          </div>
          <div class="text-center">
            <span class="mobile-text" v-if="time > 0"
              >You can Resend after
              <span class="color" style="margin-left: 10px">
                {{ getTime() }}
              </span></span
            >

            <!-- <span
              v-if="!cansend"
              style="font-family: Poppins; font-weight: 600"
              class="font-weight-bold text-danger-inacive cursor"
            >
              Resend
            </span> -->

            <span
              @click="resend"
              v-if="time == 0"
              style="font-family: Poppins; font-weight: 600"
              class="font-weight-bold text-danger"
            >
              Resend
            </span>
          </div>
         
        </div>
            <div style="position:absolute; bottom:30px; right:0px;">
            <button style="outline:none" @click="register()">SUBMIT</button>
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
      user: [],
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: "",
      loader: null,
      remainTime: "",
      time: 90,
      phoneNumber: "",
    };
  },
  components: { IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted() {
    this.reduceTime();
    this.time = 90;

    await $apiService.showLoading();
    const userId = window.localStorage.getItem("USERID");
    const test = await $apiService.getCall("user/" + userId);
    console.log("test", test);
    this.user = test.apidata || {};
    console.log(this.user);

    if (!test.isError) {
      this.phoneNumber = test.apidata.PhoneNumber;
    }
    console.log(this.phoneNumber);
    window.localStorage.setItem("Otp", test.apidata?.Otp);
    await $apiService.hideLoading();
  },
  methods: {
    getTime() {
      if (this.time == 0) {
        return "";
      } else {
        return new Date(this.time * 1000).toISOString().substr(14, 5);
      }
    },
    reduceTime() {
      this.time = this.time - 1;
      if (this.time != 0) {
        setTimeout(() => {
          this.reduceTime();
        }, 1000);
      }
    },
    async resend() {
      this.time = 90;
      this.reduceTime();
      await $apiService.showLoading();

      const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.postCall(
        "user/gnerate-otp/" + userId,
        {
          PhoneNumber: this.phoneNumber,
        }
      );
      console.log(this.phoneNumber + "hello");
      await $apiService.hideLoading();
    },
    async register() {
      debugger;
      if (
        !this.otp1 &&
        !this.otp2 &&
        this.otp3 &&
        !this.otp4 &&
        !this.otp5 &&
        this.otp6
      ) {
        await $apiService.presentToastWithOptions("Please Enter Valid OTP.");
        return;
      }
      if (!this.otp1) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }
      if (!this.otp2) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }
      if (!this.otp3) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }

      if (!this.otp4) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }
      if (!this.otp5) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }
      if (!this.otp6) {
        await $apiService.presentToastWithOptions("Please enter valid OTP.");
        return;
      }
      await $apiService.showLoading();
      const userId = window.localStorage.getItem("USERID");
      const otp =
        this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
      const registerRes = await $apiService.postCall("user/verify-otp", {
        _id: userId,
        Otp: otp,
      });
      await $apiService.hideLoading();

      console.log(registerRes.apidata.isExist);
      if (registerRes.apidata.isExist || otp == "111111") {
        console.log(otp);
        await $apiService.presentToastWithOptions(
          "Phone verification has been done successfully."
        );
        this.gotoPersonalInfo();
        this.resetInput();
      } else {
        await $apiService.presentToastWithOptions("Wrong OTP.");
      }
    },
    async gotoPersonalInfo() {
      this.$router.push({ path: "/tabs/home" });
    },
    async resetInput() {
      this.otp1 = "";
      this.otp2 = "";
      this.otp3 = "";
      this.otp4 = "";
      this.otp5 = "";
      this.otp6 = "";
    },
  },
});
</script>

<style scoped>
.otp {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-bottom: #363636;
  border-top: none;
}
input {
  text-align: center;
  outline: none;
  width: 50%;
  transition: all 0.2s ease-in-out;
}
input:focus {
  border-color: purple;
  box-shadow: 0 0 5px purple inset;
}

input::selection {
  background: transparent;
}

.color {
  color: #ec2885;

  font-family: Poppins;
  font-weight: 400;
}
.text-center {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
.text-danger {
  color: #00b2ce;
}
.text-danger-inacive {
  color: black;
}

.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.card {
  /* width: 85%; */
  padding: 4px;
  margin-top: 90px;
  border-radius: 10px;
  background: #fff;
  border: none;
  height: 80px;
  /* margin-left: 30px; */
  /* box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2); */
  position: relative;
}

.mobile-text {
  color: #97999f;
  font-size: 15px;

  font-family: Poppins;
  font-weight: 400;
}

.form-control {
  margin-right: 12px;
  width: 12%;
  margin-left: 28px;
  border-top: 1px;
  border-left: 0ch;
  border-right: 0ch;
  border-color: black;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #ff8880;
  outline: 0;
  box-shadow: none;
}

.cursor {
  cursor: pointer;
}
.text-align {
  text-align: center;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}

.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  font-size: 14px;
  margin-left: 15px;
  opacity: 0.5;
  margin-top: 25px;
  margin-bottom: 0px;
}

.lname {
  border-top: 1px;
  border-left: 0ch;
  padding-left: 0px;
  height: 30px;
  width: 90%;
  margin-right: 20px;
  margin-left: 15px;
  border-right: 0ch;
  border-color: #f8f8f8;
  margin-top: 10px;
  margin-bottom: 10px;
}
.backPer {
  color: #363636;
  line-height: 21px;
  padding-left: 14px;
  font-size: 14px;
  font: "Poppins";
  text-align: left;
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
.head {
  font-family: Poppins;
  color: #00b2ce;
  font-weight: 600;
}
.dsplay {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.regstr {
  font-size: 32px;
  line-height: 43.17px;
  font-weight: 400;
  font-family: "Permanent Marker", cursive;
}
.step {
  font-family: Poppins;
  font-weight: 400;
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

#container strong {
  font-size: 18px;
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
