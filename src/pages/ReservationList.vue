<template>
  <div class="conteiner">
    <div class="Search">
      <the-search @isset-state="state"></the-search>
    </div>
    <div class="Table-h">
      <h3>Osoba</h3>
      <h3>Książka</h3>
      <h3>data do</h3>
      <h3>Stan</h3>
    </div>

    <reservation-table
      v-for="rev in Revs"
      :key="rev.id"
      :id="rev.id"
      :bookName="rev.bookName"
      :bookId="rev.bookId"
      :userName="rev.userName"
      :userId="rev.userId"
      :dataTo="rev.dataTo"
      :state="rev.state"
      @activ-div="activate"
      :class="{ active: rev.id == activ }"
      :selectedState="this.selectedState"
    ></reservation-table>
    <div v-if="permission === 'Admin'">
      <the-footer-menu-Res
        :activ="activ"
        @Rev-cancel="revBack"
        @Rev-Con="revCon"
      ></the-footer-menu-Res>
    </div>
  </div>
</template>

<script>
import ReservationTable from "../components/ui/ReservationTable.vue";
import TheSearch from "../components/input/ChekBoxRev.vue";
import TheFooterMenuRes from "../components/nav/TheFooterMenuRes.vue";

export default {
  components: {
    ReservationTable,
    TheSearch,
    TheFooterMenuRes,
  },
  beforeCreate() {
    this.$store.dispatch("loadRes");
  },
  data() {
    return {
      activ: null,
      data: {},
      selectedState: "",
    };
  },
  methods: {
    activate(data) {
      this.activ = data.id;
      this.data = data;
    },
    state(data) {
      this.selectedState = data;
      console.log(this.selectedState);
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    revBack() {
      this.$store.dispatch("revCancel", this.data);
      this.sleep(500).then(() => {
        this.$store.dispatch("loadRes");
        this.$router.push({ path: "/books" });
      });
    },
    revCon() {
      this.$store.dispatch("revCon", this.data);
      this.$router.push({
        name: "NewHireForm",
        params: {
          userId: this.data.Uid,
          userName: this.data.Uname,
          bookId: this.data.Bid,
          bookName: this.data.Bname,
          fromRev: true,
        },
      });
    },
  },
  computed: {
    Revs() {
      return this.$store.getters.getRevs;
    },
    permission() {
      return this.$store.getters.getLogget.permision;
    },
  },
};
</script>
<style>
.Search {
  width: 80%;
  margin: auto;
}
.Table-h {
  display: flex;
  justify-content: space-around;
  background-color: #55608f;
}
.Table-h h3 {
  text-align: left;
  height: 100%;
  color: #fff;
  width: 100%;
  padding: 0 20px;
}
.add {
  font-size: 3rem;
  font-weight: bolder;
  position: fixed;
  bottom: 5%;
  right: 1%;
  border-radius: 50px;
  background: red;
  padding: 5px 20px;
  box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, 0.363);
}
.active {
  background-color: rgba(128, 128, 128, 0.267);
}
.conteiner {
  background: linear-gradient(45deg, #413b5c, #161420);
  min-height: 90vh;
  padding-top: 1rem;
}
@media (max-width: 768px) {
  .Table-h {
    display: none;
  }
}
</style>
