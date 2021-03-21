<template>
  <ion-page>
    <ion-content>
      <!-- <img class="back-image" src="../../../public/assets/img/WhatsApp.png" /> -->

      <div class="my-custom-class1">
        <div class="top-header">WHERE ARE YOU AT?</div>
        <div class="location-modal">
          <div>
            <div class="box">
              <div class="ads">Address</div>
              <div class="ads-btm">
                <!-- <div>1234 Ave South West</div> -->
                <input v-model="address" id="auto-complete-text"
                class="ads-btm" type="text" style="background: transparent;  width:98%; margin-left:-10px; overflow:hidden; outline:none; border: none;" placeholder="Input Address" />
                <img
                  src="../../../public/assets/img/loc2.png"
                  style="height: 24px"
                  @click="showCurrent"
                />
              </div>
            </div>
            <div class="boxs">
              <div
                @click="openChooser('pickup')"
                class="diiv-box"
                v-bind:class="{ 'diiv-box-selected': selectedBox == 'pickup' }"
              >
                <img
                  class="dv-insde"
                  src="../../../public/assets/img/pickup.png"
                />
                <!-- <div class="piups">Pickup</div> -->
              </div>
              <div
                @click="openChooser('delivery')"
                class="diiv-box"
                v-bind:class="{
                  'diiv-box-selected': selectedBox == 'delivery',
                }"
              >
                <img
                  class="dv-insde"
                  src="../../../public/assets/img/delivery.png"
                />
                <!-- <div class="piups">Delivery</div> -->
              </div>
            </div>
            <div class="boxed" v-for="rst in rstrs" v-bind:key="rst._id" @click="getPermission(rst)">
              <div style="display: flex; flex-direction: row">
                <img :src="rst.Image" style="width: 60px; object-fit: cover" />
                <div class="beltline">
                  <div class="rst-name">{{ rst.Name }}</div>
                  <div class="rst-address" style="font-size: 14px">
                    {{ rst.Address }}
                  </div>
                </div>
              </div>
              <div class="order-row">
                <div class="order-now">Order Now</div>
              </div>
            </div>
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
      lat: "",
      lng: "",
      rstrs: [],
      restaurant: [],
      categories: [],
      schterm: "",
      selectedBox: "delivery",
      address: ''
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
     /*   const _self = this;
       const input = document.getElementById("auto-complete-text");
       const autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, "place_changed", function () {
     let place = autocomplete.getPlace();
      _self.address = place.formatted_address;
      _self.lat = place.geometry.location.lat();
      _self.lng = place.geometry.location.lng();
      // console.log(place.formatted_address);
    }); */
    if(window.localStorage.getItem("SELECTEDADDRESS")) {
      this.address = window.localStorage.getItem("SELECTEDADDRESS");
    }
    this.loadData();
  },
  methods: {
    showCurrent() {
      this.address = window.localStorage.getItem("SELECTEDADDRESS");
    },
    onSearch(e: any) {
      if (e.keyCode === 13 && e.target.value) {
        this.router.push({
          path: "/tabs/search",
          query: { q: e.target.value },
        });
      }
    },
    async getPermission(rst: any) {
      this.addAdres();
      debugger;
      const currentId = window.localStorage.getItem($dataService.KEYS.RESTID);
      const pickedId = rst._id;
      if (currentId != pickedId) {
        window.localStorage.setItem($dataService.KEYS.RESTID, pickedId);
        //modalController.dismiss({ changed: true });
      } else {
        //modalController.dismiss({ changed: false });
      }
      this.$router.push({ path : '/tabs/explore/' });
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
    },
    async addAdres(){
      const userId = window.localStorage.getItem("USERID");
      const city = window.localStorage.getItem("");
      const postalcode = window.localStorage.getItem("");
      const registerRes = await $apiService.putCall("user/address/" + userId, {
        Address: this.address,
        City: city,
        Postalcode: postalcode,
      });
      console.log(registerRes);
    },
    async loadData() {
      const rstrs = await $dataService.getRestaurant();
      this.rstrs = rstrs || [];
      // const restId = window.localStorage.getItem($dataService.KEYS.RESTID);
      // this.restaurant = (rstrs || []).find((r: any) => r._id == restId);

      // this.categories = await $dataService.getCategory();
      // const userId = window.localStorage.getItem("USERID");
      // const test = await $apiService.getCall("orders/" + userId);
      // const allOrders = test.apidata || [];
      // console.log("allorderdata");
      // console.log(allOrders);
      // console.log({ restaurant: this.restaurant, categories: this.categories });
    },
    async openChooser(type: any) {
      this.selectedBox = type;
      window.localStorage.setItem("SELECTEDBOX", this.selectedBox)
    },
  },
});
</script>

<style scoped>
.rst-name {
  font-size: 18px;
  color: #fdce02;
  font-family: "Permanent Marker";
}
.rst-address {
  color: #ffffff;
  font-family: "Futura PT";
}
.top-header {
  font-family: "Permanent Marker", cursive;
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
  font-family: "Permanent Marker", cursive;
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
  font-family: "Permanent Marker", cursive;
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
  border: 1px solid #e01b78;
  background-color: rgba(0, 5, 33, 0.62);
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  /* margin-left: 20px;
  width: 88%;
  height: 70px; */
  border-radius: 18px;
}
.boxed {
  background-color: rgba(0, 5, 33, 0.52);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 10px;
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
  border-radius: 18px;
  margin: 10px 0px;
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
.diiv-box-selected {
  border: 3px solid #fdce02;
}
.diiv-box {
  background: white;
  display: flex;
  flex-direction: column;
  /* margin: 20px 20px 0px 0px;
  width: 100px;
  height: 90px; */
  border-radius: 8px;
  margin-left: 6px;
  margin-right: 6px;
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
.order-row {
  display: flex;
  justify-content: flex-end;
      margin-top: 10px;
}
.order-now {
  padding: 4px 20px;
  border-radius: 16px;
  background: white;
  color: #00b2ce;
  font-family: "Permanent Marker";
}
.vox {
  position: absolute;
  top: 100px;
  left: 0px;
  right: 0px;
  height: 400px;
  justify-content: center;
}
.delsvery {
  text-align: center;
  margin-bottom: 5px;
}
.ads-btm {
  color: #e01b78;
  font-weight: bold;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 15px 30px;
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
