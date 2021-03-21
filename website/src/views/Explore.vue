<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Explore />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import Explore from "@/components/explore/Explore.vue";
import $dataService from '../data-service'

export default defineComponent({
  components: { Explore, IonContent, IonPage },
  async mounted() {
    debugger;
    let status = await this.getLocationState();
    console.log(status);

    if (status == "LOCATION") {
      await this.displayLocation();
    } else {
       status = await this.getExploreState();
       if (status == "SELECTION") {
        await this.displaySelection();
       }
    }

    
  },
  methods: {
    getExploreState() {
      return new Promise((resolve) => {
        const currentId = window.localStorage.getItem($dataService.KEYS.RESTID);
        if(currentId) {
          resolve("EXPLORE");
        } else {
          resolve("SELECTION");
        }
      });
    },
    getLocationState() {
      return new Promise((resolve) => {
        navigator.permissions &&
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (PermissionStatus) {
              if (PermissionStatus.state == "granted") {
                resolve("EXPLORE");
              } else if (PermissionStatus.state == "prompt") {
                resolve("LOCATION");
              } else {
                resolve("denied");
              }
            });
      });
    },
    async displayLocation() {
      this.$router.push({ path : '/enable' });
    },
    async displaySelection() {
      this.$router.push({ path : '/selection' });
    },
  },
});
</script>

<style>
.my-custom-class {
  background: rgba(0, 0, 0, 0.5) !important;
  padding: 20% 10% 20% 0% !important;
  border-radius: 0px 10px 10px 0px;
}

.my-custom-class .modal-wrapper {
  border-radius:0px 20px 20px 0px;
}
</style>