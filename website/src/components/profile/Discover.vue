<template>
 <ion-page>
    <ion-content>
        <div>
           <div>
          <div style="">
        <div class="dsplay">
              <img class="arrow-icon" src="../../../public/assets/img/arrwleft.png"/> 
          </div>
             <div class="inputserchdiv"> 
                 <div class="headng">Discover </div>
                    <div class="inptserch"> 
                          <input class="lname"/>
                    <div class="serchicon"></div>
                </div>
             </div>
          <div class="dsply">
        <div class="slider2">
            <div class="slide-box">
              <div class="slide-box-image" style="background-color:#3b55f3;">
                <img src="../../../public/assets/img/brkfast.png"/>
                </div>
              <div class="slide-box-name" style="color:#3b55f3">Breakfast</div>
            </div>

            <div class="slide-box">
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
              <div class="slide-box-image">
                   <img src="../../../public/assets/img/octopus.png" />
                  </div>
                <div class="slide-box-name">Sea food</div>
             </div>
           </div>
         </div>   
        <div>     
          <div class="sladss">
              <img class="sladimg" style="" src="../../../public/assets/img/ruskimg.png"/>  
                <div class="sladdiv"> 
                     <div> 
                        <div class="sladinside">
                            <div class="sladinsddiv">
                           <img  class="sladinsdimg" src="../../../public/assets/img/hom.png"/>
                         <div style="margin-bottom:40px;">
                      <div class="lecl">Le Céline</div>
                   <span class="brnd">242 Bernadi</span>
               </div>
            </div>
          <div class="kms">2.3km</div>
        </div>
           </div>
              </div>
                 <div class="sladssbottm"> 
                    <div class="avocodslad">AvocadoSalad</div>
                      </div>     
                 <img class="sladbtomimg" src="../../../public/assets/img/hert.png"/>            
               </div>        
             </div>    
            <div>     
         <div class="sladss">
              <img class="sladimg" style="" src="../../../public/assets/img/dicoverimg.png"/>  
                  <div class="sladdiv"> 
                      <div> 
                         <div class="sladinside">
                            <div class="sladinsddiv">
                        <img  class="sladinsdimg" src="../../../public/assets/img/hom.png"/>
                    <div style="margin-bottom:40px;">
                <div class="lecl">Le Céline</div>
            <span class="brnd">242 Bernadi</span>
               </div>
                   </div>
                       <div class="kms">2.3km</div>
                         </div>
                           </div>
                         </div>
                      <div class="sladssbottm"> 
                    <div class="avocodslad">AvocadoSalad</div>
                </div>     
             <img class="sladbtomimg" src="../../../public/assets/img/hert.png"/>            
           </div>        
              </div>    
                  </div>
                       </div>
                   </div>
                </ion-content>
             </ion-page>
            </template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";

export default {
  components: { IonContent, IonPage },
  props: {
    name: String,
  },
};
</script>

<style scoped>
.slads{
    display:flex;
    justify-content:space-between;
}
.avocodslad{
    color: #000521;
    font-family: Abril Fatface;
    font-size: 32px;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    letter-spacing: normal;
    line-height: normal;
  }
  .kms{
    margin-top:6px;
    width: 38;
    height: 18;
    color: #3b55f3;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    letter-spacing: normal;
    line-height: normal;
  }
  .lecl{
    width: 73;
    color: #22242a;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    text-align: left;
    letter-spacing: normal;
    line-height: normal;
  }
  .brnd{
    width: 71;
    height: 18;
    color: #8d92a3;
    font-family: Poppins;
    font-size: 12;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    letter-spacing: normal;
    line-height: normal;
  }
  .inputserchdiv{
      display:flex; 
      flex-direction:row; 
      justify-content:space-between;
  }
  .inptserch{
      display:flex; 
      flex-direction:row; 
      margin-right:15px;
  }
  .sladbtomimg{
      width:90px; 
      height:100px; 
      position:absolute; 
      right:10px; 
      top:36px;
  }
  .sladssbottm{
      margin:20px; 
      padding:20px; 
      display:flex; 
      flex-direction:row;  
      justify-content:space-between;
      border-radius:16px; position:absolute; 
      top:10px; 
      left:2px; 
      width:80%; 
      height:70px;
  }
  .sladss{
      background:white; 
      border-radius:16px;
      width:100%;
      height:100%; 
      position:relative;
  }
  .sladimg{
      padding:20px; 
      width:100%;
      height:100%;  
      border-radius: 34px; 
  }
  .sladdiv{
      background:white; 
      margin:20px; 
      padding:20px; 
      border-radius:16px; 
      justify-content:center;  
      position:absolute; 
      bottom:20px; 
      left:16px; 
      width:80%; 
      height:85px;
  }
  .sladinside{
      display:flex; 
      flex-direction:row; 
      justify-content:space-between;
  }
  .sladinsddiv{
      display:flex;
      flex-direction:row; 
  }
  .sladinsdimg{
      width:40px;
      height:40px;
      margin-right:10px;
  }
.sads{
   font-family: Poppins;
   color: #EC2885;
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
  margin-left: 0px;
  padding: 10px;
}
.slide-box {
   margin:8px;
}
.lcase{
    margin-top:16px;
    font-family: Poppins;
    font-size: 14px;
    color: #000521;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
}

.headng{
    font-family: Abril Fatface;
    margin-left:20px;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 43px;
    letter-spacing: 0em;
    text-align: left;

}
.arrow-icon{
    margin-left:8px;
    width:21px; 
    height:21px;
}
.d-flex{
  display:flex;
}

.p-relate{
  position:relative;
}

.slide-box-image {
  background: #F1F3F8;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding: 10px;
  margin-bottom:20px; 
}

.slide-box-image img {
  width: 24px;
  height: 24px;
  margin-left:2px;
  margin-top:2px;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  font-size:11px;
  color: #7f8592;
  margin: 10px 0px 20px 0px;
  font-family: Poppins;
  letter-spacing: normal;
  font-weight: 700;
}

.slide-name{
  text-align: center;
  font-family: Poppins;
  margin: 4px 0px 0px 0px;
  font-size: 15px;
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 4px;
}
.flex-container {
  display: flex;
  margin-top: 420px;
}
.flex-container1 {
  display: flex;
}
.img {
  height: 180px;
  width: 180px;
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
  box-shadow: 4px 4px 8px 4px rgba(100, 100, 100, 0.2), 4px 6px 20px 4px rgba(250, 250, 250, 0.09);
  height:130px;
  display:flex;
  margin-top:220px;
  flex-direction:column;
  justify-content: center;
  text-align: center;
  align-items: center;
  z-index: 1000;
  width: 90%; 
  border-radius: 10px;
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
  border: 0cm;
  padding-left: 0px;
  height: 30px;
  width: 20px;
  margin-top: 8px;
  margin-bottom: 0px;
  border-right: 0ch;
  border-color: #444141;
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
  margin-top: 5px;
  padding: 10px;
  align-items: center;
}
.dsply{
   display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  font-family: Lucida Grande;
  font-weight: 400;
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
