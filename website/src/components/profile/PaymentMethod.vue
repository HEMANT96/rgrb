<template>
 <ion-page>
  <ion-content>
   <div id="container">
      <div class="dsplytop">
         <img class="arrow-icon"  @click="() => router.back()" src="../../../public/assets/img/arrwleft.png"/> 
    </div>
    <div class="dsply"> <div class="addrs">Payment Methods</div> </div>
    <div class="dsplay">
      <div class="slider2">
        <div class="slide-box">
            <div class="card">
              <img @click="() => router.push({ path : '/tabs/profile/address'} )" src="../../../public/assets/img/Paypal.png"/>
          </div>
        </div>
          <div class="slide-box">
                        <div class="card">
                           <img  @click="() => router.push({ path : '/tabs/profile/address'} )" src="../../../public/assets/img/BankCard.png"/>    
                    </div>
                </div>
            <div class="slide-box">
                        <div class="card">
                           <img  @click="() => router.push({ path : '/tabs/profile/address'} )" src="../../../public/assets/img/Creditcard.png"/>    
                    </div>
            </div>
             <div class="slide-box">
                        <div class="card">
                           <img @click="() => router.push({ path : '/tabs/profile/address'} )" src="../../../public/assets/img/Cash.png"/>    
                    </div>
            </div>
          
           </div>
         </div>
      </div>
    </ion-content>
  </ion-page>
 </template>

<script lang="ts">
 import { IonPage, IonContent } from "@ionic/vue";
 import { useRouter } from 'vue-router';
export default {
  name: "ExploreContainer",
  props: {
    name: String,
  },
 components: { IonContent, IonPage },
  setup() {
    const router = useRouter();    
    return { router };
  },
};
</script>

<style scoped>

.slide-box {
  /* max-width: 150px; */
}
.arrow-icon {
    margin-left:0px;
    width:25px; 
    height:25px;
}
.storePick{
    font-family: Poppins;
    font-size: 16px;
    padding-bottom: 0px;
    padding-top:0px;
    font-style: normal;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
}
.bltline{
    font-family: Poppins;
    font-size: 12px;
    padding-bottom: 0px;
    padding-top:0px;
    padding-top: 0px;
    margin-top:0px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
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
  display:flex; 
  padding-right:70px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.chikn{
  font-family: Poppins;
  display:flex; 
  padding-right:10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}
.addrs{
  font-family: 'Permanent Marker', cursive;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 43px;
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
  transition: 0.5s;
  border-radius: 10px;
  margin:10px;
  height:200px;
   /* 5px rounded corners */
}


.contain{
  padding:10px;
  display:flex;
  justify-content:space-between;
  flex-direction:'row';
}
/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 15px ;
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
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  padding-top:20px;
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
  justify-content:space-between;
  padding-bottom:0px;
  padding-top:15px;
  padding-right: 18px;
  padding-left: 30px;
  align-items: center;
}
.dsplytop {
  display: flex;
  justify-content:space-between;
  padding-bottom:0px;
  padding-top:15px;
  padding-right: 30px;
  padding-left: 30px;
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
