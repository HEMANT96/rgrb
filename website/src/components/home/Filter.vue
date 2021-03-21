<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div class="dsplay">
          <img
            class="arrow-icon"
            @click="() => router.back()"
            src="../../../public/assets/img/arrwleft.png"
          />
          <div class="fltr">FILTER</div>
          <div class="sze" @click="applyBtn">Apply</div>
        </div>
        <div class="dsplay"><p class="whr">WHERE</p></div>
        <div class="dspy">
          <div class="regstr">
            <img
              class="serchicon"
              @click="getPermission"
              src="../../../public/assets/img/location.png"
            />
             <input v-model="address"
               class="lname" type="text"   placeholder="Current Location"  />
               
            <input   @click="showCurrent" style="display:none"/>
          </div>
          <div class="arrow-size">></div>
        </div>
        <div class="dsplay"><p class="whr">PRICE RANGE</p></div>
        <div class="dsplay">
          <div class="slidecontainer">
            <ion-item>
              <ion-range
                style="--bar-height: 3px"
                v-model="price"
                min="0"
                max="300"
                id="dual-range"
                dual-knobs
                pin
                color="dark"
              >
                <ion-label class="range" slot="start">$0</ion-label>
                <ion-label class="range" slot="end">$300</ion-label>
                <!-- <ion-icon slot="start" size="small" name="brush"></ion-icon>
            <ion-icon slot="end" name="brush"></ion-icon> -->
              </ion-range>
            </ion-item>
            <!-- <input
              type="range"
              class="sliderinpt"
              min="1"
              max="100"
              value="50"
            /> -->
          </div>
        </div>
        <div class="dsplay"><p class="wht">WHAT DO YOU LIKE?</p></div>
        <div class="dsplay">
          <div class="slider2">
            <div
              class="slide-box"
              v-for="item in categories"
              :key="item._id"
              @click="
                () =>
                  router.push({
                    path: '/tabs/search',
                    query: { catId: item._id },
                  })
              "
            >
              <div
                class="slide-box-image"
                v-bind:class="{ 'slide-box-image-active': item.selected }"
              >
                <img :src="item.Icon" />
              </div>
              <div class="slide-box-name">{{ item.Name }}</div>
            </div>

            <!--  <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Group-10.png"/>
          </div>
          <div class="slide-box-name">Fast food</div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Group-9.png" />
          </div>
          <div class="slide-box-name">Night life</div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Group-6.png" />
          </div>
          <div class="slide-box-name">Tea time</div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image theme-color">
            <img src="../../../publ     this.loadData();
ic/assets/img/Group-8.png" />
          </div>
          <div class="slide-box-name">Vegetarian</div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/octopus.png" />
          </div>
          <div class="slide-box-name">Sea food</div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/cocktail.png" />
          </div>
          <div class="slide-box-name">Drink</div>
        </div>

         <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/food-and-restaurant.png" />
          </div>
          <div class="slide-box-name">Fruit</div>
        </div>

         <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Group-10.png" />
          </div>
          <div class="slide-box-name">Cake</div>
        </div> -->
            <!-- <div class="specail1"></div>
        <div class="specail2"></div>
        <div class="specail3"></div>
        <div class="specail4"></div>
        <div class="specail5"></div>
        <div class="specail6"></div>
        <div class="specail7"></div>
        <div class="specail8"></div>
        <div class="specail9"></div> -->
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonRange, IonItem, IonLabel } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
declare const google: any;

