<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="hide-on-keyboard-open">
        <ion-tab-button tab="home" href="/tabs/home">
          <img class="img" src="../../public/assets/img/hometab.png" />
        </ion-tab-button>

        <ion-tab-button tab="search" href="/tabs/search">
          <img class="img" src="../../public/assets/img/searchtab.png" />
        </ion-tab-button>

        <ion-tab-button tab="xplore" href="/tabs/profile/orderpreview">
          <ion-badge v-if="item != 0" class="cartitem" color="danger">{{ item }}</ion-badge>
          <img class="cart" src="../../public/assets/img/Cart.png" />
        </ion-tab-button>

        <ion-tab-button tab="favourite" href="/tabs/explore">
          <img class="img" src="../../public/assets/img/favtab.png" />
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <img class="img" src="../../public/assets/img/profiletab.png" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { layers, home, search, heart, person } from "ionicons/icons";

export default defineComponent({
  data() {
    debugger;
    return {
      item: 0,
    };
  },
  name: "Tabs",
  components: { IonTabs, IonTabBar, IonTabButton, IonPage },
  setup() {
    return {
      layers,
      home,
      search,
      heart,
      person,
    };
  },
  async mounted() {
    debugger;

    let localCart: any = [];

    const localString = window.localStorage.getItem("LOCALCART");
    if (localString) {
      localCart = JSON.parse(localString);
    }
    this.item = localCart.length;
    // console.log(item);
  },
});
</script>
<style scoped>
.img {
  height: 25px;
  width: 25px;
}
.cart {
  padding-top: 4px;
  width: 100%;
  /* height: 45px; */
}
.cartitem {
  top: 2px;
  min-width: 15px;
  font-size: 10px;
}
</style>