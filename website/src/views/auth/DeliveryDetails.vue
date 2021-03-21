<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div class="dsplay ion-padding theme-color">
          <div @click="() => router.back()">
            <strong> &lt; </strong>
          </div>
          <!-- <div class="head" @click="register">DONE</div> -->
        </div>
        <div class="dsplay ion-padding">
          <div class="regstr">Delivery Details</div>
          <!-- <div class="step"><p>Step2/3</p></div> -->
        </div>
        <div class="backPer">
          <div class="search">
            <div class="serchicon"></div>
            <input
              class="lname"
              v-model="qText"
              placeholder="Search"
              v-on:keyup="onSearch"
              v-on:keyup.enter="onStoreSearch"
            />
          </div>
        </div>
        <!-- <div class="text-align"><img class="mtop" src="../../public/assets/img/Oval.png" /></div> -->

        <div class="llable">Drop Options</div>
        <div>
          <div class="option">
            <div class="opt">
              <img class="img" src="../../../public/assets/img/door.png" />
              <span style="font-size: 18px; margin-left: 10px">
                Deliver to door</span
              >
            </div>
            <div class="checkbox">
              <ion-checkbox @ionChange="updatePrice()"> </ion-checkbox>
            </div>
          </div>
          <!-- <input
            class="lname"
            placeholder="First Name"
            maxlength="12"
            v-model="firstname"
          /> -->
          <div class="option">
            <div class="opt">
              <img class="img" src="../../../public/assets/img/land.png" /><span
                style="font-size: 18px;margin-left: 10px"
                >Pick up outside
              </span>
            </div>
            <div class="checkbox">
              <ion-checkbox @ionChange="updatePrice()"> </ion-checkbox>
            </div>
          </div>
        </div>

        <div style="display: none">
          <!-- <ion-fab-button>Default</ion-fab-button> -->
          <ion-fab style="position: absolute; bottom: 80px; right: 20px">
            <ion-fab-button class="fab">
              <img
                style="width: 20px"
                @click="enableLocation"
                src="../../../public/assets/img/gps.png"
              />
            </ion-fab-button>
          </ion-fab>
        </div>
        <!-- <div style="position:absolute; bottom:30px; right:0px;">
          <button style="outline:none" @click="register()">Next</button>
        </div> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonFab,
  IonFabButton,
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
      address: "",
      city: "",
      postalcode: "",
      lat: 0,
      lng: 0,
      loader: null,
    };
  },
  components: { IonPage, IonFab, IonContent, IonFabButton },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  methods: {
    /*  */
    async register() {
      if (!this.address) {
        await $apiService.presentToastWithOptions(
          "Address should not be empty."
        );
        return;
      }
      if (!this.city) {
        await $apiService.presentToastWithOptions("City should not be empty.");
        return;
      }
      if (!this.postalcode) {
        await $apiService.presentToastWithOptions(
          "Postal code should not be empty."
        );
        return;
      }
      await $apiService.showLoading();
      const userId = window.localStorage.getItem("USERID");

      const registerRes = await $apiService.putCall("user/address/" + userId, {
        Address: this.address,
        City: this.city,
        Postalcode: this.postalcode,
      });
      await $apiService.hideLoading();
      await $apiService.presentToastWithOptions(
        "Address has been updated successfully."
      );
      this.gotoPersonalInfo();
    },
    async gotoPersonalInfo() {
      this.$router.push({ path: "/enter-phone" });
    },
    async getPermission() {
      console.log(this);

      const permission = await this.enableLocation();
    },
    /*  async enableLocation() {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(
          function success(pos) {
            const crd = pos.coords;

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            resolve(true);
          },
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            resolve(false);
          },
          options
        );
      });
    }, */
    async enableLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
        },
        (error) => {
          console.log("Error getting location");
        }
      );
    },
  },
});
</script>

<style scoped>
.fab {
  --background: white;
  --box-shadow: 0;
}
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.text-align {
  text-align: center;
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
.head {
  font-family: Poppins;
  color: #00b2ce;
  font-weight: 600;
}
.opt {
  align-items: center;
  display: flex;
}
.checkbox {
  margin-left: 120px;
}
.search {
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
  background-color: #f7f8fa;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  opacity: 0.5;
  font-size: 15px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 10px;
  padding: 15px;
  margin-bottom: 0px;
}
.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  opacity: 0.5;
  font-size: 15px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 10px;
  padding: 15px;
  margin-bottom: 0px;
}

.lname {
  border-top: 1px;
  border-left: 0ch;
  height: 30px;
  /* margin-right: 20px; */
  border-right: 0ch;
  border-color: #f1f3f8;
  margin-top: 10px;
  font-family: Poppins;
  /* font-weight: 600; */
  margin-bottom: 10px;
  outline: none;
  width: 100%;
}
.backPer {
  background-color: #f8f8f8;
  font-size: 15px;
  flex-direction: row;
  align-content: left;
  margin-top: 25px;
  text-align: left;
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
.img {
  width: 30px;
  padding: 5px;
}
.serchicon {
  background-image: url("../../../public/assets/img/loc.png");

  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-top: 15px;
  margin-left: 25px;
  padding: 10px;
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

.regstr {
  font-size: 32px;

  font-family: "Permanent Marker", cursive;
  font-weight: 400;
}
.step {
  font-family: Poppins;
  font-weight: 400;
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
