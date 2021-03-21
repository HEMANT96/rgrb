<template>
  <ion-page>
    <ion-content>
      <div class="ion-padding">
        <div class="dsply">
          <div @click="() => router.back()" class="arrow">&lt;</div>
          <div></div>
        </div>
        <div class="header spac1">
          <h1 class="setfont">Search</h1>
        </div>
        <div class="data-row spac2">
          <div class="regstr">
            <div class="serchicon"></div>
            <input
              class="lname"
              v-model="qText"
              v-on:keyup="onSearch"
              v-on:keyup.enter="onStoreSearch"
            />
          </div>
          <div
            class="inputfront"
            @click="() => router.push({ path: '/tabs/home/filter' })"
          ></div>
        </div>
      </div>

      <div
        class="usrinformtion"
        v-if="fromTab && (searchItem || []).length > 0"
      >
        Recent Search
      </div>

      <div class="ion-padding" v-if="fromTab && (searchItem || []).length > 0">
        <div class="dsplay" v-for="item in searchItem" :key="item._id">
          <div class="slider2">
            <div class="slide-box">
              <div class="contain">
                <div class="chicken" style="">
                  <div style="margin-left: 8px; font-size: 12px">
                    <div class="storePick">{{ item.qText }}</div>
                    <div class="bltline">On {{ getTime(item.qTime) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dsplay">
          <div class="slider2">
            <div class="slide-box">
              <div class="contain">
                <div class="chicken" style="">
                  <div
                    @click="clearRecent"
                    style="
                      margin-left: 10px;
                      color: #00b2ce;
                      text-decoration: underline;
                    "
                  >
                    Clear Recent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ion-padding-start ion-padding-end">
        <div class="dsplay">
          <div class="slider3">
            <div
              class="slde-box"
              v-for="item in items"
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
                <img style="width: 100%" :src="item.Image" />
                <div class="slde-box-name">
                  <div class="lsmals">
                    {{ item.Name }}
                  </div>
                  <div style="width: 50px" class="dollr">
                    $ {{ item.Price }}
                  </div>
                </div>
                <div>
                  <div class="lcas">{{ item.RestaurantId.Name }}</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div class="solchalis">{{ item.RestaurantId.Address }}</div>
                  <div class="km">{{ item.RestaurantId.Distance }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center; padding-top: 20%">
        <ion-spinner name="lines" v-if="displayLoader"></ion-spinner>

        <div v-if="noDataMessage">No matching records found</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonSpinner } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $dataService from "./../data-service";
import moment from 'moment';

export default defineComponent({
  props: {
    name: String,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      fromTab: false,
      items: [],
      searchItem: [],
      noDataMessage: false,
      qText: "",
      displayLoader: false,
    };
  },
  components: { IonContent, IonPage, IonSpinner },
  async mounted() {
    console.log("search items");
    console.log(this.searchItem);

    try {
      const localSearch = window.localStorage.getItem("SEARCHITEM");

      if (localSearch) this.searchItem = JSON.parse(localSearch);
    } catch (err) {
      console.log(err);
    }

    this.displayLoader = true;
    const query = this.$router.currentRoute.value.query;
    let fromTab = true;
    if ("q" in query || "catId" in query || "itemId" in query) {
      fromTab = false;
    }
    this.fromTab = fromTab;
    let tempItems = await $dataService.getMenu();
    if ("q" in query) {
      const qText = query.q as string;
      this.qText = qText;
      tempItems =
        tempItems.filter((itm: any) => {
          if (
            itm.Name &&
            itm.Name.toLowerCase().indexOf(qText.toLowerCase()) >= 0
          ) {
            return true;
          } else {
            return false;
          }
        }) || [];
    }
    if ("catId" in query) {
      const cText = query.catId as string;
      const catList = cText.split(",");
      tempItems =
        tempItems.filter((itm: any) => {
          if (catList.indexOf(itm.CategoryId._id) >= 0) {
            return true;
          } else {
            return false;
          }
        }) || [];
    }

    this.items = tempItems;
    if (this.items.length == 0) {
      this.noDataMessage = true;
    }
    this.displayLoader = false;
  },
  methods: {
    getTime(time: string) {
      if(time) {
        return moment(time).format('DD MMM, YYYY hh:mm A');
      } else {
        return '';
      }
    },
    async clearRecent() {
      this.searchItem = [];
      window.localStorage.removeItem("SEARCHITEM");
    },
    async onStoreSearch() {
      let searchItem = [];
      try {
        const localSearch = window.localStorage.getItem("SEARCHITEM");
        if (localSearch) searchItem = JSON.parse(localSearch);
      } catch (err) {
        console.log(err);
      }
      const item = {
        qText: this.qText,
        qTime: new Date()
      } 
      searchItem.push(item);
      window.localStorage.setItem("SEARCHITEM", JSON.stringify(searchItem));
      this.searchItem = searchItem;
    },
    async onSearch() {
      this.displayLoader = true;
      let tempItems = await $dataService.getMenu();
      tempItems =
        tempItems.filter((itm: any) => {
          if (
            itm.Name &&
            itm.Name.toLowerCase().indexOf(this.qText.toLowerCase()) >= 0
          ) {
            return true;
          } else {
            return false;
          }
        }) || [];
      this.items = tempItems;

      if (this.items.length == 0) {
        this.noDataMessage = true;
      }
      this.displayLoader = false;
    },
  },
});
</script>

<style scoped>
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
  width: 32;
  height: 18;
  color: #252529;
  font-family: Poppins;
  font-size: 12;
  font-weight: 500;
  font-style: normal;
  text-align: left;
  letter-spacing: normal;
  line-height: normal;
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

.km {
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #3bd4e4;
}

.storePick {
  font-family: Poppins;
  font-size: 15px;
  padding-bottom: 0px;
  padding-top: 0px;
  font-style: normal;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.contain {
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: "row";
}
.chicken {
  font-family: Poppins;
  display: flex;
  padding-right: 70px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}

.lsmals {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  color: #000000;
  letter-spacing: 0em;
  text-align: left;
  margin-right: 0px;
}
.img-border {
  padding-top: 2px;
  border-bottom: 2px dotted #e9ecf3;
  letter-spacing: 1px;
}

.bltline {
  font-family: Poppins;
  font-size: 12px;
  padding-bottom: 0px;
  padding-top: 0px;
  color: #8d92a3;
  padding-top: 0px;
  margin-top: 0px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.dsplay {
  display: flex;

  flex-direction: row;

  align-items: center;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
  transition: 0.5s;
  border-radius: 10px;
  margin: 10px;
  /* 5px rounded corners */
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 2px;
  justify-content: space-evenly;
}
.info {
  display: flex;
  width: 95%;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-bottom: 1px #8c8c8c;
  z-index: 1;
  position: relative;
}
.arrow {
  font-weight: bold;
  font-size: 28px;
}
.info:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  margin-right: 100px;
  width: 98%;
  border-bottom: 1px solid #f1f3f8;
}

.serchicon {
  background-image: url("../../public/assets/img/Group 25.png");

  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px;
}

.inputfront {
  background-image: url("../../public/assets/img/Group 24.png");
  background-repeat: no-repeat;
  width: 30px;
  margin-top: 6px;
  height: 30px;
}
.dsply {
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
}
.regstr {
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
  background-color: #f7f8fa;
}
.lname {
  border-top: 1px;
  border-left: 0ch;
  border: 0cm;
  outline: none;
  padding-bottom: 10px;
  padding-left: 0px;
  height: 30px;
  width: 80%;
  background-color: #f7f8fa;
  margin-top: 8px;
  margin-bottom: 0px;
  border-right: 0ch;
  border-color: #444141;
}
.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.pass {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 95%;
  margin-bottom: 20px;
  align-items: center;
  z-index: 1;
  position: relative;
}
.pass:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  margin-right: 100px;
  width: 98%;
  border-bottom: 1px solid #f1f3f8;
}
.pass:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.setfont {
  font-family: Abril Fatface;
  font-size: 32px;
  font-style: normal;
  /* margin-left: 10px; */
  font-weight: 400;
  /* line-height: 43px; */
  letter-spacing: 0em;
  text-align: left;
  margin-top: 0px;
}
.usrinformtion {
  height: 40px;
  width: 100%;
  background: rgba(8, 0, 64, 0.0352655);
  text-align: center;
  left: 0px;
  top: 171px;
  padding: 10px;
  border-radius: 0px;
}

.text-align {
  text-align: center;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.theme-color {
  color: #00b2ce;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.spacer {
  margin: 20px 0px;
}
.spac1 {
  margin-top: 7px;
  margin-bottom: 20px;
}
.spac2 {
  margin-top: 18px;
  margin-bottom: 5px;
}

.catgries {
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 33px;
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
  width: 100%;
}

.slde-box {
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  max-width: 47%;
  text-align: center;
  border-radius: 15px;
  margin-left: 1px;
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
  margin-top: 12px;
  color: #7f8592;
  justify-content: space-between;
}
</style>
