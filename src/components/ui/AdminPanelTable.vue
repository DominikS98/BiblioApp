<template>
  <div class="container">
    <div class="data" @click="activate(this.id)">
      <section>
        <label for="Email">Email:</label>
        <p id="Email">{{ Email }}</p>
      </section>
      <section>
        <label for="Position">Uprawnienia:</label>
        <p id="Position">{{ Position }}</p>
      </section>
      <section>
        <label for="name">Imie nazwisko</label>
        <p id="name">{{ name }}</p>
      </section>
      <section>
        <label for="Phone">Telefon:</label>
        <p id="Phone">{{ Phone }}</p>
      </section>
      <section>
        <label for="queBooks">ilość wyporzyczeń:</label>
        <p id="queBooks">{{ queBooks }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "Position", "Email", "name", "Phone", "queBooks"],
  methods: {
    activate(id) {
      this.$emit("activ-div", id);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(auto-fill, 1fr);
}
.data {
  border: 1px solid rgba(0, 0, 0, 0.137);
  border-bottom: none;
  display: flex;
  justify-content: space-between;
}
.data:hover,
.data:active {
  background-color: rgba(255, 255, 255, 0.418);
}
.data p {
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.082);
  color: #fff;
}
label {
  display: none;
}
section {
  display: block;
  width: 100%;
}
@media (max-width: 768px) {
  label {
    display: block;
    color: white;
    font-size: 6vw;
    width: 50%;
    padding: 15px 20px;
  }
  .data {
    flex-flow: column;
    color: rgba(255, 255, 255, 0.116);
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.089);
    margin: 10px 0;
  }
  .data p {
    width: 45%;
    background-color: inherit;
    font-size: 6vw;
  }
  section {
    display: flex;
    width: 100%;
    justify-content: center;
    border-bottom: 0.2px solid rgba(255, 255, 255, 0.322);
  }
}
</style>
