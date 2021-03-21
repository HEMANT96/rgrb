  <template>
  <ion-page>
    <ion-content class="ion-padding">
    
    <div class="setfont">Payment Confirmation</div> 
        <p>
          We have received your payment and will be deliver your food asap, You
          can reach us in case of any query.
          <a href="mailto:orders@regrub.com">orders@regrub.com</a>.
        </p>

        <p>You will be automatically redirected to orders history screen</p>
    
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";

export default defineComponent({
   data() {
    return {
      paystatus: 'PaymentDone',
    };
  },
  props: {
    name: String,
  },
  components: { IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {
      
    const orderId = this.$router.currentRoute.value.query.oid;
    console.log(orderId)
    const registerRes =  $apiService.postCall("orders/update-pay-status/" + orderId, {
        Status: this.paystatus,
      });
      this.$router.push({ path: "/tabs/profile/orders-history" });
    setTimeout(() => {
      window.localStorage.removeItem("LOCALCART");
    }, 1000);
  },
});
</script>

<style scoped>
.setfont {
  font-family: Abril Fatface;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 40px;
}
</style>
