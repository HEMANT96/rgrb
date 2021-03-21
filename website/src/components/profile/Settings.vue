<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div style="padding:18px;" @click="() => router.back()">
            <strong> &lt; </strong>
          
          </div>
        <div class="dsplay">
          
          <div class="setfont">Settings</div>         
        </div>
         <div class="backPer">
          <div
            class="ion-padding"
            style="
              font-size: 16px;
              color: #363636;
              font-family: Poppins;
              font-weight: 600;
            "
          >
              User Information
          </div>
        </div>

        <div class="info"
         @click="() => router.push({ path: '/personal-info', query: { redirect: '/tabs/profile'}})"        
         >
          <div>Information & Contact </div>
          <div  class="arrow">></div>
        </div>
        <div class="pass" 
        @click="() => router.push({ path: '/reset-password', query: { redirect: '/tabs/profile'}})"
          >
          <div> Password </div>
          <div  class="arrow">></div>
        </div>

        <div class="backPer">
          <div
            class="ion-padding"
            style="
              font-size: 16px;
              color: #363636;
              font-family: Poppins;
              font-weight: 600;
            "
          >
          App Setting
          </div>
        </div>
        <div class="info">
          <div>Language </div>
          <div style="display:flex;color: #B8BBC6;">
            <div class="padding:10px;">English ></div>
          </div>
        </div>
        <div  class="pass">
          <div>Notifications</div>
          <div style= "margin-left: auto;">
            <label class="switch">
              <input type="checkbox" checked />
              
              <span class="slider round"></span>
              
            </label>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    name: String
  },
  components: { IonContent, IonPage },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped>
.info {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  align-items: center;
  border-bottom: 1px #8c8c8c;
  z-index: 1;
  position: relative;
}
.backPer {
  background-color: #f8f8f8;
  font-size: 20px;
  flex-direction: row;
  align-content: left;

  font-family: Poppins;
  font-weight: 500;
  margin-top: 25px;
  text-align: left;
}

.arrow{
  font-weight: 400;
}
.info:before {
  content: "";
  position: absolute;
  bottom: 0;
  left:0px;
  height: 1px;
  margin-right: 100px;
  width: 100%;
  border-bottom: 1px solid #f1f3f8;
}
.info:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.pass {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  margin-bottom: 20px;
  align-items: center;
  z-index: 1;
  position: relative;
}
.pass:before {
  content: "";
  position: absolute;
  bottom: 0;
  left:0px;
  height: 1px;
  margin-right: 100px;
  width: 100%;
  border-bottom: 1px solid #f1f3f8;
}
.pass:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.setfont {
  font-family: Abril Fatface;
  font-size: 32px;
  font-style: normal;
  margin-left: 10px;
  font-weight: 400;
  line-height: 43px;
  letter-spacing: 0em;
  text-align: left;
}
.usrinformtion {
  height: 40px;
  width: 100%;
  background: rgba(8, 0, 64, 0.0352655);
  text-align: center;
  left: 0px;
  top: 171px;
  padding: 10px;
  border-radius: 0px;
}

.text-align {
  text-align: center;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.theme-color {
  color: #00b2ce;
}
.dsplay {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
