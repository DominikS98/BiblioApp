<template>
  <div class="box">
    <section>
      <h2>top 5 wypożyczonych</h2>
      <top-table
        v-for="data in query"
        :key="data.id"
        :bookName="data.bookName"
        :Quan="data.Quan"
      ></top-table>
    </section>
    <section>
      <h2>top 5 czytelnicy</h2>
      <top-table
        v-for="data in query2"
        :key="data.id"
        :bookName="data.bookName"
        :Quan="data.Quan"
      ></top-table>
    </section>
  </div>
</template>

<script>
import topTable from "../components/ui/topTable.vue";
export default {
  components: {
    topTable,
  },
  beforeCreate() {
    this.$store.dispatch("RQuery");
  },
  computed: {
    query() {
      console.log(this.$store.getters.getQuery);
      return this.$store.getters.getQuery;
    },
    query2() {
      console.log(this.$store.getters.getQuery2);
      return this.$store.getters.getQuery2;
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #e5e5e5;
}
.box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  background: linear-gradient(45deg, #413b5c, #161420);
  height: 90vh;
  color: white;
}
.section {
  width: 100%;
}
</style>
