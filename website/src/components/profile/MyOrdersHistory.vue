<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding">
        <div class="dsply">
          <div
            class="arrow"
            @click="
              displayMode = 'COMING';
              loadOrders();
            "
            v-bind:class="{ 'arrow-border': displayMode == 'COMING' }"
          >
            Coming
          </div>
          <div
            class="arrow"
            @click="
              displayMode = 'HISTORY';
              loadOrders();
            "
            v-bind:class="{ 'arrow-border': displayMode == 'HISTORY' }"
          >
            History
          </div>
        </div>
        <div v-if="displayMode == 'COMING' && !noDataMessage" class="no-data">
          No orders found.
        </div>
        <div v-if="noDataMessage">
          <div class="dsplay" v-if="displayMode == 'COMING'">
            <div class="slider2">
              <div v-for="item in comingOrders" :key="item._id">
                <div
                  class="slide-box-new"
                  @click="
                    () =>
                      router.push({
                        path: '/tabs/profile/orders-history/comming-orders',
                      })
                  "
                  v-for="menu in item.Items"
                  v-bind:key="menu.MenuId"
                >
                  <div class="card-new">
                    <img :src="menu.MenuId.Image" class="img-coming" />
                    <div class="contain">
                      <!-- <div style="text-align: left;">
                    <span class="comming" style="">{{
                      item.DeliveryStatus
                    }}</span>
                  </div> -->

                      <div class="saladname" style="margin: 5px">
                        <div style="font-family: 'Permanent Marker', cursive">
                          {{ menu.MenuId.Name }}
                          <p class="dv-x">x {{ menu.Quantity }}</p>
                        </div>
                      </div>

                      <!-- <p style="  font-family: 'Permanent Marker', cursive;N">${{ menu.Price }}</p> -->
                      <div style="text-align: left">
                        <span class="comming" style="">{{
                          item.DeliveryStatus
                        }}</span>
                        <span
                          style="
                            color: #e01b78;
                            font-family: 'Permanent Marker', cursive;
                            padding: 22px;
                            font-size: 14px;
                          "
                          >${{ menu.Price }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="displayMode == 'HISTORY' && !DataMessage" class="no-data">
          No orders found.
        </div>
        <div v-if="DataMessage">
          <div class="dsplay" v-if="displayMode == 'HISTORY'">
            <div class="slider2">
              <div
                class="slide-box"
                v-for="item in historyOrders"
                :key="item._id"
              >
                <div class="card">
                  <div class="datecss">
                    {{ item.DeliveryStatus }}
                  </div>
                  <img :src="item.Image" class="card-img" />
                  <div class="contain">
                    <div
                      class="chicken"
                      style="display: flex"
                      v-for="menu in item.Items"
                      v-bind:key="menu.MenuId"
                    >
                      {{ menu.MenuId.Name }}
                      <span class="dv-x"> x {{ menu.Quantity }} </span>
                    </div>
                    <div class="lecase">{{ item.RestaurantId.Distance }}</div>
                  </div>
                </div>
              </div>
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
  IonIcon,
  loadingController,
  toastController,
  IonPage,
  IonInput,
  IonList,
} from "@ionic/vue";

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";

export default defineComponent({
  data() {
    return {
      loading: true,
      noDataMessage: false,
      DataMessage: false,
      historyOrders: [],
      comingOrders: [],
      displayMode: "COMING",
    };
  },

  components: { IonContent, IonPage },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      await $apiService.showLoading();
      const userId = window.localStorage.getItem("USERID");
      const test = await $apiService.getCall("orders/" + userId);
      const allOrders = test.apidata || [];
      console.log("this is my comming data");
      console.log(test);
      this.comingOrders = allOrders.filter((od: any) => od.DeliveryStatus);

      if (this.comingOrders.length > 0) {
        this.noDataMessage = true;
      }
      this.historyOrders = allOrders.filter(
        (od: any) => od.DeliveryStatus == "DELIVERED"
      );
      if (this.historyOrders.length > 0) {
        this.DataMessage = true;
      }
      await $apiService.hideLoading();
    },
  },
});
</script>

<style scoped>
.card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.no-data {
  padding: 20px;
  font-family: Poppins;
  margin-top: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  font-size: 20px;
}
.slide-box-new {
  width: 100%;
}
.slide-box {
  min-width: 50%;
  max-width: 50%;
}
.datecss {
  position: absolute;
  padding-left: 8px;
  font-size: 10px;
  background: #feb713;

  color: #e01b78;
  font-family: "Permanent Marker", cursive;
  padding-right: 8px;
  margin: 12px;

  border-radius: 50px;
}
.dv-x {
  color: #9c9eaf;
  /* padding-top: 4px; */
  font-size: 14px;
  font-weight: 400;
  margin: 5px;
  font-family: "Permanent Marker", cursive;
  margin: 0px;
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
 font-family: "Permanent Marker", cursive;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.comming {
  margin-top: 16px;
  background: #feb713;
  font-family: "Permanent Marker", cursive;
  border-radius: 16px;
  color: #e01b78;
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
  margin: 10px;
  /* 5px rounded corners */
}

.card-new {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
  transition: 0.5s;
  border-radius: 10px;
  padding: 16px;
  display: flex;
}

.contain {
  padding: 10px;
}
/* Add rounded corners to the top left and the top right corner of the image */
.img-coming {
  border-radius: 15px;
  height: 250px;
  width: 50%;
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
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}

.arrow-border {
  border-bottom: 3px solid #00b2ce;
  text-align: center;
  padding-bottom: 6px;
}

/* .arrow:active{
  border-bottom: 3px solid  #00b2ce;;
  text-align: center;
} */

.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;
  width: 100%;
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
  align-items: center;
}
.dsply {
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  width: 70%;
  margin: 0 auto;
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
