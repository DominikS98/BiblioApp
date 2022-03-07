<template>
  <div>
    <div
      class="data"
      @click="activate(this.id, this.userName, this.bookName, this.dataTo)"
    >
      <section>
        <label for="name">tytuł:</label>
        <p id="name">{{ bookName }}</p>
      </section>
      <section>
        <label for="author">użytkownik:</label>
        <p id="author">{{ userName }}</p>
      </section>
      <section>
        <label for="tags">Data:</label>
        <p id="tags">{{ dataTo }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "bookName", "userName", "dataTo"],

  methods: {
    activate(id) {
      const data = {
        id: id,
        bookName: this.userName,
        userName: this.bookName,
        dataTo: this.dataTo,
      };
      this.$emit("activ-div", data);
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
