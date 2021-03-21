<template>
  <div class="location-modal1">
    <div
      v-for="rst in rstrs"
      v-bind:key="rst._id"
      @click="getPermission(rst)"
      style="height:300px;"
    >
      <!-- <img  class="img-mocal" :src="rst.Image" />
      <div class="modal-text1"> {{ rst.Name}} </div> -->

      <div class="container1">
        <img 
            :src="rst.Image" 
            style="height:140%;  opacity:0.3;"
          />
        <div class="center1">{{ rst.Name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { modalController } from "@ionic/vue";
import { useRouter } from "vue-router";
import $dataService from "./../../data-service";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" },
  },
  data() {
    return {
      content: "Content",
      rstrs: [],
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  async mounted() {
    this.rstrs = await $dataService.getRestaurant();
  },
  components: {},
  methods: {
    async getPermission(rst) {
      debugger;
      const currentId = window.localStorage.getItem($dataService.KEYS.RESTID);
      const pickedId = rst._id;
      if (currentId != pickedId) {
        window.localStorage.setItem($dataService.KEYS.RESTID, pickedId);
        modalController.dismiss({ changed: true });
      } else {
        modalController.dismiss({ changed: false });
      }
    },
  },
});
</script>

<style>
.container1 {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  object-fit: cover;
  height: 300px;
}

.center1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
}

.img1 {
  width: 100%;
  opacity: 0.2;
}

.location-modal1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.location-modal1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.img-mocal {
  height: 50%;
  object-fit: cover;
}
.modal-text1 {
  position: relative;
  top: 80px;
  text-align: center;
  width: 100%;
  color: white;
  font-size: 24px;
  font-weight: bold;
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

.act-btn2 {
  border-radius: 60px;
  background-color: #ec2885;
  color: white;
  text-align: center;
  padding: 10px;
}
</style>

