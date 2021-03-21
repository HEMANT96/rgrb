<template>
  <div id="container">
    <div class="dsply">
      <div class="arrow"> <a href="/tabs/tab6">Coming</a></div>
      <div class="arrow arrow-border"> <a href="/tabs/tab5">History</a></div>
    </div>
    <div class="dsplay">
      <div class="slider2">
        <div class="slide-box"
         v-for="item in isOrdermenu " :key="item._id"
          >
            <div class="card">
              <div class="datecss">{{item.DeliveryStatus}}</div>
               <img src="../../../public/assets/img/Rectangle2.png"/>
                <div class="contain">
                 <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                 <div class="lecase">{{ item.RestaurantId.Name }}</div>
             </div>
          </div>
        </div>

      <!-- <div class="slide-box">
           <div class="card">
            <div class="datecss">30/11/2019</div>
               <img src="../../public/assets/img/Rectangle3.png"/>
             <div class="contain">
                   <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                   <div class="lecase">Le Casa</div>
             </div>
          </div>
        </div>

        <div class="slide-box">
            <div class="card">
             <div class="datecss">30/11/2019</div>
               <img src="../../public/assets/img/Rectangle4.png"/>
             <div class="contain">
                 <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                 <div class="lecase">Le Casa</div>
             </div>
          </div>
        </div>

      <div class="slide-box">
           <div class="card">
             <div class="datecss">30/11/2019</div>
               <img src="../../public/assets/img/Rectangle5.png"/>
             <div class="contain">
                 <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                 <div class="lecase">Le Casa</div>
             </div>
          </div>
        </div>

      <div class="slide-box">
            <div class="card">
             <div class="datecss">30/11/2019</div>
               <img src="../../public/assets/img/Rectangle6.png"/>
             <div class="contain">
                   <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                 <div class="lecase">Le Casa</div>
             </div>
          </div>
        </div> 
         <div class="slide-box">
            <div class="card">
             <div class="datecss">30/11/2019</div>
               <img src="../../public/assets/img/Rectangle7.png"/>
             <div class="contain">
                <div class="chicken" style="display:flex;">Chicken Rice<span style="margin-left:2px; font-size:12px;"> x1 </span></div>
                 <div class="lecase">Le Casa</div>
             </div>
          </div>
        </div>
        -->
       
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


import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";

export default defineComponent({
  data() {
    return {
      loading: true,
      noDataMessage: false,
      isOrdermenu: [],
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
    await $apiService.showLoading();
    const userId = window.localStorage.getItem("USERID");
    
    console.log(userId);
    
    const test = await $apiService.getCall("orders/5fdbb2dc4ce9db1c07b38636");
    
    console.log(test);
    
    this.isOrdermenu = test.apidata || [];

    console.log(this.isOrdermenu);

if ((this.isOrdermenu || []).length == 0) {
    
     this.noDataMessage = true;
    
    }
    await $apiService.hideLoading();

 },

});

</script>

<style scoped>

.slide-box {
  /* max-width: 150px; */
}
.datecss{
  position:absolute; 
  padding-left:8px; 
  font-size:10px; 
  padding-right:8px; 
  margin:12px; 
  background:#00b2ce; 
  color:white; 
  border-radius:50px
}
.lecase{
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.chicken{
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;

}
.comming{
   margin-top:16px; 
   background: #00b2ce; 
   border-radius:16px;
   color:white; 
   font-size:10px;
   width:48%;
   padding-top:4px;
   text-align: center; 
   padding-bottom:4px; 
   padding-left:10px; 
   padding-right:10px
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
  transition: 0.5s;
  border-radius: 10px;
  margin:10px;
   /* 5px rounded corners */
       margin-top: 15px;
}


.contain{
  padding:10px;
}
/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 15px ;
  height:100px;
  width:140px;
}

.slide-box-image {
  background: #F1F3F8;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  padding: 20px;   
}

.slide-box-image:active{
    background: #00b2ce;
}
.theme-color{
      background: #00b2ce;
}

.slide-box-image img {
    padding:17px;
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
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}

.arrow-border{
  border-bottom: 3px solid #00b2ce;
  width:21%;
  text-align: center;
}

.arrow:active{
  border-bottom: 3px solid  #00b2ce;;
  width:21%;
  text-align: center;
}

.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 2px;
  justify-content:space-evenly;
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
  justify-content:space-evenly;
  padding-top: 50px;
  padding-bottom:0px;
  padding-right: 50px;
  padding-left: 50px;

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