export default defineComponent({
  name: "ExploreContainer",

  data() {
    return {
      categories: null,
      rstrs: [],
      restaurant: [],
      schterm: "",
      selectedBox: "pickup",
      address: '',
      price: {
        lower: 70,
        upper: 250,
      },
      loading: true,
      noDataMessage: false,
      RestaurantId: "-1",
    };
  },
  props: {
    name: String,
  },
  components: { IonContent, IonPage, IonRange, IonItem, IonLabel },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {
     if(window.localStorage.getItem("SELECTEDADDRESS")) {
      this.address = window.localStorage.getItem("SELECTEDADDRESS");
    }
    const restId = window.localStorage.getItem("RESTID");
    this.categories = await $dataService.getCategory();
    if ((this.categories || []).length == 0) {
      this.noDataMessage = true;
    }
    for (let c = 0; c < this.categories.length; c++) {
      if (this.categories[c]!) {
        this.categories[c]!.selected = false;
      }
    }
  },
  methods: {
    
  async getPermission() {
      const permission = await this.enableLocation();
      // modalController.dismiss({permission});
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
      showCurrent() {
      this.address = window.localStorage.getItem("SELECTEDADDRESS");
    },
    applyBtn() {
      const selectedIds = (this.categories.filter((c: any) => c.selected) || [])
        .map((c: any) => c._id)
        .join(",");
      this.router.push({ path: "/tabs/search", query: { catId: selectedIds } });
    },
  },
});
</script>

<style scoped>
.slide-box {
  /* max-width: 150px; */
  margin: 3px;
}
.range-bar {
  height: 3px;
}
.arrow-icon {
  margin-left: 8px;
  width: 21px;
  height: 21px;
}

.slide-box-image {
  background: #f1f3f8;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  padding: 0px;
}

.range {
  font-weight: 600;
  font-size: 14px;
}

/* .slide-box-image-active {
  background: #00b2ce;
} */
.theme-color {
  background: #00b2ce;
}

.slide-box-image img {
  margin-top: 14px;
  padding: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  margin: 10px 0px 20px 0px;
  font-family: poppins;
  font-weight: 400;
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
.range-slider {
  --ion-color-base: #1cb4cc;
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
.fltr {
  font-family: "Permanent Marker", cursive;

  font-size: 21px;
  font-style: normal;
  /* font-weight: 600; */
  line-height: 30px;
  letter-spacing: 1px;
  text-align: left;
}
.sze {
  /* width: 20px; */
  font-family: Poppins;
  color: #00b2ce;
  font-weight: 600;
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
  font-size: 11px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.06em;
  text-align: left;
}
.wht {
  padding-left: 10px;
  font-family: Lucida Grande;
  font-size: 11px;
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
  font-size: 24px;
  color: #8c8c8c;
  margin-left: 20px;
}

.specail1 {
  background-image: url("../../../public/assets/img/brkfst.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail2 {
  background-image: url("../../../public/assets/img/brkfst.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail3 {
  background-image: url("../../../public/assets/img/Nightlifo.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail4 {
  background-image: url("../../../public/assets/img/Teatime.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail5 {
  background-image: url("../../../public/assets/img/seefood.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail6 {
  background-image: url("../../../public/assets/img/Drink.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail7 {
  background-image: url("../../../public/assets/img/Drink.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail8 {
  background-image: url("../../../public/assets/img/brkfst.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.specail9 {
  background-image: url("../../../public/assets/img/cake.png");
  background-repeat: no-repeat;
  width: 100px;
  height: 150px;
  padding-left: 0px;
  margin-left: 12px;
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 4px;
  justify-content: space-around;
}

.catgries {
  margin-left: 10px;
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
}
.serchicon {
  width: 37px;
  height: 35px;
  margin-left: 0px;
  padding: 10px;
}
.avtar {
  background-image: url("../../../public/assets/img/Avatar.png");
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  radius: 40px;
}
.avt {
  width: 300px;
  display: flex;
}
.avt p {
  padding: 10px;
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
  color: black;
  border: 0cm;
  font-size: 14px;
  padding-bottom: 10px;
  outline: 0ch;
  height: 30px;
  width: 90%;

  font-weight: 600;
  margin-top: 8px;
  margin-bottom: 0px;
  margin-right: 20px;
  border-right: 0ch;
  border-color: #444141;
}
.backPer {
  color: #363636;
  line-height: 21px;
  padding-left: 14px;
  font-size: 14px;
  font: "Poppins";
  flex-direction: row;
  align-content: left;
}

.display {
  display: flex;
  align-content: space-between;
  margin-top: 30px;
}

.dsplay {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  font-family: Lucida Grande;
  font-weight: 400;
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
  font-family: poppins;
  display: flex;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  /* font-size: 16px; */
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
