<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div class="dsply">
          <div @click="() => router.back()" class="arrow">&lt;</div>
        </div>
        <div class="dsply"><div class="addrs">Address</div></div>
        <div class="dsplay">
          <div class="slider2">
            <div class="slide-box" v-for="item in Address" :key="item._id">
              <div class="card">
                <div class="contain1">
                  <div class="chicken">
                    <div class="cotainer22">
                      <input
                        type="checkbox"
                        v-model="item.IsChecked"
                        @change="onSelect(item)"
                      />
                      <!-- <span  class="checkmark"></span> -->
                    </div>
                    <div>
                      <div class="storePick">{{ item.Nick }}</div>
                      <div class="bltline">{{ item.Address }}</div>
                    </div>
                  </div>
                  <div
                    style="
                      text-align: right;
                      font-size: 12px;
                      width: 100px;
                      color: #3b55f3;
                    "
                  >
                    <span for="agree" v-if="item.IsDefault"> Default Address </span>
                  </div>
                </div>
              </div>
            </div>

            <div style="text-align: center; margin-top: 25%; width: 85%">
              <ion-button
                v-if="isSelectedAdress()"
                @click="deliverHere"
                expand="block"
                class="button"
                style="--background: #ec2885"
                >DELIVER HERE</ion-button
              >
              <ion-button @click="openAddModal" expand="block" class="button"
                >ADD NEW ADDRESS</ion-button
              >
            </div>
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
  IonPage,
} from "@ionic/vue";

import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import { modalController } from "@ionic/vue";
import AddAddressModal from "./AddAddressModal.vue";
import $apiService from "./../../api-service";

declare const window: any;

export default defineComponent({
  props: {
    name: String,
  },
  data() {
    return {
      Address: [],
      loading: true,
      noDataMessage: false,
      selectedAdress: "",
    };
  },
  components: { IonContent, IonPage, IonButton },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {
    this.displayAddress();
  },
  methods: {
    isSelectedAdress() {
      return (this.Address || []).find((a: any) => a.IsChecked);
    },
    onSelect(item: any) {
      //console.log(item.IsChecked);
      // item.IsChecked = !item.IsChecked
      for( let i = 0; i < (this.Address || []).length; i++){
        if(item.Address != this.Address[i].Address){
          this.Address[i].IsChecked = false;
        }
      }
      this.selectedAdress = item.Address;
    },
    async deliverHere() {
      if (this.selectedAdress) {
        await $apiService.showLoading();
        const orderId = this.$router.currentRoute.value.query.orderid;
        // alert("orders/update-address/" + orderId);
        const registerRes = await $apiService.postCall(
          "orders/update-address/" + orderId,
          { Address: this.selectedAdress }
        );
        console.log(registerRes, "registerRes");
        // alert(
        //     "Order has been placed and saved to database , payment gateway is in progreess, You will be redirected to the orders history screen for now"
        // );
        //await $apiService.presentToastWithOptions("Order has been placed.");
        //this.$router.push({ path: "/tabs/profile/orders-history" });

         const response: any = await $apiService.postCall("orders/create-checkout-session", { orderId });
         console.log(response);
         window.stripeLib.redirectToCheckout({ sessionId: response.apidata.id });
         await $apiService.hideLoading();

      } else {
        await $apiService.presentToastWithOptions(
          "Please select delivery address."
        );
      }
    },
    async displayAddress() {
      this.selectedAdress = "";
      const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.getCall("user/" + userId);
      console.log(registerRes);
      this.Address = (registerRes.apidata || {}).Addresses || [];
      for (let ca = 0; ca < (this.Address || []).length; ca++) {
        this.Address[ca].IsChecked = false;
      }
      if ((this.Address || []).length == 0) {
        this.noDataMessage = true;
      }
    },
    async openAddModal() {
      const modal = await modalController.create({
        component: AddAddressModal,
        cssClass: "my-custom-class2",
        componentProps: {
          title: "New Title",
        },
      });

      modal.onDidDismiss().then(async (data) => {
        console.log(data.data);
        this.displayAddress();
      });
      console.log(this.Address);

      await modal.present();
    },
  },
});
</script>

<style scoped>
.storePick {
  font-family: Poppins;
  width: 170px;
  font-size: 15px;
  padding-bottom: 0px;
  padding-top: 0px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.cotainer {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.cotainer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-width: 2px;
  border-color: #000000;
  border-radius: 15px;
}

/* On mouse-over, add a grey background color */
.cotainer:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.cotainer input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.button {
  --border-radius: 25px;
  --background: #00b2ce;
  letter-spacing: 2px;
  height: 45px;
  font-family: 'Permanent Marker', cursive;
}
.bltline {
  font-family: Poppins;
  font-size: 12px;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-top: 0px;
  margin-top: 0px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.datecss {
  position: absolute;
  padding-left: 8px;
  font-size: 10px;
  padding-right: 8px;
  margin: 12px;
  background: #00b2ce;
  color: white;
  border-radius: 50px;
}
.lecase {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.chicken {
  font-family: Poppins;
  display: flex;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  align-items: center;
}
.cotainer22 {
  margin-right: 10px;
}
.chikn {
  font-family: Poppins;
  display: flex;
  padding-right: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.addrs {
  padding-top: 10px;
 font-family: 'Permanent Marker', cursive;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
}
.comming {
  margin-top: 16px;
  background: #00b2ce;
  border-radius: 16px;
  color: white;
  font-size: 10px;
  width: 48%;
  padding-top: 4px;
  text-align: center;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
  transition: 0.5s;
  border-radius: 10px;
  margin: 5px;
  /* 5px rounded corners */
}

.contain1 {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 15px;
  height: 100px;
  width: 140px;
}

.slide-box-image {
  background: #f1f3f8;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  padding: 20px;
}

.slide-box-image:active {
  background: #00b2ce;
}
.theme-color {
  background: #00b2ce;
}

.slide-box-image img {
  padding: 17px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  margin: 10px 0px 20px 0px;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}
.sze {
  width: 20px;
}
.sliderinpt {
  width: 95%;
  height: 4px;
  color: white;
  margin-left: 10px;
}
.whr {
  padding-left: 10px;
  font-family: Poppins;
  font-size: 6px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.06em;
  text-align: left;
}
.slider1 {
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.arrow-size {
  font-size: 24px;
  color: #8c8c8c;
  margin-right: 0px;
}
.arrow {
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  padding-top: 20px;
  letter-spacing: 0em;
  text-align: left;
}

.arrow-border {
  border-bottom: 3px solid #00b2ce;
  width: 21%;
  text-align: center;
}


.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 5px;
  justify-content: space-evenly;
}

.text-align {
  text-align: center;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}

.display {
  display: flex;
  align-content: space-between;
  margin-top: 30px;
}

.dsplay {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 10px;
  align-items: center;
}
.dsply {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0px;
  padding-top: 15px;
  padding-right: 30px;
  padding-left: 30px;
  align-items: center;
}
.dspy {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  /*   border-bottom-color:#F1F3F8;
 */
  margin-left: 12px;
  width: 90%;
  position: relative;
  z-index: 1;
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
.regstr {
  line-height: 43.17px;
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
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
