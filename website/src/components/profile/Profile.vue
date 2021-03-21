<template>
  <div>
    <!-- <img class="cam" src="../../../public/assets/img/cam.png" /> -->
    <div class="top-holder">
      <img 
        class="mtop" 
        :src="user.Image" 
        />

      <div class="ion-padding restro-details">
        <div class="search">
          <div class="d-flex image-holder">
            <div @click="openDialog()" class="p-relate">
              <img
                class="user-img"
                :src="Image"
                id="imgid" 
             />
              <div class="profile-img">
                <input 
                  id="fileInput" type="file" 
                  style="display: none" 
                  @change="setSrc()"
                  />
                <img 
                class="pfile" 
                src="../../../public/assets/img/cam.png" 
                />
              </div>
            </div>
          </div>
          <div class="cam-div">{{ user.FirstName }} {{ user.LastName }}</div>
          <div class="cam-img"> </div>
<!--           <div  v-for="item in isAddress" :key="item._id"><div>{{item.Address}}</div></div>
 -->        </div>
      </div>
    </div>
    <div class="dsplay ion-padding">
      <div class="slider2">
     <!--<div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/paymentMethod' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/payment.png" />
            <div class="slide-box-name">Payment Methods</div>
          </div>
        </div> -->

       <!--  <div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/disCover' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Shpe.png" />
            <div class="slide-box-name">Reward Credits</div>
          </div>
        </div> -->

        <div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/promoCode' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/gift.png" />
            <div class="slide-box-name">Promode Code</div>
          </div>
        </div>

        <div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/settings' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/gears.png" />
            <div class="slide-box-name">Settings</div>
          </div>
        </div>

      <!--   <div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/grilledBeef' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/support.png" />
            <div class="slide-box-name">Help Center</div>
          </div>
        </div> -->

        <div
          class="slide-box"
          @click="() => router.push({ path: '/tabs/profile/orders-history' })"
        >
          <div class="slide-box-image">
            <img src="../../../public/assets/img/Shpe.png" />
            <div class="slide-box-name">Orders</div>
          </div>
        </div>

        <div class="slide-box" @click="onLogout">
          <div class="slide-box-image">
            <img src="../../../public/assets/img/logot.png" />
            <div class="slide-box-name">Log out</div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
export default defineComponent({
  data() {
    return {
      user: [],
      firstname: "",
      lastname: "",
      loading: true,
      Image:'',
      noDataMessage: false,
      isAddress:[],
    };
  },
  components: {},
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted() {
   
    const userId = window.localStorage.getItem("USERID");
    if(userId){
    await $apiService.showLoading();
    const test = await $apiService.getCall("user/" + userId);
      this.firstname = test.apidata.FirstName
      this.lastname = test.apidata.LastName
      this.Image =   test.apidata.Image 
    this.user = test.apidata || [];

    this.isAddress = (test.apidata || {}).Addresses || [];

    if ((this.user || []).length == 0) {
      this.noDataMessage = true;
    }
     
    await $apiService.hideLoading();
    } else {
      this.router.push({ path: '/signin' });
    }
  },
  methods:{
  async register(){
      const userId = window.localStorage.getItem("USERID");
      const imageUrl = await $apiService.uploadImage(this.Image);
      const registerRes = await $apiService.putCall("user/profile/" + userId, {
        FirstName: this.firstname,
        LastName: this.lastname,
        Image:  imageUrl ||  "https://static.jobscan.co/blog/uploads/linkedin-profile-picture-1280x720.jpg",
       });
     },
      setSrc() {
      debugger
      const input: any = document.getElementById("fileInput");
      if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        const ext = fileName.split('.').pop(); // substring(fileName.indexOf(".") + 1 , fileName.length);
        if (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg") {
          this.Image = input.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const imgid: any = document.getElementById("imgid");
            imgid.src =  e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
          this.register();
        }
      }
    },
    openDialog() {
      document.getElementById("fileInput").click();
    },
    onLogout(){
      window.localStorage.removeItem($dataService.KEYS.USERID);
      this.router.push({ path: '/intro' });
    }
  }
});
</script>

<style scoped>
.restro-details {
  position: relative;
  bottom: 85px;
  width: 100%;
}

.slide-box {
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(209, 213, 223, 0.5);
  max-width: 100px;
  text-align: center;
  margin-bottom: 20px;
  width: 100px;
  border-radius: 10%;
}

.d-flex {
  display: flex;
}
.cam-div {
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: right;
}
.p-relate {
  position: relative;
}
.p-relate .user-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.cam-img {
  color: #8d92a3;
  font-family: Poppins;
  font-size: 12px;
  width: 20px;
  height: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.pfile {
  width: 25px;
  margin-top: 60px;
  margin-left: 0px;
  z-index: 100;
  height: 25px;
}
.cam {
  width: 30px;
  margin-top: 50px;
  margin-left: 90%;
  /* margin-right: 15px; */
  z-index: 100;
  height: 30px;
  position: absolute;
}
.divcls {
  display: flex;
  justify-content: center;
}
.profile-img {
  position: absolute;
  right: 6px;
  top: 12px;
}
.slide-box-image {
  border-radius: -26%;
  padding: 20px 10px;
}

.slide-box-image img {
  height: 40px;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  font-family: Poppins;
  margin-top: 10px;
  font-size: 15px;
  color: #7f8592;
}

.slide-name {
  text-align: center;
  font-family: Poppins;
  margin: 4px 0px 0px 0px;
  font-size: 15px;
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  /* align-items: center; */
  align-self: center;
  justify-content: space-around;
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
.mtop {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 40vh;
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
  background: #ffffff;
  box-shadow: 4px 4px 8px 4px rgba(100, 100, 100, 0.2),
    4px 6px 20px 4px rgba(250, 250, 250, 0.09);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  padding: 60px 20px 20px 20px;
}
.image-holder {
  position: absolute;
  top: -40px;
  width: 100px;
  height: 100px;
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
  margin-top: -85px;
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
