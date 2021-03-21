<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import $apiService from "./api-service";
import $dataService from "./data-service";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  async mounted() {
    $apiService.getCall("restaurant").then((test) => {
      const restarurants = test.apidata || [];
      window.localStorage.setItem($dataService.KEYS.RESTID ,restarurants[0]._id);
      window.localStorage.setItem($dataService.KEYS.RESTAURANT , JSON.stringify(test.apidata || []));
    });
    
    $apiService.getCall("categories").then((test) => {
      window.localStorage.setItem($dataService.KEYS.CATEGORIES , JSON.stringify(test.apidata || []));
    });

    $apiService.getCall("menus").then((test) => {
      window.localStorage.setItem($dataService.KEYS.MENUS , JSON.stringify(test.apidata || []));
    });
  }
});
</script>