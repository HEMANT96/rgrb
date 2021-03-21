<template>
  <ion-page>
    <ion-header>     
    </ion-header>
    <ion-content :fullscreen="true">
     
      
      <Profile />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader } from '@ionic/vue';
import Profile from '@/components/profile/Profile.vue';

export default  {
  name: 'Tab4',
  components: { Profile, IonContent, IonHeader, IonPage }
}
</script>