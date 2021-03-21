  <template>
  <ion-page>
    <ion-content>
      <ion-slides class="slides" pager="true" :options="slideOpts">
        <ion-slide style="width: 100%; height: 100%">
          <img
            class="img"
            style="width: 100%; height: 100%"
            src="../../public/assets/img/home.png"
          />
        </ion-slide>

        <ion-slide>
          <div style="width: 100%">
            <ion-button class="discover" expand="full"> DISCOVER </ion-button>
            <img class="img" src="../../public/assets/img/home2.png" />
            <div class="welcome">Welcome</div>
          </div>
        </ion-slide>
        <ion-slide style="width: 100%">
          <img class="img" src="../../public/assets/img/home3.png" />
          <div class="text-head">
            <div class="heading">Order food faster & easier</div>

            <div class="sub-heading">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <img class="img" src="../../public/assets/img/home4.png" />

          <div class="text-head">
            <div class="heading">Order food faster & easier</div>

            <div class="sub-heading">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </div>
          </div>
        </ion-slide>

        <ion-slide>
          <div>
            <ion-button
              class="start"
              expand="full"
              @click="() => router.push({ path: '/signin' })"
            >
              START!
            </ion-button>
          </div>
          <img class="img" src="../../public/assets/img/home5.png" />
          <div class="head-text">
            <div class="slide">The abundant life food</div>

            <div class="slide-text">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </div>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import {
  IonSlides,
  IonSlide,
  IonPage,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  props: {
    name: String,
  },
  components: { IonSlides, IonSlide, IonPage, IonContent, IonButton },
  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    const router = useRouter();
    return { slideOpts, router };
  },
};
</script>

<style scoped>
.text-head {
  position: absolute;
  color: white;
  width: 250px;
  bottom: 80px;
}

.text-head .heading {
  font-size: 30px;
  font-family: "Permanent Marker", cursive;
letter-spacing: 1px;
  /* font-weight: 600; */
  margin-bottom: 10px;
}

.text-head .sub-heading {
  font-size: 12px;
}

.head-text {
  position: absolute;
  color: #000521;
  width: 250px;
  top: 70px;
}
.head-text .slide {
  font-size: 32px;
  font-weight: 600;
    font-family: 'Permanent Marker', cursive;
  margin-bottom: 10px;
}
.head-text .slide-text {
  font-size: 12px;
}

.img {
  width: 100%;
  /* height: 100%;
  min-height: 100%; */
  object-fit: cover;
}
.slides {
  height: 100%;
  min-height: 100%;
  background: white;
}
.forgot {
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: 55px;
  letter-spacing: 0em;
  color: navy;
  text-align: center;
}
.welcome {
  position: absolute;
  top: 55px;
  width: 100%;
  font-family: "Permanent Marker", cursive;
  letter-spacing: 2px;
  color: white;
  font-weight: 600;
  font-size: 38px;
}
.texthead {
  height: 50px;
  position: absolute;
  width: 100%;
  color: white;
  font-size: 40px;
  bottom: 25%;
}
.textsubhead {
  height: 50px;
  position: absolute;
  width: 100%;
  color: white;
  font-size: 18px;
  bottom: 9%;
}
.slide4head {
  height: 50px;
  position: absolute;
  width: 100%;
  color: black;
  font-size: 40px;
  top: 20%;
}
.slide4subhead {
  height: 50px;
  position: absolute;
  width: 100%;
  color: black;
  font-size: 18px;
  top: 37%;
}
#container a {
  text-decoration: none;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}
.discover {
  --background: white;
  --color: #00b2ce;
  margin: 0%;
  font-size: 16px;
  font-family: "Permanent Marker", cursive;
  letter-spacing: 5px;
  font-weight: 600;
  width: 100%;
  height: 51px;
  position: absolute;
  bottom: 4%;
}

.start {
  --background: white;
  --color: #00b2ce;
  margin: 0%;
   font-family: 'Permanent Marker', cursive;
   letter-spacing: 5px;
  /* font-weight: 600; */
  width: 100%;
  height: 58px;
  position: absolute;
  bottom: 6%;
}
</style>
