<template>
  <ion-page>
    <ion-content>
      <Home />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonContent, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import Home from "@/components/home/Home.vue";

export default defineComponent({
  components: { Home, IonContent, IonPage },  
});
</script>

