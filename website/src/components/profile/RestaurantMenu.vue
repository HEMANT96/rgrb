<template>
  <ion-page>
    <ion-content>
      <div class="top-holder">
            <div class="back" @click="
              () => router.push({ path: '/tabs/explore' })">
            &lt;  </div> 
        <!-- <div class="arrow" @click="() => router.push({ path : '/tabs/home'})">  &lt;  </div> -->
        <img 
            class="mtop" 
            :src="restaurant.Image" 
          />

        <div class="card">
          <div class="cardhead">
            <div  @click="() => router.push({ path : '/tabs/profile/restaurant-info'} )">Info</div>
            <div class="arrow-border">Menu</div>
            <div  @click="() => router.push({ path : '/tabs/profile/restaurant-review'} )">Reviews</div>
          
        </div>
          <div class="dsplay">
            <div 
               class="slider2"
               >
                <div class="slide-box" 
                @click="() => router.push({ path: '/tabs/profile/grilledBeef' , query: { itemId : item._id } })"
                 v-for="(item, index) in menus" :key="item._id"
                 >
                 <div style="margin-right:10px; margin-top:50px;">{{index+1}} </div>
                   <div class="cardss">
                  <img
                    class="oderimg"
                    style="height:120px; width: 85px;"
                   :src="item.Image"
                  />
                  <div class="contain">
                    <div class="div-contin">
                      <div class="limi-salad">{{item.Name}}</div>
                    </div>
                    <div class="text-contain">
                          {{item.About}}
                     </div>
                    <div class="price">${{item.Price}}</div>
                  </div>
                </div>
              </div>

            <!--   <div class="slide-box">
                  <div style="margin-right:10px; margin-top:60px;"> 2 </div>
                <div class="cardss">
                  <img
                    class="oderimg"
                   :src="menus.Image"
                  />
                  <div class="contain">
                    <div class="div-contin">
                      <div class="limi-salad">{{menus.Name}}</div>
                    </div>
                    <div class="text-contain">
                          {{menus.About}}


                    </div>
                    <div class="price">{{menus.Price}}</div>
                  </div>
                </div>
              </div>

              <div class="slide-box">
                 <div style="margin-right:10px; margin-top:60px;"> 3 </div>
            <div class="cardss">
             <img 
                class="oderimg"
                :src="menus.Image"
              />
              <div class="contain">
                <div class="div-contin">
                  <div class="limi-salad">{{menus.Name}}</div>
                </div>
                  <div class="text-contain">    
                    {{menus.About}}
                 </div>
                <div class="price">{{menus.Price}}</div>
              </div>
            </div>
          </div>
       <div class="slide-box">
          <div style="margin-right:10px; margin-top:60px;"> 4 </div>
             <div class="cardss">
              <img 
                class="oderimg"
                :src="menus.Image"
              />
              <div class="contain">
                <div class="div-contin">
                  <div class="limi-salad">{{menus.Name}}</div>
                </div>
                <div class="text-contain">     
                     {{menus.About}}
                  </div>
                <div class="price">  
                  {{menus.Price}}
                  </div>
              </div>
            </div>
          </div> -->

            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";

//import { json } from 'd3';

