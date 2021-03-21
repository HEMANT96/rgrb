  <template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="setfont">Payment Failure/Cancellation</div> 
        <p>
          You payment has been failed , Please try again
        </p>

        <p>You will be automatically redirected to cart screen</p>

    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { IonPage } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";


export default defineComponent({
   data() {
    return {
      paystatus: 'PaymentCancel',
    };
  },

  name: "Cancel",
  props: {
    name: String,
  },
  components: { IonPage },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {

   const orderId = this.$router.currentRoute.value.query.oid;

    const registerRes =  $apiService.postCall("orders/update-pay-status/" + orderId, {
        Status: this.paystatus,
      });
   
     setTimeout(() => {
       this.$router.push({ path: "/tabs/profile/orderpreview" });
    }, 3000); 
  }
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
