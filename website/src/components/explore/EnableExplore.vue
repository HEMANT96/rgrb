<template>
  <div class="location-modal">
    <img class="img-mocal" src="../../../public/assets/img/explore.png" />

    <div class="modal-text ion-padding">
      <div>
        <div class="location-text">Explore food with us</div>
        <div class="location-text-sub">lorem lipsum lorem lipsum</div>
      </div>
      <div class="act-btn3" @click="getPermission">EXPLORE</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { modalController } from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" },
  },
  data() {
    return {
      content: "Content",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  components: {},
  methods: {
    async getPermission() {
      modalController.dismiss({ permission: true });
      this.router.push({ path : '/tabs/home'})
    },
  },
});
</script>

<style>


.location-modal {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  height: 100%;
}
.img-mocal {
  height: 50%;
  object-fit: cover;
}
.modal-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
}

.location-text {
  color: #000521;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
}

.location-text-sub {
  color: #8d92a3;
  font-family: Poppins;
  font-size: 15px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
}

.act-btn3 {
  border-radius: 60px;
  background-color: #ec2885;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>

