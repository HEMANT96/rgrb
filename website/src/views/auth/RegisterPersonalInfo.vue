<template>
  <ion-page>
    <ion-content>
      <div id="container">
        <div class="dsplay ion-padding theme-color">
          <div @click="() => router.back()">
            <strong> &lt; </strong>
          </div>
          <!-- <div class="head" >DONE</div> -->
        </div>
        <div class="dsplay ion-padding">
          <div class="regstr">Register</div>
          <div class="step"><p>Step1/3</p></div>
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
            PERSONAL INFORMATION
          </div>
        </div>
        <div class="text-align">
          <input
            id="fileInput"
            type="file"
            style="display: none"
            @change="setSrc()"
          />
          <img
            id="imgid"
            class="mtop"
            :src="this.Image"
            @click="openDialog()"
          />
          <!-- <img
            id="imgid"
            class="mtop"
            v-if="this.imge"            
            src=""
            @click="openDialog"
          /> -->
        </div>
        <div class="inputbtn ion-padding">
          <div class="llable">First name</div>
          <input
            class="lname"
            placeholder="First Name"
            maxlength="12"
            v-model="firstname"
          />
          <div class="llable">Last name</div>
          <input
            class="lname"
            maxlength="12"
            placeholder="Last Name"
            v-model="lastname"
          />
        </div>
            <div style="position:absolute; bottom:30px; right:0px;">
          <button style="outline:none" @click="register()">Next</button>
        </div>
        <!-- <div> <ion-button class="button" 
              >SIGN IN</ion-button
            > </div> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonButton, IonLabel, IonInput, IonPage } from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import $apiService from "./../../api-service";
export default defineComponent({
  data() {
    return {
      values: [],
      firstname: "",
      lastname: "",
      loader: null,
      Image: "../../../public/assets/img/Oval.png",
      imge: true,
      noDataMessage: false,
    };
  },
  components: { IonPage, IonContent },
  setup() {
    const router = useRouter();
    return { router };
  },
  props: {
    timeout: { type: Number, default: 3000 },
  },
  async mounted() {
    debugger;
    console.log("mounted method");
    const userId = window.localStorage.getItem("USERID");
    if (userId) {
      const test = await $apiService.getCall("user/" + userId);
      this.firstname = test.apidata.FirstName;
      this.lastname = test.apidata.LastName;
      this.Image = test.apidata.Image || "../../../assets/img/Oval.png";
    }
    console.log(this.values);
  },
  methods: {
    setSrc() {
      debugger;
      const input: any = document.getElementById("fileInput");
      if (input.files && input.files[0]) {
        const fileName = input.files[0].name;
        const ext = fileName.split(".").pop(); // substring(fileName.indexOf(".") + 1 , fileName.length);
        if (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg") {
          this.Image = input.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const imgid: any = document.getElementById("imgid");
            imgid.src = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    },
    openDialog() {
      document.getElementById("fileInput").click();
    },

    async register() {
      if (!this.firstname && !this.lastname) {
        await $apiService.presentToastWithOptions("All fields are mandatory.");
        return;
      }
      if (!this.firstname) {
        await $apiService.presentToastWithOptions(
          "FirstName should not be empty."
        );
        return;
      }
      if (!this.lastname) {
        await $apiService.presentToastWithOptions(
          "LastName should not be empty."
        );
        return;
      }

      if (!this.Image) {
        await $apiService.presentToastWithOptions(
          "Profile pic should not be empty."
        );
        return;
      }

      await $apiService.showLoading();

      const imageUrl = await $apiService.uploadImage(this.Image);
      const userId = window.localStorage.getItem("USERID");
      const registerRes = await $apiService.putCall("user/profile/" + userId, {
        FirstName: this.firstname,
        LastName: this.lastname,
        Image:
          imageUrl ||
          "https://static.jobscan.co/blog/uploads/linkedin-profile-picture-1280x720.jpg",
      });
      await $apiService.presentToastWithOptions(
        "Personal-information has been added successfully."
      );

      await $apiService.hideLoading();
      this.gotoPersonalInfo();
    },

    async gotoPersonalInfo() {
      const strQ: string = this.$router.currentRoute.value.query
        .redirect as string;
      if (strQ) {
        this.$router.push({ path: strQ });
      } else {
        this.$router.push({ path: "/delivery-details" });
      }
    },
  },
});
</script>

<style scoped>
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}
.text-align {
  text-align: center;
}
.button {
  width: 100%;
  --border-radius: 25px;
  --background: #ec2885;
  height: 45px;
  letter-spacing: 4px;
  font-family: "Permanent Marker", cursive;

  /* font-weight: 400; */
}
button {
  border: 0;
  font-weight: 400;

  font-family: "Permanent Marker", cursive;
  float: right;
  font-size: 18px;
  letter-spacing: 1px;
  height: 32px;
  color: #e01b78;
  text-align: left;
  padding: 6px 15px;
  border-radius: 25px 0 0 25px;
  width: 110px;
  background: #feb713;

  line-height: 1;
}
.inputbtn {
  justify-content: center;
  width: 100%;
}

.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  opacity: 0.5;
  font-size: 15px;
  font-family: Poppins;
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 0px;
}
.head {
  font-family: Poppins;
  color: #00b2ce;
  font-weight: 600;
}
.step {
  font-family: Poppins;
  font-weight: 400;
}
.lname {
  border-top: 1px;
  border-left: 0ch;
  height: 30px;
  font-family: Poppins;
  font-weight: 600;
  /* margin-right: 20px; */
  border-right: 0ch;
  border-color: #f1f3f8;
  margin-top: 10px;

  margin-bottom: 10px;
  outline: none;
  width: 100%;
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

.display {
  display: flex;
  align-content: space-between;
  margin-top: 30px;
}
.theme-color {
  color: #00b2ce;
}
.dsplay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Poppins;
  font-weight: 500;
}

.regstr {
  font-size: 32px;
  font-weight: 400;
  font-family: "Permanent Marker", cursive;
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
