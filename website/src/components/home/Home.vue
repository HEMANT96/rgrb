<template>
  <div>
    <div class="ion-padding">
      <div class="data-row spacer-bottom">
        <div class="avt" v-if="user">
          <div class="avtar">
            <img
              :src="user.Image"
              style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
              "
            />
          </div>
          <div>{{ user.FirstName }} {{ user.LastName }}</div>
        </div>
        <div class="avt" v-if="!user">
          <div>Welcome Guest</div>
        </div>

        <div class="notify"></div>
      </div>

      <div class="data-row spac2">
        <div class="regstr">
          <div class="serchicon"></div>
          <input class="lname" v-model="schterm" v-on:keyup="onSearch" />
        </div>
        <div
          class="inputfront"
          @click="() => router.push({ path: '/tabs/home/filter' })"
        ></div>
      </div>
    </div>

    <div class="spac1 ion-padding-start">
      <div class="catgries" style="margin-bottom: 20px">Categories</div>

      <div class="slider4">
        <div
          v-for="item in categories"
          :key="item._id"
          @click="
            () =>
              router.push({
                path: '/tabs/search',
                query: { catId: item._id },
              })
          "
          style="padding-right: 20px"
        >
          <div style="">
            <img :src="item.Image" class="lunch-box-img" />
          </div>

          <div
            class="lunch-box"
            :style="{ 'background-color': item.BackColor }"
          >
            <div class="lunch-name">
              {{ item.Name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="space ion-padding-start"
      v-if="(daealoftheDay || []).length > 0"
    >
      <div class="catgries">Deal of the day</div>
      <div class="slider1" style="margin-top: 20px">
        <div
          class="dealoftheday1"
          v-for="item in daealoftheDay"
          :key="item._id"
          @click="() => router.push({ path: '/tabs/home/dealoftheday' })"
        >
          <div class="ribbon" v-if="item.Discount">{{ item.Discount }}%</div>
          <div class="deal-div">
            <div class="dael-contnet">
              <div class="deal-contimg">
                <!-- <div class="deal-img">{{ item.CreatedOn }}</div> -->

                <img
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px 8px 0px 0px;
                  "
                  :src="item.Image"
                />
              </div>
              <div class="deal-img">1 PM</div>
            </div>
          </div>
          <div class="dotted"></div>
          <div
            class="div-content"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div class="top-holder">
              <div class="conts">
                <div class="cknsald">
                  <div class="chikn-salad">{{ item.Name }}</div>
                  <div class="adsimg">
                    <div class="lacswe">{{ item.RestaurantId.Name }}</div>
                    <div class="opn">{{ item.RestaurantId.OpenStatus }}</div>
                  </div>
                </div>
                <img
                  style="width: 50px; height: 50px"
                  src="../../../public/assets/img/item-clock.png"
                />
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin: 6px 0px;
                "
              >
                <div class="adsimg">
                  <div class="prie">${{ item.Price }}</div>
                  <div class="price"> <s>${{ item.Discount }}</s></div>
                </div>
                <div class="kms">{{ item.RestaurantId.Distance }}</div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div class="slidecontainer">
                  <input
                    type="range"
                    class="sliderinpt"
                    min="1"
                    max="100"
                    value="50"
                  />
                </div>
                <div class="lft">10 Left</div>
              </div>
            </div>

            <div class="bottom-text">
              <img
                style="width: 16px; height: 16px; margin-right: 8px"
                src="../../../public/assets/img/menu-badge.png"
              />
              <div class="bestslar">Best Seller of the week</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="spacer ion-padding" v-if="(isSpecil || []).length > 0">
      <div class="catgries">Menu</div>
      <div class="dsplay">
        <div class="slider3">
          <div
            class="slde-box"
            v-for="item in isSpecil"
            :key="item._id"
            @click="
              () =>
                router.push({
                  path: '/tabs/profile/grilledBeef',
                  query: { itemId: item._id },
                })
            "
          >
            <div class="slde-box-image">
              <img :src="item.Image" />
              <div class="img-border"></div>
              <div class="slde-box-name">
                <div class="lsmals">
                  {{ item.Name }}
                </div>
                <div class="dollr">${{ item.Price }}</div>
              </div>
              <div>
                <div class="lcas">{{ item.RestaurantId.Name }}</div>
              </div>
              <div style="display: flex">
                <div class="solchalis">{{ item.About }}</div>
                <div class="km">{{ item.RestaurantId.Distance }}</div>
              </div>
            </div>
          </div>
          <!--   <div class="slde-box">
            <div class="slde-box-image">
              <img src="../../../public/assets/img/shaop.png" />
              <div class="img-border"></div>
              <div class="slde-box-name">
                <div class="lsmals">Limly Salad</div>
                <div class="dollr">$155</div>
              </div>
              <div>
                <div class="lcas">Le Casa</div>
              </div>
              <div style="display: flex">
                <div class="solchalis">1640 Camino Del Rio</div>
                <div class="km">1,2 km</div>
              </div>
            </div>
          </div>

          <div class="slde-box">
            <div class="slde-box-image">
              <img src="../../../public/assets/img/dhniy.png" />
              <div class="img-border"></div>
              <div class="slde-box-name">
                <div class="lsmals">Limly Salad</div>
                <div class="dollr">$155</div>
              </div>
              <div>
                <div class="lcas">Le Casa</div>
              </div>
              <div style="display: flex">
                <div class="solchalis">1640 Camino Del Rio</div>
                <div class="km">1,2 km</div>
              </div>
            </div>
          </div>

          <div class="slde-box">
            <div class="slde-box-image">
              <img src="../../../public/assets/img/breads.png" />
              <div class="img-border"></div>
              <div class="slde-box-name">
                <div class="lsmals">Limly Salad</div>
                <div class="dollr">$155</div>
              </div>
              <div>
                <div class="lcas">Le Casa</div>
              </div>
              <div style="display: flex">
                <div class="solchalis">1640 Camino Del Rio</div>
                <div class="km">1,2 km</div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import {
//   IonContent,
//   IonButton,
//   IonIcon,
//   loadingController,
//   toastController,
//   IonPage,
//   IonInput,
//   IonList,
//   IonLabel,
// } from "@ionic/vue";

import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";

export default defineComponent({
  data() {
    return {
      user: null,
      loading: true,
      noDataMessage: false,
      menus: [],
      categories: [],
      daealoftheDay: [],
      isSpecil: [],
      schterm: "",
    };
  },
  // components: {
  //   IonContent,
  //   IonLabel,
  // },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted() {
    const userId = window.localStorage.getItem("USERID");
    if (userId) {
      const test = await $apiService.getCall("user/" + userId);
      this.user = test.apidata || null;
      console.log(test + "hello");
    }
    this.categories = await $dataService.getCategory();

    this.menus = await $dataService.getMenu();

    this.daealoftheDay = this.menus.filter((c: any) => c.IsDealOfTheDay);
    console.log(this.daealoftheDay);

    this.isSpecil = this.menus || [] ; //.filter((a: any) => a.IsSpecial);
  },
  methods: {
    onSearch(e: any) {
      if (e.keyCode === 13 && this.schterm) {
        this.router.push({ path: "/tabs/search", query: { q: this.schterm } });
      }
    },
  },
});
</script>

<style scoped>
.spacer-bottom {
  margin-bottom: 20px;
}
.lunch-box {
  width: 130px;
  height: 100px;
  border-radius: 10px;
  color: white;
  min-width: 130px;
  z-index: 0;
  margin-top: -50px;
}

.lunch-box-img {
  width: 90px;
  height: 90px;
  /* margin-top: -45px; */
  /* top: -35px; */
  margin: 0 auto;
  display: inline-block;
  margin-left: 20px;
  border-radius: 50%;
}

.lunch-box .lunch-name {
  padding-top: 60px;
  text-align: center;
  width: 100%;
  height: 80px;
  overflow: hidden;
    text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
 font-family: 'Permanent Marker', cursive;
 font-size:14px;
  font-weight: 500;
}

.lsmals {
 font-family: 'Permanent Marker', cursive;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  color: #000000;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 30px;
}
.img-border {
  padding-top: 2px;
  border-bottom: 2px dotted #e9ecf3;
  letter-spacing: 1px;
}
.lcas {
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
}
.kms {
  color: #252529;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  letter-spacing: normal;
  line-height: normal;
}
.slider1 {
  display: flex;
  flex-direction: row;
  overflow: scroll;
}
.slider4 {
  display: flex;
  flex-direction: row;
  overflow: scroll;
  width: 100%;
}
.dollr {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  color: #f93963;
  font-family: 'Permanent Marker', cursive;
  text-align: left;
}
.km {
font-family: 'Permanent Marker', cursive;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #3bd4e4;
}
.solchalis {
  font-family: Poppins;
  font-size: 10px;
  color: #9c9eaf;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  margin-right: 10px;
  letter-spacing: 0em;
  text-align: left;
}
.slde-box {
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  max-width: 50%;
  text-align: center;
  border-radius: 15px;
  margin-bottom: 20px;
}
.slde-box-image {
  border-radius: 26px;
  padding: 10px 10px;
}

.slde-box-image img {
  width: 150px;
  height: 95px;
  border-radius: 10px;
  object-fit: cover;
}

.slde-box-name {
  text-align: center;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;
  margin-top: 12px;
  color: #7f8592;
}

.opn {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #00dabe;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-left: 8px;
}
.lft {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #9c9eaf;
  text-align: center;
}
.lacswe {
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #9c9eaf;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.dotted {
  border-right: 3px dotted #e9ecf3;
  margin: 0px 8px;
}
.prie {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #f93963;
  margin-right: 10px;
}
.sliderinpt {
  width: 95%;
  height: 4px;
  color: white;
}
.slidecontainer {
  width: 70%;
}
.chikn-salad {
  font-family: 'Permanent Marker', cursive;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  width: 120px;
}
.dael-contnet {
  padding: 0px;
}
.deal-img {
  width: 100px;
  text-align: center;
  background: #3bd4e4;
  border-radius: 0px 0px 8px 8px;
}
.deal-contimg {
  background: #3bd4e4;
  border-radius: 8px;
  padding: 0px;
  text-align: center;
  height: 150px;
  width: 100px;
}
.deal-div {
  padding: 0px;
}
.img-bottm {
  background: #3bd4e4;
  width: 83px;
  text-align: center;
  border-radius: 8px;
  height: 128px;
}
.price {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color: #9c9eaf;
}
.dealoftheday1 {
  display: flex;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  margin-right: 20px;
  padding: 8px;
}
.specail1 {
  background-image: url("../../../public/assets/img/specail1.png");
  background-repeat: no-repeat;
  width: 175px;
  height: 150px;
  padding-left: 0px;
  margin-left: 0px;
}
.specail2 {
  background-image: url("../../../public/assets/img/specail2.png");
  background-repeat: no-repeat;
  width: 175px;
  height: 150px;
  padding-left: 0px;
  margin-left: 0px;
}
.specail3 {
  background-image: url("../../../public/assets/img/specail3.png");
  background-repeat: no-repeat;
  width: 175px;
  height: 150px;
  padding-left: 0px;
  margin-left: 0px;
}
.specail4 {
  background-image: url("../../../public/assets/img/specail4.png");
  background-repeat: no-repeat;
  width: 175px;
  height: 150px;
  padding-left: 0px;
  margin-left: 0px;
}
.bestslar {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.slider3 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  /* align-items: center; */
  align-self: center;
  justify-content: space-evenly;
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 4px;
}
.breakfast {
  background-image: url("../../../public/assets/img/Breakfst.png");
  background-repeat: no-repeat;
  width: 140px;
  height: 150px;
}
.lunch {
  background-image: url("../../../public/assets/img/lunchnew.png");
  background-repeat: no-repeat;
  width: 140px;
  height: 150px;
}
.dinner {
  background-image: url("../../../public/assets/img/lunchnew.png");
  background-repeat: no-repeat;
  width: 140px;
  height: 150px;
}
.catgries {
  font-family: 'Permanent Marker', cursive;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
}
.serchicon {
  background-image: url("../../../public/assets/img/Group 25.png");
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 14px;
  padding: 10px;
}
.notify {
  background-image: url("../../../public/assets/img/Group 15.png");
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  background-size: cover;
}
.inputfront {
  background-image: url("../../../public/assets/img/Group 24.png");
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}
.avtar {
  width: 50px;
  height: 50px;
  background-size: cover;
  margin-right: 0px;
}
.conts {
  display: flex;
  width: 190px;
  align-items: center;
}

.cknsald {
  margin-right: 20px;
}
.col-round {
  position: absolute;
  width: 28px;
  height: 28px;
  left: 28px;
  bottom: 20px;
}
.tri-img {
  position: absolute;
  right: 1px;
  bottom: 29px;
  width: 12px;
  height: 12px;
}
.round-img {
  position: relative;
}
.bottom-text {
  display: flex;
  align-items: center;
}
.rond-img {
  width: 50px;
  height: 50px;
}
.adsimg {
  display: flex;
}
.avt {
  width: 300px;
  display: flex;
  align-items: center;
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
  border: 0cm;
  padding-left: 0px;
  height: 30px;
  width: 90%;
  background-color: #f7f8fa;
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
.theme-color {
  color: #00b2ce;
}
.dsply {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 10px;
  align-items: center;
}

.spacer {
  margin: 30px 0px;
}
.spac1 {
  margin-top: 0px;
  margin-bottom: 20px;
}
.spac2 {
  margin-top: 30px;
  margin-bottom: 10px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.regstr {
  line-height: 43.17px;
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
  background-color: #f7f8fa;
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

.ribbon {
  position: absolute;
  padding: 2px 12px;
  /* font-size: 2.000em; */
  margin: 0;
  /* line-height: 1.875em; */
  color: #e6e2c8;
  border-radius: 0 5px 0px 0;
  background-color: #ec2885;
  box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.5);
  /* top: 6px; */
  font-size: 12px;
}

.ribbon:before,
.ribbon:after {
  position: absolute;
  content: "";
  display: block;
}

.ribbon:before {
  width: 0.469em;
  height: 100%;
  padding: 0 0 0.438em;
  top: 0;
  left: -0.469em;
  background: inherit;
  border-radius: 0.313em 0 0 0.313em;
}

.ribbon:after {
  width: 0.313em;
  height: 0.313em;
  background: rgba(0, 0, 0, 0.35);
  bottom: -0.313em;
  left: -0.313em;
  border-radius: 0.313em 0 0 0.313em;
  box-shadow: inset -1px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
