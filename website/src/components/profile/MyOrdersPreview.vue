<template>
  <ion-page>
    <ion-content>
      <div style="margin-bottom: 220px" class="ion-padding">
        <div class="dsplay">
          <img
            @click="() => router.back()"
            class="arrow-icon"
            src="../../../public/assets/img/arrwleft.png"
          />
          <!-- <div class="dtail">Edit</div> -->
        </div>

        <div class="head">Your Orders</div>
        <div class="dsy" v-if="itemExist">
          <div class="slider2">
            <div
              class="slide-box"
              v-for="item in localCart"
              v-bind:key="item.MenuId"
            >
              <div class="card">
                <img
                  class="oderimg"
                  @click="
                    () =>
                      router.push({
                        path: '/tabs/profile/grilledBeef',
                        query: { itemId: item.MenuId },
                      })
                  "
                  :src="item.MenuObject.Image"
                />
                <div
                  class="contain"
                  @click="
                    () =>
                      router.push({
                        path: '/tabs/profile/grilledBeef',
                        query: { itemId: item.MenuId },
                      })
                  "
                >
                  <div class="div-contin">
                    <div class="limi-salad">{{ item.MenuObject.Name }}</div>
                    <div class="price">${{ item.Price }}</div>
                  </div>
                  <div class="text-contain">With cheese sauce</div>
                  <div class="div-x">x{{ item.Quantity }}</div>
                </div>
                <div>
                  <!-- <ion-icon
                    name="trash-outline"
                    auto-hide="false"
                    style="font-size: 24px;  color: #ec2885"
                    
                  ></ion-icon> -->
                  <img
                    style="
                      width: 25px;
                      position: absolute;
                      left: 290px;
                      height: 25px;
                    "
                    src="../../../public/assets/img/download.png"
                    @click="presentAlertConfirm(item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!itemExist"
          style="padding: 16px; text-align: center; margin-top: 40%"
          @click="() => router.push({ path: '/tabs/home' })"
        >
          You haven't added anything, try ordering now.
        </div>
      </div>
    </ion-content>
    <ion-footer>
      <div v-if="itemExist">
        <!-- <ul>
          <li>
            Subtotal <span style="font-family: 'Permanent Marker', cursive;">${{subPrice}}</span>
          </li>
          <li>
            Tax & Fee<span style="font-family: 'Permanent Marker', cursive;">${{taxPrice}}</span>
          </li>
          <li>Delivery <span style="font-family: 'Permanent Marker', cursive;">Free</span></li>
          <li>
            TOTAL<span style="font-family: 'Permanent Marker', cursive;">${{totalPrice}} </span>
          </li>
        </ul> -->
        <div style="text-align: center; margin: 20px 0">
          <ion-button @click="payNow" expand="block" class="button"
            >Pay Now
            <span
              style="
                color: #01b3ce;
                font-size: 18px;
                letter-spacing: 2px;

                margin: 10px;
              "
            >
              ${{ totalPrice }}</span
            ></ion-button
          >
        </div>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonButton,
  toastController,
  loadingController,
  IonInput,
  alertController,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
import $dataService from "./../../data-service";
declare const window: any;

