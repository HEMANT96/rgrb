<template>
  <div class="content">
    <div class="col-md-8 flex-container-top">
      <base-button
        type="primary"
        round
        icon
        class="top-button-back"
        @click="$router.push('list')"
      >
        <i class="fa fa-arrow-left"></i>
      </base-button>

      <h2 v-if="!isEdit" class="text-center">Add Restaurant</h2>
      <h2 v-if="isEdit" class="text-center">Edit Restaurant</h2>
    </div>
    <div class="row">
      <div class="col-md-8">
        <card>
          <!-- <h5 slot="header" v-if="!isEdit" class="title">New Restaurant</h5>
          <h5 slot="header" v-if="isEdit" class="title">Edit Restaurant</h5> -->
          <form>
            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Name *"
                  maxlength="100"
                  placeholder="Name"
                  v-model="Name"
                >
                  <!-- {{ rstr.Name }} -->
                </base-input>
              </div>

              <div class="col-md-6">
                <base-input
                  type="tel"
                  label="Phone Number *"
                  maxlength="10"
                  placeholder="Phone Number"
                  v-model="PhoneNumber"
                  @keyup="onlyNumeric"
                >
                  <!-- {{ rstr.Name }} -->
                </base-input>
              </div>
              <!-- <div class="col-md-3">
                <base-input
                  type="text"
                  label="Username"
                  placeholder="Username"
                 
                >
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  type="email"
                  label="Email address"
                  placeholder="mike@email.com"
                
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  label="Address"
                  placeholder="Home Address"
                 
                >
                </base-input>
              </div> -->
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  label="Address"
                  maxlength="250"
                  placeholder="Address *"
                  v-model="Address"
                >
                  <!-- {{ rstr.Title }} -->
                </base-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <base-input label="About Restaurant">
                  <textarea
                    class="form-control"
                    placeholder="About *"
                    v-model="About"
                  >
                  </textarea>
                </base-input>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-12">
                <base-input label="About Restaurant">
                  <textarea
                    class="form-control"
                    placeholder="About"
               
                  >
                  </textarea>
                </base-input>
              </div>
            </div> -->

            <base-button
              v-if="!isEdit"
              native-type="submit"
              type="primary"
              @click="AddRest()"
              class="btn-fill"
              :disabled="loading"
            >
              Save
            </base-button>

            <base-button
              v-if="isEdit"
              native-type="submit"
              type="primary"
              @click="UpdateRest()"
              class="btn-fill"
              :disabled="loading"
            >
              Update
            </base-button>
          </form>
        </card>
      </div>
      <div class="col-md-4" v-for="user in [1]" v-bind:key="user">
        <card class="card-user">
          <p class="card-text"></p>
          <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <!-- <a href="javascript:void(0)">
              <img class="avatar" src="img/emilyz.jpg" alt="..." />
              <h5 class="title">Mike Andrew</h5>
            </a>
            <p class="description">Ceo/Co-Founder</p> -->

            <div class="col-md-12 col-sm-12" v-if="!isEdit">
              <h4 class="card-title">Restaurant Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Select Image"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Restaurant Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Update Image"
              />
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="full-screen-loader" v-if="loading">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
  </div>
</template>
<script>
// import UserCard from "../Pages/UserProfile/UserCard.vue";

import { ImageUpload } from "src/components/index";
import { image } from "vee-validate/dist/rules";

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      Address: "",
      Name: "",
      PhoneNumber: "",
      City: "",
      About: "",
      Image: null,
      isEdit: false,
      loading: false,
      imageUploaded: false,
    };
  },

  async mounted() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    if (id == -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      let restr = await this.$apiService.getCall("restaurant/" + id);
      console.log(restr);
      this.About = restr.apidata.About;
      this.PhoneNumber = restr.apidata.PhoneNumber;
      this.Name = restr.apidata.Name;
      this.Address = restr.apidata.Address;
      this.Image = restr.apidata.Image;
    }
  },
  methods: {
    async UpdateRest() {
      var id = this.$route.query.id;
      if (
        !this.Name &&
        !this.About &&
        !this.Address &&
        !this.Image &&
        !this.PhoneNumber
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.PhoneNumber) {
        this.$apiService.notify("Phone number is mandatory.");
        return;
      }
      if (!this.Address) {
        this.$apiService.notify("Address is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }

      this.loading = true;

      let imageUrl = this.Image;
      if (this.imageUploaded) {
        imageUrl = await this.$apiService.uploadImage(this.Image);
      }

      var Restdata = {
        Name: this.Name,
        About: this.About,
        Address: this.Address, // this is address
        PhoneNumber: this.PhoneNumber,
        Image: imageUrl, // this.Image,
      };

      var update_rest = await this.$apiService.putCall(
        "restaurant/update/" + id,
        Restdata
      );
      console.log(update_rest);
      console.log(update_rest.error);
      console.log("line 291");
      if (update_rest.error) {
        this.$apiService.notify(update_rest.error);
      } else {
        this.$apiService.notify("Restaurant has been updated.");
        this.$router.push("/restaurants/list");
      }
    },
    async AddRest() {
      debugger;
      if (
        !this.Name &&
        !this.About &&
        !this.Address &&
        !this.Image &&
        !this.PhoneNumber
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }

      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.PhoneNumber) {
        this.$apiService.notify("Phone number is mandatory.");
        return;
      }

      if (!this.Address) {
        this.$apiService.notify("Address is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      this.loading = true;

      const imageUrl = await this.$apiService.uploadImage(this.Image);

      var add_res = this.$apiService.postCall("restaurant/add", {
        Name: this.Name,
        About: this.About,
        Address: this.Address,
        PhoneNumber: this.PhoneNumber,
        Image: imageUrl,
      });

      this.loading = false;
      console.log(add_res);
      // if(add_res.apidata.error){
      //   this.$apiService.notify(add_res.apidata.error);
      // }
      this.$apiService.notify("Restaurant has been added.");
      this.$router.push("/restaurants/list");
    },
    onlyNumeric() {
      this.PhoneNumber = this.PhoneNumber.replace(/[^0-9]/g, "");
    },

    onImageChange(file) {
      this.Image = file;
      this.imageUploaded = true;
    },
  },
};
</script>
<style></style>
