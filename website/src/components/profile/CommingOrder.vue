<template>
<ion-page>
    <ion-content>
        <div id="container">
           <div class="dsply">
             <div @click="() => router.back()" class="arrow">&lt;</div>
                <div>          
              </div>
           </div>
        <div class="dspy"> 
     <div class="whr" >Comming Order</div>
 </div>
  <div style="margin-top:20px; display:flex; flex-direction:'row'; justify-content:center; align-item:center; ">  
    <nav class="navmenu">
     <ul class="ul">
      <div style="" class="lft">
       <div style=" font-size:14px; align-item:right"> Sended Request</div>
         <div style=" font-size:12px; opacity: 0.3;"> 8:30pm</div>
           </div> 
             <li style="margin-bottom:20px;" class="li">
              <div class="a"> 
                <img  style="height:60px; margin-left:0px; width:60px;" src="../../../public/assets/img/wtch.png"/>
              <!-- <a href="#" class="a" style="width:20px; height:20px;">
                   </a> -->
                </div>  
                     </li>
                   <div style="" class="ft">
                     <img style="height:60px; width:60px;" src="../../../public/assets/img/right.png"/>
                </div> 
              <li 
             
              class="li">
             <div style="font-size:14px;"  class="a">
           <div style="font-size:14px;color:black;"> {{tas[1]}} </div>
         <div style=" font-size:12px; color:black; opacity: 0.3;">{{time[1]}}</div>
       </div>
    </li>
    <div style="" class="fst">
      <div style=" font-size:14px; align-item:right">{{tas[0]}}</div>
         <div style=" font-size:12px; opacity: 0.3;">{{time[0]}}</div>
           </div> 
              <li class="li">
                 <div href="#" class="a">
                   <img style="height:60px; width:60px;" src="../../../public/assets/img/scooter.png"/>       
                      </div>
                        </li>
                           <div style="" class="fstee">
                          <img style="height:60px; width:60px;" src="../../../public/assets/img/lodesh.png"/>
                         </div> 
                       <li class="li">
                     <div href="#" class="a">
                  <div style="font-size:14px;color:black;">Shipping</div>
               <div style=" font-size:12px; opacity: 0.3;">8:30pm</div>
            </div>
          </li>
        <div style="" class="fstsees">
     <div style=" font-size:14px; align-item:right">Receive Food</div>
            </div> 
                  <li class="li">
                       <div href="#" class="a">
                              <img style="height:60px; width:60px;" src="../../../public/assets/img/lpm.png"/>
                            </div>
                          </li>
                         </ul>
                        </nav>
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
      isTrack:[],
      tas:[],
      time:[]
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
     this.loadOrders();
  },
  methods: {
    async loadOrders() {
      await $apiService.showLoading();
      const userId = window.localStorage.getItem("USERID");
      console.log(userId);
      const test = await $apiService.getCall("orders/" + userId);
      const allOrders = test.apidata || [];
      console.log(test);
      /* this.isTrack = (test.apidata || {}) *//* .Tracks || []  */

       console.log(this.isTrack);
      this.tas = test.apidata[0].Tracks.map((item: any)=>{return item.Track})
      console.log(this.tas);
       this.time = test.apidata[0].Tracks.map((item: any)=>{return item.Time})
      console.log(this.time);
      await $apiService.hideLoading();
    },
  },
});
</script>

<style scoped>

.ul{
  list-style: none;
}

.navmenu{
  position: absolute;
  top: 72%;
  left: 43%;
  transform: translateY(-50%);
}

.navmenu .ul{
  padding-left: 50px;
  position: relative;
}

.navmenu .ul::after {
  content: "";
  position: absolute;
  width:3px;
  height: calc(100% - 125px);
  left: 27px;
  top:41px;
  background: #00b2ce;
  z-index: -1;
  margin-top: 29px;
}

.navmenu .ul .li {
  padding: 30px 0px;
  padding-left: 20px;
}

.navmenu .ul .li .a{
  text-decoration: none;
  position: relative ;
  font-size: 16px;
  font-weight: 500;
}
.navmenu .ul .lft{
  position: absolute;
  width:100px;
  height: 40px;
  top: 7%;
  left: 14px;
  transform: translateX(-100%);
 }
 .navmenu .ul .ft{ 
  position: absolute;
  width:100px;
  height: 40px;
  top: 29%;
  left: 14px;
  transform: translateX(-100%);
 }
 .navmenu .ul .fst{ 
  position: absolute;
  width:100px;
  height: 40px;
  top: 50%;
  left: 14px;
  transform: translateX(-100%);
 }

.navmenu .ul .fstee{ 
  position: absolute;
  width:100px;
  height: 40px;
  top: 66.5%;
  left: 14px;
  transform: translateX(-100%);
 }
 .navmenu .ul .fstsees{ 
  position: absolute;
  width:120px;
  height: 40px;
  top: 88%;
  left: 14px;
  transform: translateX(-100%);
 }
.navmenu .ul .li .a::before{
  content:"";
  position: absolute;
  background: #00b2ce;
  width:10px;
  height: 10px;
  left: -42px;
  top: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
 }

 .navmenu .ul .li .a.active{
    font-weight: 700;
 }

 .navmenu .ul .li .a.active::before{
    background: #00b2ce;
 }
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
  padding-left: 5px;
  font-family: "Abril Fatface";
  font-size: 28px;
  margin-top: 8px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.0116em;
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
  font-size: 18px;
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
  padding: 20px;
  margin-top: 8px;
  justify-content: space-between;
}
.dspy {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 28px;
  align-items: center;
  margin-left: 12px;
  width: 90%;
  position: relative;
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