export default defineComponent({
  data() {
    debugger;
    return {
      itemExist: false,
      localCart: [],
      price: 0,
      AddressBox: "",
      loading: true,
      noDataMessage: false,
      totalPrice: 0.0,
      subPrice: 0.0,
      taxPrice: 0.0,
      deliveryPrice: 0.0,
      discountPrice: 0.0,
    };
  },

  components: { IonContent, IonPage, IonButton },
  setup() {
    const router = useRouter();
    return { router };
  },

  async mounted() {
    this.calculateAndRenderUI();
  },

  methods: {
    async payNow(item: any) {
      const UserId = window.localStorage.getItem($dataService.KEYS.USERID); // "5fdbb2dc4ce9db1c07b38636",
      const RestaurantId = window.localStorage.getItem(
        $dataService.KEYS.RESTID
      ); // "5fe5c507e3f0c908dbcb383d",

      const orderObj: any = {
        Price: this.subPrice,
        Discount: this.discountPrice,
        Taxes: this.taxPrice,
        DeliveryCharge: this.deliveryPrice,
        FinalPrice: this.totalPrice,
        // Image: "image url ",
        RestaurantId: RestaurantId,
        UserId: UserId,
        Items: [],
      };

      let imageFound = false;
      for (let m = 0; m < (this.localCart || []).length; m++) {
        const lMenu = this.localCart[m];
        const menuObj = {
          MenuId: lMenu.MenuId,
          Price: lMenu.Price,
          Quantity: lMenu.Quantity,
          Size: lMenu.Size,
          AddOns: lMenu.AddOns,
        };
        orderObj.Items.push(menuObj);
        if (!imageFound) {
          try {
            orderObj.Image = lMenu.MenuObject.Image;
            console.log(orderObj.Image);
            imageFound = true;
          } catch (err) {
            console.log(err);
          }
        }
      }

      await $apiService.showLoading();
      const registerRes = await $apiService.postCall("orders/add", orderObj);
      console.log(registerRes, "registerRes");
      await $apiService.hideLoading();

      if (registerRes.apidata?._id) {
        await $apiService.presentToastWithOptions("Order has been initiated.");

        //window.localStorage.removeItem("LOCALCART");
        // alert(
        //   "Order has been placed and saved to database , Address selection and payment gateway is in progreess, You will be redirected to the orders screen for now"
        // );
        const orderId = registerRes.apidata?._id;
        this.AddressBox = window.localStorage.getItem("SELECTEDBOX");
        if (this.AddressBox == "pickup") {
          await $apiService.showLoading();

          // alert("orders/update-address/" + orderId);
          const registerRes = await $apiService.postCall(
            "orders/update-address/" + orderId,
            { Address: this.AddressBox }
          );
          console.log(registerRes, "registerRes");
          // alert(
          //     "Order has been placed and saved to database , payment gateway is in progreess, You will be redirected to the orders history screen for now"
          // );
          //await $apiService.presentToastWithOptions("Order has been placed.");
          //this.$router.push({ path: "/tabs/profile/orders-history" });

          const response: any = await $apiService.postCall(
            "orders/create-checkout-session",
            { orderId }
          );
          console.log(response);
          window.stripeLib.redirectToCheckout({
            sessionId: response.apidata.id,
          });
          await $apiService.hideLoading();
        } else {
          this.$router.push({
            path: "/tabs/profile/disCover",
            query: { cart: 1, orderid: registerRes.apidata._id },
          });
        }
      } else {
        await $apiService.presentToastWithOptions(
          "Something went wrong ,Please try again."
        );
      }
    },
    async presentAlertConfirm(item: any) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "<strong>Do you want to remove this item from cart?</strong>",
        buttons: [
          {
            text: "cancel",
            role: "cancel",
            cssClass: "primary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },

          {
            text: "yes",
            handler: () => {
              console.log("Confirm Okay");
              this.onDelete(item);
            },
          },
        ],
      });
      return alert.present();
    },
    onDelete(item: any) {
      let localCart: any = [];
      const localString = window.localStorage.getItem("LOCALCART");
      if (localString) {
        localCart = JSON.parse(localString);
      }
      localCart = localCart.filter((l: any) => l.MenuId != item.MenuId);
      console.log(localCart, item);
      window.localStorage.setItem("LOCALCART", JSON.stringify(localCart));
      this.calculateAndRenderUI();
    },
    async calculateAndRenderUI() {
      debugger;
      try {
        this.itemExist = false;
        let totalPrice = 0.0;
        const menus = await $dataService.getMenu();
        let localCart: any = [];
        const localString = window.localStorage.getItem("LOCALCART");
        if (localString) {
          localCart = JSON.parse(localString);
        }
        /*  console.log(localCart)
        console.log(localString);
        console.log("data to local storage");
         console.log(this.localCart) */
        for (let m = 0; m < localCart.length; m++) {
          localCart[m].MenuObject = menus.find(
            (mn: any) => mn._id == localCart[m].MenuId
          );
          let menuPrice = $dataService.getMenuPriceOnCart(localCart[m]);
          const quantity = localCart[m].Quantity || 1;
          menuPrice = menuPrice * quantity;
          totalPrice = totalPrice + menuPrice;
          console.log(m);
          console.log(localCart.length);
        }
        console.log(localCart);
        console.log(totalPrice);
        this.subPrice = totalPrice;
        this.totalPrice = this.subPrice + this.taxPrice;
        this.localCart = localCart;
        if ((this.localCart || []).length > 0) {
          this.itemExist = true;
        }
      } catch (err) {
        this.itemExist = false;
      }
    },
  },
});
</script>

