<template>
  <div
    class="container"
    v-if="
      (quantity > 0 || this.allBookChekBox) &&
      (this.selecTtag == this.tags || this.selecTtag == '')
    "
  >
    <div class="data" @click="activate(this.id, this.name, this.quantity)">
      <section>
        <label for="name">tytuł:</label>
        <p id="name">{{ name }}</p>
      </section>
      <section>
        <label for="author">autor:</label>
        <p id="author">{{ author }}</p>
      </section>
      <section>
        <label for="tags">tag:</label>
        <p id="tags">{{ tags }}</p>
      </section>
      <section>
        <label for="year">rok:</label>
        <p id="year">{{ year }}</p>
      </section>
      <section>
        <label for="quantity">ilość:</label>
        <p id="quantity">{{ quantity }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "name",
    "author",
    "hire",
    "tags",
    "year",
    "state",
    "quantity",
    "allBookChekBox",
    "selecTtag",
  ],
  components: {},
  data() {
    return {
      active: null,
      data: {
        name: "",
        id: "",
        que: "",
      },
    };
  },
  methods: {
    activate(id, name, quantity) {
      this.data.name = name;
      this.data.id = id;
      this.data.que = quantity;

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
