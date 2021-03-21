<template>
 <ion-page>  
   <ion-content>
     <div class="dsplay">
        <img class="arrow-icon"  @click="() => router.push({ path : '/tabs/profile'} )"  src="../../../public/assets/img/arrwleft.png"/> 
  </div>
 <div class="head">Promo Code</div>
     <div class="slider2 ion-padding-start" >
       <div class="slide-box " v-for="item in allOrders" :key="item._id">
         <div style="text-align: left; width:100px; height:20px; position:absolute; top:20px; left:20px;">
            <span class="comming" style="">
             -{{ item.Discount}}%</span>
              </div>
            <div class="card">
              <img 
              class="oderimg"
              style="width:100%; height:200px;" 
              :src="item.Image"
              />                    
       </div>
          <div class="content">
             <div style="color:white; font-size:20px; font-weight: 600; text-align:center; padding-top:14px; padding-bottom:4px;">Happy Lunch</div>
               <div style="color:white; font-size:12px; text-align:center; margin-bottom:10px;">{{item.Name}}</div>
            </div>
         </div> 
        <!-- <div class="slide-box">
            <div class="card">
              <img class="oderimg" src="../../../public/assets/img/Sagpatti.png"/>             
          </div>
        </div> 
        <div class="slide-box">
            <div class="card">
              <img class="oderimg" src="../../../public/assets/img/Sagpatti.png"/>             
          </div>
        </div>  -->      
     </div>

 <div class="text-head">NEAR YOU</div>
   <div v-for="item in allOrders" :key="item._id" class="containr">
     <div style="text-align: left; width:100px; height:20px; position:absolute; top:10px; left:10px;">
       <span class="comming" style="">
       -{{ item.Discount}}%</span>
       </div>
     <img 
        :src="item.Image" 
        alt="Notebook" 
        style="width:100%; height:200px;"
        />
        <div class="content">
            <div style="color:white; font-size:20px; font-weight: 600; Text-align:center; padding-top:14px; padding-bottom:8px;">Happy Lunch</div>
            <div style="color:white; font-size:12px; Text-align:center; margin-bottom:10px;">{{item.Name}}</div>
        </div>
      </div> 
    
 <!-- <div class="" style="margin-top:20px;margin-left:20px; margin-right:20px;">  
  <div class="containr">
     <img src="../../../public/assets/img/shop.png" alt="Notebook" style="width:100%;">
        <div class="content">
            <div style="color:white; font-size:20px; font-weight: 600; Text-align:center; padding-top:14px; padding-bottom:8px;">Happy Lunch</div>
         <div style="color:white; font-size:12px; Text-align:center; margin-bottom:10px;">22 Powlowski Plains</div>
       </div>
     </div> 
   </div>  -->
  </ion-content>
 </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from 'vue-router';
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";

export default defineComponent ({
  data() {
     return {
       allOrders:[],
       promoCode:[],
       loading: true,
       noDataMessage: false,
     };
  },
  components: { IonContent, IonPage },
  setup() {
    const router = useRouter();
    return { router };
  },

  async mounted() {
      debugger;
      const test = await $apiService.getCall("promocode/" );
      this.allOrders = test.apidata || [];
      console.log(test);
      console.log(this.allOrders);
   }
 });
</script>

<style scoped>

.slide-box {
  padding:10px;
  width: 300px;
  height: 200px;
  margin: 20px;
  position: relative;
}
.slide-box .content {
  position: absolute;
  bottom: -10px;
  text-align: center;
  width: 300px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  margin-right: 20px ;
  height: 80px;
  background: rgba(255, 255, 255, 0.2); 
  backdrop-filter: blur(15px); 
}
.arrow-icon{
    margin-left:8px;
    width:25px; 
    height:25px;
}
.head{
    margin-left:20px; 
      font-family: 'Permanent Marker', cursive;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 43px;
    letter-spacing: 0em;
    text-align: left;
}
.text-head{
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 20px;
    padding:20px;
    padding-bottom:0px !important;
}
.containr {
  position: relative;
  margin:10px 20px ;
  height: 200px;
  border-radius: 8px;
}

.containr img { height: 100%;  border-radius: 8px;}

.containr .content {
  position: absolute;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  text-align: center;
  width:100% ;
  bottom: 0;
  background: rgba(255, 255, 255, 0.2); 
  backdrop-filter: blur(15px); /*  background: rgb(256, 256, 256); /* Fallback color 
  */
 /* Black background with 0.5 opacity */
}
.div-contin{
    display:flex; 
    width:180px;
}
.div-x{
    color:#9C9EAF;
    padding-top:4px; 
    font-size:12px
}
.text-contain{
    color:#9C9EAF; 
    padding-top:10px; 
    font-family: Lucida Grande;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
}
.limi-salad{
    margin-right:20px; 
    font-size:16px;
}
.pumkin{
    margin-right:39px; 
    font-size:16px;
}
.sagptti{
    font-size:16px;
    width:102px;
}
.comming {
  margin-top: 16px;
  background: #00b2ce;
  border-radius: 16px;
  color: white;
  font-size: 10px;
  width: 100px;
  height: 20px;
  padding-top: 4px;
  text-align: center;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
}
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
    transition: 0.5s;
    border-radius: 8px;
    display:flex;
    width: 300px;
    height:200px;
}
.contain{
    padding:20px; 
}
/* Add rounded corners to the top left and the top right corner of the image */
.oderimg {
    border-radius: 10px;
    width: 100%;
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


.dtail{
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    color: #8D92A3;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    margin-right:20px;
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
    overflow:scroll;
    margin-right: 4px;
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
