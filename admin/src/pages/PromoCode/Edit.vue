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

      <h2 v-if="!isEdit" class="text-center">Add Promocode</h2>
      <h2 v-if="isEdit" class="text-center">Edit Promocode</h2>
    </div>
    <div class="row">
      <div class="col-md-8">
        <card>
          <!-- <h5 slot="header" v-if="!isEdit" class="title">New Menus</h5>
          <h5 slot="header" v-if="isEdit" class="title">Edit Menus</h5> -->
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
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="Number"
                  label="Discount *"
                  onKeyPress="if(this.value.length==3) return false;"
                  placeholder="Discount"
                  v-model="Discount"
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input label="Tagline *">
                  <textarea
                    class="form-control"
                    placeholder="Tagline "
                    v-model="Tagline"
                  >
                  </textarea>
                </base-input>
              </div>
            </div>
            <h3 style="margin-top: 20px">Discount Type</h3>

            <div class="row" style="padding: 10px">
              <div class="col-md-6">
               <base-checkbox id="Percentage"  v-model="Absolute" @input="apscall()" >Apply discount as absolute discount </base-checkbox>
              </div>
              <!-- <div class="col-md-6">
                 <base-radio id="Absolute"  v-model="Absolute" @input="apscall()" >Absolute</base-radio>
              </div> -->
            </div>

            <div class="row">
              <base-button
                v-if="!isEdit"
                native-type="submit"
                type="primary"
                @click="AddPromo()"
                class="btn-fill"
                :disabled="loading"
              >
                Save
              </base-button>
              <div class="col-md-6">
                <base-button
                  v-if="isEdit"
                  native-type="submit"
                  type="primary"
                  @click="UpdatePromo()"
                  class="btn-fill"
                  :disabled="loading"
                >
                  Update
                </base-button>
              </div>
            </div>
          </form>
        </card>
      </div>

      <div class="col-md-4">
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
              <h4 class="card-title">Promocode Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Select Image"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Promocode Image</h4>
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
import { TimeSelect, DatePicker, Select, Option } from "element-ui";
import { ImageUpload, BaseCheckbox, BaseRadio } from "src/components/index";

export default {
  components: {
    ImageUpload,
    BaseRadio,
    BaseCheckbox
  },
  data() {
    return {
      Name: "",
      Tagline: "",
      Discount: "",
      Percentage: false,
      Absolute: false,
      Image: null,
      isEdit: false,
      loading: false,
    };
  },
  async mounted() {
    debugger;
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    if (id == -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      let promo = await this.$apiService.getCall("promocode/" + id);
      console.log(promo);
      this.Tagline = promo.apidata.Tagline;
      this.Discount = promo.apidata.Discount;
      this.Name = promo.apidata.Name;
      this.Image = promo.apidata.Image;
      this.Percentage = promo.apidata.Percentage;
      this.Absolute = promo.apidata.Absolute;
    }
  },
  methods: {
    async apscall(){
      // debugger;
      //  if(this.Absolute){
      //    // this.Percentage = false;
      //  }
    },
    async UpdatePromo() { 
      debugger
      var id = this.$route.query.id;
      if (!this.Name && !this.Tagline && !this.Image) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }

      if (!this.Tagline) {
        this.$apiService.notify("Tagline is mandatory.");
        return;
      }
      if (!this.Discount) {
        this.$apiService.notify("Discount is mandatory.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      if(!this.Absolute){
        if(this.Discount>100){
           this.$apiService.notify("Percentage discount should be less than 100.");
        return;

        }
      }

      //   if (!this.Percentage && !this.Absolute) {
      //   this.$apiService.notify("Discount type is mandatory.");
      //   return;
      // }
      //    if (this.Percentage && this.Absolute) {
      //   this.$apiService.notify("There Should be only single type of Discount. ");
      //   return;
      // }

      this.loading = true;

      let imageUrl = this.Image;
      if (this.imageUploaded) {
        imageUrl = await this.$apiService.uploadImage(this.Image);
      }

      var Promodata = {
        Name: this.Name,
        Tagline: this.Tagline,
        Discount: this.Discount,
        Percentage: !this.Absolute,
        Absolute: this.Absolute,
        Image: imageUrl, // this.Image,
      };

      var update_promo = await this.$apiService.putCall(
        "promocode/update/" + id,
        Promodata
      );
      console.log(update_promo);

      this.$apiService.notify("Promocode has been updated.");
      this.$router.push("/promocode/list");
    },
    async AddPromo() {
      debugger;
      if (!this.Name && !this.Tagline && !this.Image) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }

      if (!this.Tagline) {
        this.$apiService.notify("Tagline is mandatory.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      if (!this.Discount) {
        this.$apiService.notify("Discount is mandatory.");
        return;
      }

      //  if (!this.Percentage && !this.Absolute) {
      //   this.$apiService.notify("Discount type is mandatory.");
      //   return;
      // }
      //    if (this.Percentage && this.Absolute) {
      //   this.$apiService.notify("There Should be only single type of Discount. ");
      //   return;
      // }
     
      this.loading = true;

      const imageUrl = await this.$apiService.uploadImage(this.Image);

      var add_promo = this.$apiService.postCall("promocode/add", {
        Name: this.Name,
        Tagline: this.Tagline,
        Discount: this.Discount,
        Image: imageUrl,
        Percentage: !this.Absolute,
        Absolute: this.Absolute,
      });

      this.loading = false;
      console.log(add_promo);

      this.$apiService.notify("Promocode has been added.");
      this.$router.push("/promocode/list");
    },
    

    onImageChange(file) {
      this.Image = file;
      this.imageUploaded = true;
    },
  },
};
</script>
<style></style>
