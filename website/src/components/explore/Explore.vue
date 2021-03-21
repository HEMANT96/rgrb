<template>
  <div>
    <div class="top-holder">
      <div class="arrow" @click="() => router.push({ path : '/tabs/home'})">  &lt;  </div>
      <img class="mtop" :src="restaurant.Image" />
    
    <div class="ion-padding restro-details">
      <div class="restro-welcome" @click="() => router.push({ path : '/tabs/explore/order-now'})">WELCOME TO</div>
      <div class="restro-name">
        <div  @click="() => router.push({ path : '/tabs/home'})" > #Regrub </div>
        <img  @click="() => router.push({ path : '/tabs/profile/restaurant-info'} )" src="../../../public/assets/img/icon.png" />
      </div>

<div style="display:flex">
      <div style="z-index:101" class="yyc-name" @click="() => router.push({ path : '/tabs/explore/restaurant'})">{{restaurant.Name}}</div>
      <div style="z-index:; display:inline-block" class="triangle-down" @click="openChooser()"> </div>
</div>
    </div>

    
    </div>

    
 <div class="ion-margin search-holder">
      <ion-searchbar style="font-family:poppins;font-weight:400;" class="search" placeholder="Search something"
      v-model="schterm" v-on:keyup="onSearch"
      v-bind:value="schterm" ></ion-searchbar>
    </div>

   

    <div class="dsplay ion-padding">
      <div class="slider2">
        <!-- <div class="slide-box"  v-for="item in categories" :key="item._id">
          <div class="slide-box-image">
            <img 
            :src="item.Icon" 
            />
            <div class="slide-box-name">
              {{item.Name}}
            </div>
          </div>
        </div> -->


        <div class="slide-box" 
            @click="() => router.push({ path: '/tabs/search' , query: { catId : item._id } })"
               v-for="item in categories" :key="item._id"
         >
             <div class="slide-box-image">
                 <img 
                :src="item.Icon"
                />
              </div>
                <div class="slide-box-name">{{item.Name}}</div>
           </div>


      <!--   <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/lunchexp.png" />
            <div class="slide-box-name">Lunch</div>
          </div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/dinnerexp.png" />
            <div class="slide-box-name">Dinner</div>
          </div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/coffee.png" />
            <div class="slide-box-name">Coffee & tea</div>
          </div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/nightexp.png" />
            <div class="slide-box-name">Nightlife</div>
          </div>
        </div>

        <div class="slide-box">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/milkshake.png" />
            <div class="slide-box-name">Milk shake</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonSearchbar, modalController } from "@ionic/vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
import { defineComponent } from "vue";
import RestaurantModal from "./EnableRestaurant.vue";

export default defineComponent ({
  data() {
    return {
      restaurant: [],
      categories: [],
      schterm:''
    }
  },
   components: { IonSearchbar },
  props: {
    name: String,    
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {    
    this.loadData();
  },
  methods: {
    onSearch(e: any){
      if (e.keyCode === 13 && e.target.value) {
        this.router.push({ path: '/tabs/search', query: { q: e.target.value } })
      }
    },
    async loadData() {
      debugger;
      const rstrs = await $dataService.getRestaurant();
      const restId = window.localStorage.getItem($dataService.KEYS.RESTID);
      this.restaurant = (rstrs || []).find((r: any) => r._id == restId);

      this.categories = await $dataService.getCategory();

      console.log({ restaurant: this.restaurant , categories: this.categories})
    },
    async openChooser() {
      const modal = await modalController.create({
        component: RestaurantModal,
        cssClass: "my-custom-class",
        componentProps: {
          title: "New Title",
        },
      });
      modal.onDidDismiss().then(async (data) => {
        console.log(data.data);
        if(data.data.changed) {
          this.loadData();
        }
      });
      await modal.present();
    }
  }
});
</script>

<style scoped>
.triangle-down {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 16px solid #fff;
      margin-left: 10px;
    }

.yyc-name {
  margin-left: 120px;
  margin-top: -5px;
  font-size: 16px;
  
  font-family: poppins;
  font-weight: 500;
}

.arrow{
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

.restro-details .restro-welcome {
  font-size: 20px;
 font-family: 'Permanent Marker', cursive;
 color: #E01B78;
;
  font-weight: 500;
  position:absolute;
  bottom:80px;
  left:6px;
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
  margin:10px 0px;
  height:150px ;
  width: 100px;
  border-radius: 10%;
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
  font-family: 'Poppins';
  --border-radius: 30px;
  font-size: 16px;
  font-style: normal;
  padding: 0px;
  padding-top: -10px !important;
  padding-bottom: -10px !important;
  font-weight: 400;
  opacity: 0.999;
  height: 40px;
  background:rgb(245, 245, 245);
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
