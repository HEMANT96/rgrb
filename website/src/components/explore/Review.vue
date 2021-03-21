    <template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="dsplay">
        <img
         @click="() => router.back()"
          style="margin-left: 2px"
          src="../../../public/assets/img/leftarrow.png"
        />
        <div class="dtail">REVIEWS</div>
        <div style="width: 50px"></div>
      </div>

      <div class="divtop">
        <div class="reviewer">
          <div class="details">
            <img src="../../../public/assets/img/Pat.png" />
            <div>Ranveer Phan</div>
          </div>
          <div class="reviewer-date">20 Aug</div>
        </div>

        <div class="reviewimg">
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
        </div>

        <div class="reviewer-para">
          Great food! I have a great meal. Nice package
        </div>

        <div class="flexclass">
          <img src="../../../public/assets/img/reatimg.png" />
          <img src="../../../public/assets/img/reatimg1.png" />
        </div>
      </div>

      <div class="divtop">
        <div class="reviewer">
          <div class="details">
            <img src="../../../public/assets/img/Pat.png" />
            <div>Madison Dillard</div>
          </div>
          <div class="reviewer-date">15 Aug</div>
        </div>

        <div class="reviewimg">
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
        </div>

        <div class="reviewer-para">Lovely food</div>

        <div class="flexclass">
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg2.png"
          />
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg3.png"
          />
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg4.png"
          />
        </div>
      </div>

      <div class="divtop">
        <div class="reviewer">
          <div class="details">
            <img src="../../../public/assets/img/Pat.png" />
            <div>Sky Peacock</div>
          </div>
          <div class="reviewer-date">20 Aug</div>
        </div>

        <div class="reviewimg">
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
        </div>

        <div class="reviewer-para">Delicious!</div>

        <div class="flexclass">
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg5.png"
          />
        </div>
      </div>

      <div class="divtop">
        <div class="reviewer">
          <div class="details">
            <img src="../../../public/assets/img/Pat.png" />
            <div>Ilayda Sharpe</div>
          </div>
          <div class="reviewer-date">21 Aug</div>
        </div>

        <div class="reviewimg">
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
          <img src="../../../public/assets/img/star.png" />
        </div>

        <div class="reviewer-para">
          Great food! I have a great meal. Nice package
        </div>

        <div class="flexclass">
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg6.png"
          />
          <img
            style="margin: 3px"
            src="../../../public/assets/img/reatimg7.png"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";

export default {
  name: "ExploreContainer",
  props: {
    name: String,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  components: { IonContent, IonPage },
};
</script>

<style scoped>
.reviewer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reviewer .details {
  display: flex;
  align-items: center;
}

.reviewer .details img {
  margin-right: 10px;
}

.reviewer .details div {
  /* Style for "Sky Peacoc" */
  color: #111111;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
}

.reviewer-date {
  /* Style for "11 AUG" */
  color: #8d92a3;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
  text-transform: uppercase;
}
.reviewer-para {
  /* Style for "Delicious!" */
  color: #22242a;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
}
.tion {
  display: flex;
}

.divtop {
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f3f8;
  padding-bottom: 20px;
}
.divtop:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  margin-left: 16px;
  margin-right: 100px;
  width: 90%;
  border-bottom: 1px solid #f1f3f8;
}
.divtop:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.inputBox {
  display: flex;
  margin-right: 30px;
  padding-right: 6px;
  position: relative;
  z-index: 1;
}
.date {
  margin-right: 20px;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
  color: #8d92a3;
}
.patimg {
  width: 28px;
  height: 28px;
  margin-left: 15px;
  margin-right: 10px;
}
.flexclass {
  display: flex;
  margin-top: 10px;
}

.flexclass img {
  margin-right: 5px;
}

.para {
  display: flex;
  margin-left: 16px;
  margin-top: 4px;
}
.reviewimg {
  display: flex;
  margin: 6px 0px;
}
.inputBox:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  padding-left: 20px;
  margin-left: 20px;
  margin-right: 20px;
  width: 91%;
  border-bottom: 1px solid #f1f3f8;
}
.inputBox:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}
.Pout {
  display: flex;
  color: #00b2ce;
  justify-content: space-between;
}
.imgdor {
  padding-right: 10px;
}

.Dtodoor {
  display: flex;
  justify-content: space-between;
  width: 92%;
  padding: 4px;
  margin-left: 18px;
  margin-top: 10px;
  align-items: center;
}
.PtoOutSide {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  width: 92%;
  margin-left: 18px;
  margin-top: 6px;
  align-items: center;
}
.doption {
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: #8d92a3;
  letter-spacing: 0em;
  text-align: left;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
  align-items: center;
}
.mtop {
  margin-top: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.arrow-size {
  font-size: 18px;
  color: #8c8c8c;
  margin-right: 6px;
  padding-bottom: 5px;
}
.dtail {
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}
.text-align {
  text-align: center;
}
.dspy {
  display: flex;
  justify-content: space-between;
  padding: 4px;
  background: #f1f3f8;
  align-items: center;
  /*   border-bottom-color:#F1F3F8;
 */
  margin-top: 20px;
  margin-left: 18px;
  width: 92%;
  position: relative;
  z-index: 1;
}
.serchicon {
  width: 34px;
  height: 37px;
  margin-left: 0px;
  padding: 10px;
}
.regstr {
  line-height: 43.17px;
  border-radius: 30px;
  width: 100%;
  margin-right: 20px;
  font-family: "Abril Fatface";
  display: flex;
}
.dspy:before {
  content: "";
  position: absolute;
  bottom: 0;
  height: 1px;
  margin-right: 100px;
  width: 99%;
  border-bottom: 1px solid #f1f3f8;
}
.dspy:after {
  content: "";
  position: absolute;
  right: 0;
  height: 50%;
  width: 2px;
}

.inputbtn {
  justify-content: center;
  width: 100%;
}

.llable {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
  margin-left: 25px;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

  margin-bottom: 0px;
}
.lname {
  border-top: 1px;
  border-left: 0ch;
  color: black;
  border: 0cm;
  letter-spacing: 1.5px;
  font-size: 22px;
  padding-bottom: 0px;
  outline: 0ch;
  height: 30px;
  width: 90%;
  font-weight: 500;
  margin-top: 8px;
  margin-left: 10px;
  padding-left: 12px;
  margin-bottom: 0px;
  margin-right: 20px;
  border-right: 0ch;
  border-color: #444141;
}
.backPer {
  background-color: #f8f8f8;
  font-size: 20px;
  flex-direction: row;
  align-content: left;
  padding: 10px;
  margin-top: 25px;
  text-align: center;
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
  margin-bottom: 20px;
}

.regstr {
  font-size: 32px;
  font-weight: 700px;
  font-family: "Abril Fatface";
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
