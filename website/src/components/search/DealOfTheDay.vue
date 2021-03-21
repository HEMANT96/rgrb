<template>
  <div>
    <div>
      <div style="">
           <div class="dsplay">
              <img class="arrow-icon" src="../../../public/assets/img/arrwleft.png"/> 
          </div>
            <div class="headng" >Deal of the Day</div>
       <div>     
         <div style="background:white; border-radius:16px; width:100%;height:100%; "><img class="" style="padding:20px; width:100%;height:100%; " src="../../../public/assets/img/limly-sld.png"/>  </div>
           <div style="background:white; margin:20px; padding:20px; border-radius:16px;"> 
            <div class="slads">
            <div> 
                <div class="lslad">Limly Salad</div> 
                <div class="pslad">With cheese sauce</div>
            </div>
                <div class="sads">$12.00</div>
                    </div> 
                    <div class="lcase">Le Casa</div>
                    <div class="pslad">1640 Camino Del Rio</div>
                </div>
         </div>    
            <div>     
         <div style="background:white; border-radius:16px; width:100%;height:100%; "><img class="" style="padding:20px; width:100%;height:100%; " src="../../../public/assets/img/limly-sld.png"/>  </div>
           <div style="background:white; margin:20px; padding:20px; border-radius:16px;"> 
            <div class="slads">
            <div> 
                <div class="lslad">Limly Salad</div> 
                <div class="pslad">With cheese sauce</div>
            </div>
                <div class="sads">$12.00</div>
                    </div> 
                    <div class="lcase">Le Casa</div>
                    <div class="pslad">1640 Camino Del Rio</div>
                </div>
         </div>  
       </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
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
.slide-box {
  margin:5px; 
  text-align: center;
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
.pslad{
    font-family: Lucida Grande;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0em;
    color: #9C9EAF;
    text-align: left;

}
.lslad{
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
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
.cam-div{
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: right;
}
.p-relate{
  position:relative;
}
.cam-img{
  color:#8D92A3; 
  margin-bottom:100px;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
}
.pfile{
  width:25px; 
  margin-top:60px; 
  margin-left:0px; 
  z-index:100; 
  height:25px;
}

.profile-img{
  position:absolute; 
  right:0; 
  top:0;
}
.slide-box-image {
  background: #ffffff;
  box-shadow: 8px 8px 8px 4px rgba(100, 100, 100, 0.2), 8px 8px 20px 4px rgba(250, 250, 250, 0.09);
  width: 108px;
  height: 108px;
}

.slide-box-image img {
  width: 35px;
  height: 35px;
  margin-left:0px;
  margin-top:25px;
  object-fit: cover;
}

.slide-box-name {
  text-align: center;
  font-family: Poppins;
  margin: 10px 0px 0px 26px;
  font-size: 15px;
  color: #7F8592;
  width:60px;
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
  align-content: center;
  align-items: center;
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
  position: absolute;
  left: 2.4%;
  right: -2.4%;
  top: 0.62%;
  bottom: 42.86%;
  z-index: 100;
  height: 300px;
  width: 100%;
  left: 0px;
  top: 0px;
  border-radius: 0px;
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
  margin-top: 5px;
  padding: 10px;
  align-items: center;
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
