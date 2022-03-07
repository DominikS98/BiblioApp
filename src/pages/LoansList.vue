<template>
  <div class="conteiner">
    <div class="Search">
      <the-search-hire @isset-state="state"></the-search-hire>
    </div>
    <div class="Table-h">
      <h3>Osoba</h3>
      <h3>Książka</h3>
      <h3>data od</h3>
      <h3>data do</h3>
      <h3>Stan</h3>
    </div>

    <table-card
      v-for="hire in hires"
      :key="hire.id"
      :id="hire.id"
      :bookName="hire.bookName"
      :bookId="hire.bookId"
      :userName="hire.userName"
      :dataFrom="hire.dataFrom"
      :dataTo="hire.dataTo"
      :state="hire.state"
      :userId="hire.userId"
      @activ-div="activate"
      :class="{ active: hire.id == activ }"
      :selectedState="this.selectedState"
    ></table-card>

    <div v-if="permission == 'Admin' || permission == 'Editor'">
      <the-footer-menu-hire
        :activ="activ"
        @back-book="backBook"
      ></the-footer-menu-hire>
    </div>
  </div>
</template>

<script>
import TableCard from "../components/ui/TableCard.vue";
import TheFooterMenuHire from "../components/nav/TheFooterMenuHire.vue";
import TheSearchHire from "../components/input/ChekBoxHire.vue";

export default {
  components: {
    TableCard,
    TheFooterMenuHire,
    TheSearchHire,
  },
  data() {
    return {
      activ: null,
      data: {},
      selectedState: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadHire");
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    activate(data) {
      this.activ = data.id;
      this.data = data;
    },
    backBook() {
      this.$store.dispatch("backBook", this.data);
      this.sleep(500).then(() => {
        this.$store.dispatch("loadHire");
        this.$router.push({ path: "/books" });
      });
    },
    state(data) {
      this.selectedState = data;
      console.log(this.selectedState);
    },
  },
  computed: {
    hires() {
      return this.$store.getters.gethires;
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