export default defineComponent ({
  data() {
     return {
       menus:[],
       restaurant:[],
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
      const menus = await $dataService.getMenu();
      console.log(menus);
      this.menus = (menus || [])
      console.log(this.menus);
       const rstrs = await $dataService.getRestaurant();
    const restId = window.localStorage.getItem($dataService.KEYS.RESTID);
    this.restaurant = (rstrs || []).find((r: any) => r._id == restId);
      console.log(this.restaurant);
   }
 });
</script>

<style scoped>
.info-spacer {
  margin: 20px 0px;
}

.info-spacer .info-head {
  display: flex;
  align-items: center;
  font-family: poppins;
  font-weight: 500;
}
.price {
  font-family: poppins;
  font-weight: 600;
  width:40px;
  height:30px;
  margin-top: 2px;
}
.text-contain {
  color: #9c9eaf;
  padding-top: 4px;
  font-family: poppins;
  font-weight: 400;
  font-size: 14px;
  width: 100px;
  height: 37px ;
  line-height: 16px;
  letter-spacing: 0em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.div-x {
  color: #9c9eaf;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 400;
  font-family: Lucida Grande;
}
.arrow-border{
    border-bottom: 3px solid #00b2ce;
    text-align: center;
}
.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 4px;
  justify-content: space-around;
}
.limi-salad {
  font-size: 16px;
  width:160px;
  font-family: poppins;
  font-weight: 600;
}

.dsplay {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  align-items: center;
}
.top-holder {
  height: 40vh;
  min-height: 250px;
}
.images {
  display: flex;
  bottom: 0;
  /* margin-bottom: -44%; */
  /* padding: 25px; */

  position: absolute;
}
.img {
  padding: 10px;
  
}

.mtop {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contact {
  display: flex;
  justify-content: space-around;
}
.website {
  height: 36px;
  width: 143px;
  background-color: rgba(59, 85, 243, 0.15);
  font-family: "Poppins";
  border-radius: 5%;
  /* background-color: black; */
  height: 36px;
  color: #3b55f3;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
}
.phone {
  background-color: rgba(250, 114, 104, 0.15);
  width: 143px;
  color: #00b2ce;
  font-family: "Poppins";
  border-radius: 5%;
  /* background-color: black; */
  height: 36px;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
}
.cardinfo {
  font-size: 15px;
  font-weight: 400;
  width: 92%;
  color: gret;
  color: #8d92a3;
}
.slide-box {
  /* max-width: 150px; */
  width: 100%;
  display: flex;
  padding: 10px;
}

.info-spacer .info-head img {
  width: 30px;
  height: 30px;
  margin: 10px 0px;
}
.info-spacer .info-head div {
  margin-left: 20px;

  /* Style for "ABOUT REST" */
  color: #1a1a1a;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
  text-transform: uppercase;
}
.cardss {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.02), 0 6px 20px 0 rgba(0, 0, 0, 0.049);
  transition: 0.5s;
  width:100%;
  height:120px;
  border-radius: 8px;
  display: flex;
  /* 5px rounded corners */
}
.back{
  position: absolute;
    color: white;
    margin-left: 10px;
    margin-top: 25px;
    font-size: 25px;
}
.card {
    background-color: white;
    position: absolute;
    /* z-index: 1000; */
    top: 37%;
    /* bottom: 22%; */
    margin: 16px;
    /* width: 92%; */
    height: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
.cardhead {
  display: flex;
  justify-content: space-around;
  display: flex;
  font-size: 16px;
  justify-content: space-around;
  margin-top: 10px;
  font-family: poppins;
  font-weight: bold;
}
.subhead {
  margin-top: 10px;
  font-size: 22px;
  margin-left: 5px;
  font-family: poppins;
  font-weight: 600;
}

.info-spacer .info-details {
  margin-left: 50px;
  /* Style for "This is a" */
  color: #8d92a3;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
}

.image-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.image-row .img-spacer {
  margin-right: 10px;
}

.spacer {
  margin: 20px 0px;
}
.oderimg {
  border-radius: 10px;
   width: 100px;
    
  /* height: 50px; */ 
}
.contain {
  padding-top: 10px;
  padding-left: 20px;
  width:100%;
}
.div-contin {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.resto-name {
  font-size: 40px;
  font-weight: 400;
  line-height: 1.3;
  font-family: Abril Fatface;
}

.resto-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resro-review-box {
  text-align: right;
}

.re {
  display: flex;
}
.restro-like {
  margin-top: 0px;
  display: flex;
  align-items: center;
}
.rediv {
  width: 55%;
  padding-left: 25px;
}
.imgout {
  width: 45%;
  padding-left: 50px;
}
.imgin {
  display: flex;
  padding-top: 35px;
  margin-left: 20px;
}
.imgbtmap {
  width: 30px;
  margin-right: 3px;
  height: 30px;
}
.imgbtap {
  width: 30px;
  margin-left: 4px;
  height: 30px;
}
.review {
  font-size: 12px;
  color: #8d92a3;
  /* margin-top: 10px; */
  font-family: poppins;
  font-weight: 500;
}

.leftdiv {
  display: flex;
  width: 100%;
  margin-left: 12px;
}
.leftdivimg {
  width: 55%;
  padding: 8px;
}
.lftimg {
  width: 100%;
  height: 100%;
}
.rgt {
  width: 45%;
  padding-top: 6px;
  padding-left: 4px;
}
.rgtimg {
  padding: 4px;
  width: 80%;
  height: 47%;
}
.runddiv {
  display: flex;
}
.patimg {
  width: 40px;
  height: 40px;
  margin-left: -10px;
}
.grptoimg {
  width: 40px;
  height: 40px;
}
.grptodiv {
  display: flex;
  justify-content: center;
  width: 30%;
  margin-top: 20px;
}
.grptodi {
  display: flex;
  justify-content: center;
  width: 30%;
  margin-top: 38px;
}
.grptohad {
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
}
.grpdiv {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}
.patfrnt {
  margin-left: 10px;
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #8d92a3;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
}
.dsplay {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}
.regba {
  font-family: Abril Fatface;
  font-size: 46px;
  font-style: normal;
  font-weight: 400;
  line-height: 62px;
  letter-spacing: 0em;
  text-align: left;
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