<style scoped>
.slide-box {
  /* max-width: 150px; */
  padding: 10px 0px;
  width: 100%;
}
.arrow-icon {
  width: 21px;
  height: 21px;
}
.head {
  font-family: "Permanent Marker", cursive;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 10px;
}

.price {
  font-family: "Permanent Marker", cursive;
  font-weight: 600;
  width: 40px;
}
.button {
  --border-radius: 25px;
  --background: #ec2885;
  color: white;
  margin: 20px;
  font-size: 16px;
  letter-spacing: 2px;
  font-family: "Permanent Marker", cursive;
  height: 45px;
}
.div-contin {
  display: flex;
  justify-content: space-between;
  width: 180px;
}
.paycard {
  padding: 20px;
  background-color: #00b2ce;
  /* z-index: 1000; */
  outline: none;
  width: 100%;
  height: 250px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  bottom: -10px;
}
.paycard ul {
  list-style: none;
  padding-left: 0;
  color: #fff;
}
.paycard ul li {
  margin-bottom: 8px;
  font-family: "Poppins";
  font-weight: 400;
  color: rgba(255, 255, 255, 0.72);
}
.paycard ul li span {
  float: right;
  font-family: "Poppins";
  font-weight: 500;
  color: white;
}
.my-custom-class .primary {
  background-color: red;
}
.div-x {
  color: #9c9eaf;
  padding-top: 4px;
  font-size: 12px;
  font-weight: 400;
  font-family: "Permanent Marker", cursive;
}
.text-contain {
  color: #9c9eaf;
  padding-top: 10px;
  font-family: Lucida Grande;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
}
.limi-salad {
  margin-right: 20px;
  font-size: 16px;
  font-family: "Permanent Marker", cursive;
  font-weight: 600;
}
.pumkin {
  margin-right: 39px;
  font-size: 16px;
  font-weight: 600;
}
.sagptti {
  font-size: 16px;
  width: 102px;
  font-weight: 600;
}
.comming {
  margin-top: 16px;
  background: #00b2ce;
  border-radius: 16px;
  color: white;
  font-size: 10px;
  width: 48%;
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
  display: flex;
  width: 340px;
  align-items: center;
  position: relative;
  /* 5px rounded corners */
}
.contain {
  padding: 20px;
  justify-content: space-between;
}
/* Add rounded corners to the top left and the top right corner of the image */
.oderimg {
  border-radius: 10px;
  max-width: 127px;
  width: 127px !important;
  height: 140px;
}

.slide-box-image {
  background: #f1f3f8;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  padding: 20px;
}

.slide-box-image:active {
  background: #00b2ce;
}
.theme-color {
  background: #00b2ce;
}

.dtail {
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  color: #8d92a3;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: left;
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

.arrow-border {
  border-bottom: 3px solid #00b2ce;
  width: 21%;
  text-align: center;
}

.arrow:active {
  border-bottom: 3px solid #00b2ce;
  width: 21%;
  text-align: center;
}

.slider2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
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
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
}
.dsy {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
}
.dsply {
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  padding-bottom: 0px;
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
