<template>
  <ion-page>
    <ion-header>     
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Favourite page</ion-title>
        </ion-toolbar>
      </ion-header>
      <Favourite />
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Favourite from '@/components/favourite/Favourite.vue';

export default  {
  components: { Favourite, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>