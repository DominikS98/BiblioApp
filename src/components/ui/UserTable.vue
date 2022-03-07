<template>
  <div class="container">
    <div class="data" @click="activate(this.id, this.name, this.queBooks)">
      <section>
        <label for="name">imie nazwisko:</label>
        <p id="name">{{ name }}</p>
      </section>
      <section>
        <label for="phone">Telefon:</label>
        <p id="phone">{{ phone }}</p>
      </section>
      <section>
        <label for="address">Adres:</label>
        <p id="address">{{ address }}</p>
      </section>
      <section>
        <label for="city">Miasto:</label>
        <p id="city">{{ city }}</p>
      </section>
      <section>
        <label for="pesel">pesel:</label>
        <p id="pesel">{{ pesel }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "name", "phone", "address", "city", "pesel", "queBooks"],
  data() {
    return {
      data: {
        name: "",
        id: "",
        que: 0,
      },
    };
  },
  methods: {
    activate(id, name, queBooks) {
      this.data.name = name;
      this.data.id = id;
      this.data.que = queBooks;
      this.$emit("activ-div", this.data);
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
  padding: 0;
  margin: 0;
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
    padding: 15px 15px;
  }
  .data {
    flex-flow: column;
    color: rgba(255, 255, 255, 0.116);
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.089);
    margin: 10px 0;
  }
  .data p {
    width: 50%;
    background-color: inherit;
    font-size: 6vw;
    padding: 15px 15px;
  }
  section {
    display: flex;
    justify-content: center;
    border-bottom: 0.2px solid rgba(255, 255, 255, 0.322);
  }
}
</style>
