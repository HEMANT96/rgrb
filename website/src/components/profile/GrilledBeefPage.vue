<template>
  <ion-page>
    <ion-content>
      <div class="bgtop">
        <div>
          <img class="imgsize" 
          :src="currentMenu.Image" />
        </div>
        <img
          class="signin-link"
          @click="() => router.back()"
          src="../../../public/assets/img/Iwacon.png"
        />
      </div>
      <div class="input">
        <div class="register">
          {{ currentMenu.Name }}
        </div>
        <div class="para">
          <div>
            {{ currentMenu.About }}
          </div>
          <!-- <div class="sze"><div class="szetext">Choose Size</div></div>
          <div class="sebtn">
            <div
              class="not-active-size"
              v-on:click="activeBtn = 'SMALL'"
              v-bind:class="{ 'highlight-active': activeBtn == 'SMALL' }"
            >
              Small
            </div>
            <div
              class="not-active-size"
              v-on:click="activeBtn = 'MEDIUM'"
              v-bind:class="{ 'highlight-active': activeBtn == 'MEDIUM' }"
            >
              Medium
            </div>
            <div
              class="not-active-size"
              v-on:click="activeBtn = 'LARGE'"
              v-bind:class="{ 'highlight-active': activeBtn == 'LARGE' }"
            >
              Large
            </div>
          </div> -->
          <div class="sze"><div class="szetext">Choose Amount</div></div>
          <div class="sebtan">
            <div class="crcles" @click="itemminus()">
              <div class="relative">
                <img
                  class="imgscle"
                  src="../../../public/assets/img/crlce.png"
                />
                <img
                  class="imgminu"
                  style=""
                  src="../../../public/assets/img/horzontl.png"
                />
              </div>
            </div>
            <div class="crcles mrgtp">{{ itemCount }}</div>
            <div class="crcles" @click="itemplus()">
              <div class="relative">
                <img
                  class="imgscle"
                  src="../../../public/assets/img/crlce.png"
                />
                <img
                  class="imgmins"
                  src="../../../public/assets/img/horzontl.png"
                />
                <img
                  class="imgminus"
                  src="../../../public/assets/img/vrtcl.png"
                />
              </div>
            </div>
          </div>
          <div class="sze">
            <div class="szetext" v-if="(currentMenu.Toppings || []).length > 0">
              Addons
            </div>
            <div
              class="szetext"
              v-if="(currentMenu.Toppings || []).length == 0"
            >
              No Addons
            </div>
          </div>
          <div
            class="conts"
            v-for="top in currentMenu.Toppings"
            v-bind:key="top.name"
          >
            <div
              class="cntnt"
              style="width: 100%; display: flex; justify-content: space-between"
            >
              <div class="szetext">{{ top.Name }} </div>
              <!-- </div>
            <div class="cntnt"> -->
              <div class="szetext">${{ top.Price }}</div>
              <!-- </div> -->
              <!-- <img
              
              class="divimg"
              src="../../../public/assets/img/rht.png"
            /> -->
              <ion-checkbox @ionChange="updatePrice()" v-model="top.isChecked">
              </ion-checkbox>
            </div>
            <!-- <div class="cntnt"><div class="szetext">Strawberry</div></div>
            <div class="cntnt conts" style="">
              <div class="szetext font-wet">Cherry</div>
              <img
                class="divimg"
                style=""
                src="../../../public/assets/img/rht.png"
              />
            </div>
            <div class="cntnt"><div class="szetext">Beef</div></div> -->
          </div>
          <!-- <div class="sze"><div class="szetext">Choose Sauce</div></div>
          <div class="m-10">
            <div class="cntnt"><div class="szetext">Sweet sauce</div></div>
            <div class="cntnt"><div class="szetext">Hot sauce</div></div>
            <div class="cntnt conts">
              <div class="szetext font-wet">Salsa sauce</div>
              <img class="divimg" src="../../../public/assets/img/rht.png" />
            </div>
          </div> -->
          <div class="m-35">
            <div class="cntnt total">
              <div class="szetext font-wet">Total</div>
              <div class="font-wet">${{ price }}</div>
            </div>
          </div>
          <div class="paybtn">
            <ion-button class="button" @click="payNow()">PAY NOW</ion-button>
          </div>

          <div class="addcart">
            <ion-button
              class="button"
              @click="addToCart()"
              style="--background: #ec2885"
              >ADD TO CART</ion-button
            >
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonButton, IonPage, IonCheckbox } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent, onMounted } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
export default defineComponent({
  data() {
    const currentMenu: any = [];
    return {
      loading: true,
      noDataMessage: false,
      RestaurantId: "-1",
      select: 0,
      price: 0,
      activeBtn: "MEDIUM",
      itemCount: 1,
      currentMenu: currentMenu,
    };
  },

  components: { IonContent, IonPage, IonButton, IonCheckbox },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    selectAddon() {
      this.select = 1;
    },
    itemplus() {
      this.itemCount = this.itemCount + 1;
      this.updatePrice();
    },
    itemminus() {
      if (this.itemCount == 1) {
        this.itemCount = 1;
        return;
      }
      this.itemCount = this.itemCount - 1;
      this.updatePrice();
    },
    async updatePrice() {
      const currentMenu = this.currentMenu;
      this.price = $dataService.getMenuPrice(currentMenu);
      const quantity = this.itemCount || 1;
      this.price = this.price * quantity;
      console.log(this.price);
    
      // alert(price);
    },
    addToLocalStorage() {
      let localCart = [];
      try {
        const localString = window.localStorage.getItem("LOCALCART");
            
        if (localString) localCart = JSON.parse(localString);
      } catch (err) {
        console.log(err);
      }
     const localString = window.localStorage.getItem("LOCALCART");
      const isExit = JSON.parse(localString);
      if(isExit != null){
       const arr = isExit.map((a: any) => {return a.MenuId })
       console.log(localCart)
        /*  if(arr.indexOf(this.currentMenu._id) != -1){
          this.itemplus();
        }  */
      if(arr.indexOf(this.currentMenu._id) === -1) {
        this.itemplus()
       localCart.push({
        MenuId: this.currentMenu._id,
        Price: this.price,
        Quantity: this.itemCount,
        Size: this.activeBtn,
        AddOns: [
          {
            Name: "test",
            Price: 0,
          },
         ],
       });
        $apiService.presentToastWithOptions("Item has been added to cart.");
       
        }        
        else{
          const a = this.currentMenu
          const price = this.price
          const Qnty = this.itemCount
          console.log(a);
          localCart.forEach(function(obj: any) {
           if (obj.MenuId === a._id) {
             
           obj.Price = Number(obj.Price) + Number(price)
           obj.Quantity =   Number(obj.Quantity) + Number(Qnty)
          } 
         });
          $apiService.presentToastWithOptions("Item has been added to cart.");
        }
     }
     else{
        this.itemplus()
        localCart.push({
        MenuId: this.currentMenu._id,
        Price: this.price,
        Quantity: this.itemCount,
        Size: this.activeBtn,
        AddOns: [
          {
            Name: "test",
            Price: 0,
          },
         ],
       });
        
         $apiService.presentToastWithOptions("Item has been added to cart.");
     }
          
      window.localStorage.setItem("LOCALCART", JSON.stringify(localCart));
    },
    async addToCart() {
      this.addToLocalStorage();
       await $apiService.showLoading();
       this.$router.push("/tabs/home");
      // display toster adn message "Item has been added to cart";
      // send to home page
    },
    payNow() {
      this.addToLocalStorage();
      this.$router.push("/tabs/profile/orderpreview");
      // send to your orders () 21 my order
    },
  },
  async mounted() {
    const menuId = this.$router.currentRoute.value.query.itemId;
    const menusList = await $dataService.getMenu();
    this.currentMenu = menusList.find((m: any) => m._id === menuId);
    console.log("this is text message")
    console.log(this.currentMenu);
    
    for (let t = 0; t < (this.currentMenu.Toppings || []).length; t++) {
      this.currentMenu.Toppings[t].isChecked = false;
    }
    this.updatePrice();
  },
});
</script>


