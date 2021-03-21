<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="spacer">
        <img
          @click="() => router.push({ path : '/tabs/explore/'})"
          src="../../../public/assets/img/arrwleft.png"
        />
      </div>

      <div class="resto-row spacer"  @click="() => router.push({ path : '/tabs/explore/restaurant/review'} )">
        <div class="resto-name">Regrub {{restaurant.Name}}</div>

        <div class="resro-review-box">
          <div class="imagein">
            <img class="imgbtmap" src="../../../public/assets/img/Bitmap.png" />
            <img class="imgbtap" src="../../../public/assets/img/Bitmap.png" />
          </div>
          <div>
            <div class="review">
              <span
               
              >REVIEWS(33)</span>
            </div>
            <div class="reviewimg">
              <img src="../../../public/assets/img/star.png" />
              <img src="../../../public/assets/img/star.png" />
              <img src="../../../public/assets/img/star.png" />
              <img src="../../../public/assets/img/star.png" />
              <img src="../../../public/assets/img/star.png" />
            </div>
          </div>
        </div>
      </div>

    <div class="spacer" style="margin:30px 0px;">

      <div class="image-row">
        <div class="img-spacer" style="width:98%;height:98%;">
          <img 
          style="-border-radius:20px;"
           :src="restaurant.Image" 
          />
        </div>
        <div class="img-spacer" style="width:50%;height:50%;">
          <img 
           style="-border-radius:20px;"
           :src="restaurant.Image" 
           />
          <img 
           style="-border-radius:20px;"
           :src="restaurant.Image" 
           />
        </div>
      </div>

      <div class="spacer restro-like">
        <div class="runddiv">
          <img style="margin-left: 0px;" class="patimg" src="../../../public/assets/img/Pat.png" />
          <img class="patimg" src="../../../public/assets/img/Pat1.png" />
          <img class="patimg" src="../../../public/assets/img/Pat2.png" />
        </div>
        <div class="patfrnt">and 11,770 people like this</div>
      </div>

      
      </div>
      <div class="info-spacer">
        
        <div class="info-head">  
          <img  src="../../../public/assets/img/Group2.png" />
          <div style="  font-family: 'Permanent Marker', cursive;" >ABOUT RESTAURANT</div>
        </div>

        <div class="info-details">{{restaurant.About}}</div>

      </div>

      <div class="info-spacer">
        
        <div class="info-head">  
          <img  src="../../../public/assets/img/Group2.png" />
          <div style="  font-family: 'Permanent Marker', cursive;" >OPEN HOURS</div>
        </div>

        <div class="info-details"> 
          Everyday {{restaurant.CreatedOn}}
          <!--(8am - 10pm) --> 
         </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
import { defineComponent } from "vue";

export default defineComponent ({
  data() {
    return {
      restaurant: [],
      categories: []
    }
  },
   components: { IonContent, IonPage,},
  props: {
    name: String,    
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {    
    const rstrs = await $dataService.getRestaurant();
    const restId = window.localStorage.getItem($dataService.KEYS.RESTID);
    this.restaurant = (rstrs || []).find((r: any) => r._id == restId);

    this.categories = await $dataService.getCategory();

    console.log({ restaurant: this.restaurant , categories: this.categories})
  }
});

</script>

<style scoped>

.info-spacer {
  margin: 20px 0px
}

.info-spacer .info-head {
  display: flex;
  align-items: center;
  /* Font-family: poppins; */
  font-weight: 500;
  
}

.info-spacer .info-head img {
  width: 30px;
  height: 30px;
  margin: 10px 0px;
}
 .info-spacer .info-head div{
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
  margin-top: 10px;
  Font-family: poppins;
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
