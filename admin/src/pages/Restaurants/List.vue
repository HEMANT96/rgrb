<template>
  <div class="content">
    <div class="col-md-8 flex-container-top">
      <h2 class="text-center">Restaurants List</h2>

      <base-button
        type="primary"
        round
        icon
        class="top-button"
        @click="$router.push('add?id=-1')"
      >
        <i class="fa fa-plus"></i>
      </base-button>
    </div>

    <div class="row">
      <div class="col-md-6" v-for="rstr in restarurants" v-bind:key="rstr._id">
        <img class="rest-img" v-lazy="rstr.Image" alt="lazy load" />
        <card class="card-user">
          <p class="card-text"></p>
          <div class="author">
            <!-- <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div> -->

            <a href="javascript:void(0)">
              <!-- <img class="avatar" src="img/emilyz.jpg" alt="..." /> -->
              <h5 class="title">{{ rstr.Name }}</h5>
            </a>
            <p class="description">{{ rstr.Address }}</p>
          </div>
          <p></p>
          <div class="card-description">
            {{ rstr.About }}
          </div>

          <div slot="footer" class="rest-footer">
            <div>
              <!-- <button class="btn">
                <i class="fa fa-list-alt"></i> Categories
              </button> -->
              <button class="btn" @click="openModal(rstr)">
                <i class="fa fa-coffee"></i> Menus
              </button>
            </div>
            <div>
              <button
                class="btn btn-fill"
                @click="$router.push('edit?id=' + rstr._id)"
              >
                <i class="fa fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="row loader-pos">
      <div class="sk-chase" v-if="loading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>

      <div class="no-data-message" v-if="noDataMessage">
        <div>There are no records found</div>
      </div>
    </div>

    <!-- Classic Modal -->
    <modal
      :show.sync="modals"
      headerClasses="justify-content-center"
      modalClasses="modal-lg"
    >
      <h4 slot="header" class="title title-up">{{ restname }}'s Menus</h4>
      <div class="row">
        <div v-for="menu in menuslist" v-bind:key="menu._id" class="col-md-4">
          <card class="card-user">
            <p class="card-text"></p>
            <div class="author">
              <div class="block block-one"></div>
              <div class="block block-two"></div>
              <div class="block block-three"></div>
              <div class="block block-four"></div>
              <a href="javascript:void(0)">
                <img class="avatar" :src="menu.Image" alt="..." />
                <h5 class="title">{{ menu.Name }}</h5>
              </a>
              <div class="price">{{ menu.Price }} $</div>
            </div>
          </card>
          <div class="ribbon" v-if="menu.Discount">{{ menu.Discount }}%</div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { Modal, BaseAlert } from "src/components";

export default {
  data() {
    return {
      restarurants: [],
      loading: true,
      noDataMessage: false,
      modals: false,
      restname: "",
      menus: [],
      menuslist: [],
    };
  },
  components: {
    Modal,
    BaseAlert,
  },
  async mounted() {
    this.loading = true;
    let test = await this.$apiService.getCall("restaurant");
    console.log(test);
    this.restarurants = test.apidata;
    this.loading = false;
    if ((this.restarurants || []).length == 0) {
      this.noDataMessage = true;
    }

    let test1 = await this.$apiService.getCall("menus");
    console.log(test1);
    this.menus = test1.apidata || [];
  },
  methods: {
    openModal(rstr) {
      debugger;
      this.modals = true;
      this.restname = rstr.Name;
      // this.menuslist = (this.menus || []).filter(
      //   (m) => m.RestaurantId == rstr._id
      // );
        this.menuslist = (this.menus || []).filter((m) => m.RestaurantId._id == rstr._id); 

      console.log(this.menuslist);
    },
  },
};
</script>

