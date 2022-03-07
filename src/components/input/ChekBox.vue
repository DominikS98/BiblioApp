<template>
  <div>
    <section class="all">
      <label class="container">Pokaż wszytkie </label>
      <input type="checkbox" v-model="isChek" @click="chek()" />
      <span class="checkmark"></span>
    </section>
    <section><the-search></the-search></section>
    <section>
      <label class="container" for="tag"
        >kategoria:
        <select
          v-model="tag"
          @change="$emit('isset-tag', $event.target.value)"
          class=""
          name="tag"
          id="tag"
        >
          <option value="">wysztkie</option>
          <option value="przygodowa">przygodowa</option>
          <option value="horror">horror</option>
          <option value="klasyka">klasyka</option>
          <option value="kryminał">kryminał</option>
          <option value="literatura piękna">literatura piękna</option>
        </select>
      </label>
    </section>
  </div>
</template>

<script>
import TheSearch from "../ui/TheSearch.vue";
export default {
  components: {
    TheSearch,
  },
  emits: ["is-chek", "isset-tag"],
  data() {
    return {
      isChek: false,
      tag: "",
    };
  },
  methods: {
    chek() {
      this.$emit("is-chek", !this.isChek);
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-evenly;
}
section {
  widows: 40%;
}
input {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  cursor: pointer;
}
select {
  background: inherit;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
  font-size: 0.8em;
  padding: 5px;
  transition: 0.4s;
  color: white;
  opacity: 0.8;
}
select:hover,
select:active,
select:focus {
  opacity: 1;
}
option {
  color: black;
  opacity: 0.8;
}
option:hover,
option:active,
option:focus {
  opacity: 1;
}
.container {
  display: flex;
  align-content: center;
  align-items: center;
  font-size: 22px;
  width: 10%;
  margin: 10px;
}
the-search {
  width: 100%;
}
label {
  color: white;
  width: 100px;
}
input {
  margin-left: 50px;
}
.all {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
@media (max-width: 768px) {
  diV {
    flex-flow: column;
  }
  label {
    width: 100px;
  }
}
</style>