<style scoped>
.paybtn {
  text-align: center;
  margin-top: 25px;
}
.addcart {
  text-align: center;
  
  margin-top: 5px;
}
.m-10 {
  margin-top: 10px;
}
.m-35 {
  margin-top: 35px;
}
.mrgtp {
  margin-top: 4px;
}
.bgtop {
  background-color: #00b2ce;
}
.divimg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.relative {
  position: relative;
}
.font-wet {
  font-weight: 700;
}
.imgminu {
  position: absolute;
  top: 13px;
  left: 9px;
}
.imgminus {
  position: absolute;
  top: 9px;
  left: 14px;
}
.imgmins {
  position: absolute;
  top: 13px;
  left: 9px;
}
.img {
  width: 16px;
}
.total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.imgsize {
  width: 100%;
}
.sze {
  background-color: rgba(8, 0, 64, 0.04);
  margin-top: 20px;
  text-align: center;
  padding: 16px;
}
.cntnt {
  margin-top: 10px;
  text-align: left;
  padding: 16px;
}
.conts {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.signin-link {
  position: absolute;
  top: 30px;
  font-family: Poppins;
  font-weight: 500;
  left: 20px;
  color: white;
  text-transform: uppercase;
}

.button {
  width: 100%;
  letter-spacing: 2px;
  font-family: 'Permanent Marker', cursive;
  --border-radius: 25px;
  --background: #00b2ce;
  height: 45px;
  font-weight: 400;
}
.szetext {
  font-family: Poppins;
  color: #000521;
  font-weight: 600;
}
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.ion-pass {
  font-family: Poppins;
  font-size: 16px;
  margin-left: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.text-align {
  text-align: center;
}
.sebtn {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.sebtan {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.highlight-active {
  background-color: #3b55f3;
  color: #ffffff;
  font-weight: 700;
}
.not-active-size {
  border-radius: 70px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
}
.crcles {
  border-radius: 70px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}

.ion-input {
  font-family: Poppins;
  font-size: 16px;
  margin-left: 8px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}

.form {
  font-size: 6vw;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  margin: 10px 0px;
}
.form ion-item {
  margin-top: 10px;
}
.pass-img {
  margin-top: 10px;
  /* margin-right: 20px; */
  width: 16px;
  height: 16px;
}

.forgat {
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  justify-content: right;
  text-align: right;
  text-decoration: underline;
  color: #8d92a3;
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
.inptimg {
  margin-top: 10px;
  width: 18px;
  height: 18px;
}
.input {
  margin-top: 180px;
  padding: 2px 0px;
  background-color: var(--background);
  position: absolute;
  z-index: 1000;
  top: 139px;
  width: 100%;
  height: 500px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  bottom: 0px;
}
.inputBox {
  display: flex;
  position: relative;
  z-index: 1;
  margin-top: 20px;
}

.icon {
  position: absolute;
  float: right;
  right: 0;
  font-size: 21px;
  margin-top: 14px;
  color: #07509d;
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
  padding: 10px;
  align-items: center;
}

.regstr {
  font-size: 32px;
  font-weight: 700px;
  font-family: "Abril Fatface";
}
.register {
  text-align: center;
  margin-top: 25px;
  color: #000000;
 font-family: 'Permanent Marker', cursive;
  font-weight: 600;
  font-size: 24px;
}
.para {
  width: 260;
  padding: 20px;
  color: #8d92a3;
  font-family: Poppins;
  font-size: 14;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  letter-spacing: normal;
  line-height: normal;
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
