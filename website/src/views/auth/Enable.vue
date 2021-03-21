<template>
  <ion-page>
    <ion-content>
      <!-- <img class="back-image" src="../../../public/assets/img/WhatsApp.png" /> -->

      <div class="my-custom-class1">
        <div class="top-header">WHERE ARE YOU AT?</div>
        <div class="location-modal">
          <img
            class="img-mocal"
            src="../../../public/assets/img/enable-location.png"
          />

          <div class="modal-text ion-padding">
            <div class="location-text">
              Enable your location for easily order
            </div>

            <div class="act-btn1" @click="getPermission">ENABLE LOCATION</div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { modalController } from "@ionic/vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
import { defineComponent } from "vue";

declare const google: any;

export default defineComponent({
  data() {
    return {
      restaurant: [],
      categories: [],
      schterm: "",
    };
  },
  components: { IonPage, IonContent },
  props: {
    name: String,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {
    // this.loadData();
  },
  methods: {
    onSearch(e: any) {
      if (e.keyCode === 13 && e.target.value) {
        this.router.push({
          path: "/tabs/search",
          query: { q: e.target.value },
        });
      }
    },
    async getPermission() {
      const permission = await this.enableLocation();
      // modalController.dismiss({permission});
      this.$router.push({ path: "/selection" });
    },
    enableLocation() {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(
          function success(pos) {
            debugger;
            const crd = pos.coords;

          const latlng = {
              lat: crd.latitude,
              lng: crd.longitude
            };

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, (results: any, status: any) => {
              if (status === "OK") {
                if (results[0]) {
                 window.localStorage.setItem("SELECTEDADDRESS",results[0].formatted_address)
                } else {
                  window.alert("No results found");
                }
              } else {
                window.alert("Geocoder failed due to: " + status);
              }
              resolve(true);

            });

            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            
          },
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
            resolve(false);
          },
          options
        );
      });
    },
    async loadData() {
      const rstrs = await $dataService.getRestaurant();
      const restId = window.localStorage.getItem($dataService.KEYS.RESTID);
      this.restaurant = (rstrs || []).find((r: any) => r._id == restId);

      this.categories = await $dataService.getCategory();
      const userId = window.localStorage.getItem("USERID");
      const test = await $apiService.getCall("orders/" + userId);
      const allOrders = test.apidata || [];
      console.log("allorderdata");
      console.log(allOrders);
      console.log({ restaurant: this.restaurant, categories: this.categories });
    },
    async openChooser() {
      // const modal = await modalController.create({
      //   component: RestaurantModal,
      //   cssClass: "my-custom-class",
      //   componentProps: {
      //     title: "New Title",
      //   },
      // });
      // modal.onDidDismiss().then(async (data) => {
      //   console.log(data.data);
      //   if(data.data.changed) {
      //     this.loadData();
      //   }
      // });
      // await modal.present();
    },
  },
});
</script>

<style scoped>
.top-header {
      font-family: 'Permanent Marker', cursive;
    font-size: 40px;
    font-weight: 600;
    color: #ec2885;
    text-align: center;
}
.location-modal {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 100%; */
  /* padding: 20% 10% 20% 0% !important; */
  border-radius: 10px;
  background: white;
}
.img-mocal {
  height: 35%;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
}
.modal-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  border-radius: 0px 0px 10px 10px;
}

.location-text {
  color: #000521;
   font-family: 'Permanent Marker', cursive;
  font-size: 22px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  margin-bottom: 60px;
}
.act-btn1 {
  border-radius: 60px;
  background-color: #ec2885;
  color: white;
  text-align: center;
  padding: 10px;
   font-family: 'Permanent Marker', cursive;
}

.my-custom-class1 {
  background: url("../../../public/assets/img/WhatsApp.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  height: 100%;
  padding: 10% !important;
}

/* .back-image {
  height: 100%;
  width: 100%;
  position: relative;
  object-fit: cover;
} */
.triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 16px solid #fff;
  margin-left: 10px;
}
.box {
  background-color: black;
  opacity: 0.76;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  width: 88%;
  height: 70px;
  border-radius: 18px;
}
.boxed {
  background-color: black;
  opacity: 0.76;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 20px;
  width: 88%;
  margin-top: 50px;
  height: 100px;
  border-radius: 18px;
}
.bxed {
  background-color: black;
  opacity: 0.76;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 20px;
  width: 88%;
  height: 100px;
  border-radius: 18px;
}
.boxs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 20px;
  width: 88%;
  height: 70px;
  border-radius: 18px;
}
.div-box {
  background: white;
  display: flex;
  flex-direction: column;
  margin: 20px 0px 0px 0px;
  width: 100px;
  border-radius: 8px;
  height: 90px;
}
.diiv-box {
  background: white;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0px 0px;
  width: 100px;
  height: 90px;
  border-radius: 8px;
}
.beltline {
  color: #e01b78;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-top: 2px;
  padding: 0px 10px;
}
.grp-9 {
  width: 100%;
  height: 70px;
  padding: 20px 20px 10px 20px;
}
.yyc-name {
  margin-left: 120px;
  margin-top: -5px;
  font-size: 16px;

  font-family: poppins;
  font-weight: 500;
}

.arrow {
  position: absolute;
  color: white;
  margin-left: 10px;
  margin-top: 25px;
  font-size: 25px;
}
.restro-details {
  position: relative;
  bottom: 145px;
  width: 100%;
  color: white;
}

.restro-details .restro-name {
  font-family: Abril Fatface;
  font-weight: 400;
  display: flex;
  font-size: 45px;
  align-items: flex-end;
}

.restro-details img {
  height: 50px;
  margin-bottom: 4px;
  margin-left: 8px;
}
.lo-img {
  margin-top: 10px;
  padding: 30px 15px 0px 25px;
}
.restro-details .restro-welcome {
  font-size: 20px;
  font-family: "Permanent Marker", cursive;
  color: #e01b78;
  font-weight: 500;
  position: absolute;
  bottom: 80px;
  left: 6px;
}

.search-holder {
  bottom: 44px;
  position: relative;
}

.slide-box {
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  max-width: 100px;
  text-align: center;
  /* margin-left:20px; */
  margin: 10px 0px;
  height: 150px;
  width: 100px;
  border-radius: 10%;
}
.order-now {
  margin: 2px 15px 0px 70px;
  padding: 2px 10px 2px 15px;
  width: 120px;
  border-radius: 16px;
  background: white;
}
.vox {
  position: absolute;
  top: 100px;
  left: 0px;
  right: 0px;
  height: 400px;
  justify-content: center;
  align-item: center;
}
.delsvery {
  text-align: center;
  margin-bottom: 5px;
}
.ads-btm {
  color: #e01b78;
  font-weight: bold;
  margin-top: 10px;
  padding: 28px 0px 0px 0px;
}
.slide-box-image {
  border-radius: -26%;
  padding: 20px 10px;
}

.slide-box-image img {
  max-height: 40px;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  font-family: Poppins;
  /* margin-top: 10px; */
  font-size: 15px;
  color: #8c8c8c;
}

.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}
.flex-container {
  display: flex;
  margin-top: 420px;
}
.flex-container1 {
  display: flex;
}
.dv-insde {
  width: 100%;
  height: 70px;
  padding: 20px 20px 10px 20px;
}
.yyc {
  height: 24px;
  z-index: 100;
  /* width: 100%; */
  left: 179px;
  top: 372px;
  border-radius: nullpx;
  position: absolute;
  left: 47.73%;
  right: 24.27%;
  top: 45.81%;
  bottom: 51.23%;

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */

  color: #ffffff;
}
.piups {
  text-align: center;
  margin-bottom: 5px;
}
.img {
  height: 180px;
  width: 180px;
}
.top-holder {
  height: 55vh;
  min-height: 250px;
}
.mtop {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-align {
  text-align: center;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}
.breakfast {
  position: absolute;
  left: 12.89%;
  z-index: 100;
  right: 50.13%;
  top: 66.26%;
  bottom: 19.33%;
  height: 170px;
  width: 170px;
  /* left: 48.328125px; */
  /* top: 538.0703125px; */
  border-radius: 0px;
}
.coffee {
  height: 170px;
  width: 170px;
  z-index: 100;
  left: 24px;
  top: 632px;
  border-radius: 0px;
  position: absolute;
  left: 0;
  right: 66.93%;
  top: 77.83%;
  bottom: 9.85%;
}

.search {
  /* position: absolute; */
  /* left: 6.4%;
  right: 6.4%;
  top: 53.82%;
  bottom: 40.76%; */

  /* filter: drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.08)); */
  /* height: 15px;
  z-index: 1000; */
  /* width: 327px;
  left: 40px;
  top: 380px; */
  border-radius: 40px;
  font-family: "Poppins";
  --border-radius: 30px;
  font-size: 16px;
  font-style: normal;
  padding: 0px;
  padding-top: -10px !important;
  padding-bottom: -10px !important;
  font-weight: 400;
  opacity: 0.999;
  height: 40px;
  background: rgb(245, 245, 245);
  /* line-height: 24px; */
  letter-spacing: 0em;
  text-align: left;
}
.Button {
  height: 60px;
  width: 60px;
  left: 245px;
  top: 280px;
  z-index: 100;
  border-radius: 0px;
  position: absolute;
  /* left: 80.27%; */
  right: 11.73%;
  /* top: 41.26%; */
  bottom: 55.05%;
  filter: drop-shadow(0px 4px 10px rgba(59, 85, 243, 0.25));
}
.Regrub {
  position: absolute;
  z-index: 1000;
  left: 6.13%;
  right: 22.67%;
  top: 36.33%;
  bottom: 52.71%;

  font-family: Abril Fatface;
  font-style: normal;
  font-weight: normal;
  font-size: 66px;
  line-height: 89px;
  /* identical to box height */

  color: #ffffff;
  height: 89px;
  width: 100%;
  left: 23px;
  top: 250px;
  border-radius: nullpx;
}
.Welcome {
  z-index: 100;
  height: 33px;
  /* width: 143px; */
  left: 9px;
  top: 235px;
  border-radius: nullpx;
  position: absolute;
  left: 2.4%;
  right: 59.47%;
  /* top: 33.37%; */
  bottom: 62.56%;

  /* font-family: Poppins; */
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  /* identical to box height */

  color: #ffffff;
}
.lunch {
  height: 170px;
  z-index: 100;
  width: 170px;
  left: 137px;
  top: 513px;
  border-radius: 0px;
  position: absolute;
  left: 30%;
  /* right: 36.8%; */
  top: 60%;
  /* bottom: 24.51%; */
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
.ads {
  color: #e01b78;
  font-weight: bold;
  padding: 5px 0px 0px 20px;
}

.lname {
  border-top: 1px;
  border-left: 0ch;
  padding-left: 10px;
  height: 30px;
  width: 90%;
  margin-right: 20px;
  margin-left: 20px;
  border-right: 0ch;
  border-color: black;
  margin-top: 10px;
  margin-bottom: 10px;
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
  align-items: center;
  margin-top: -50px;
}
.vector {
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  width: 375px;
  height: 812px;

  background: #ffffff;
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
