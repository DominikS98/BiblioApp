M
<template>
  <div>
    <nav>
      <section>
        <button>
          <router-link :to="{ name: 'users1' }">osoby</router-link>
        </button>
        <button>
          <router-link :to="{ name: 'books1' }">książki</router-link>
        </button>
      </section>
      <section v-if="activ">
        <button @click="backBook()">zwróć</button>
      </section>
      <section>
        <button>
          <router-link to="/newHire">Nowe Wpożyczenie</router-link>
        </button>
      </section>
    </nav>
  </div>
</template>
<script>
export default {
  props: ["activ"],

  methods: {
    backBook() {
      this.$emit("back-book");
    },
  },
};
</script>
<style scoped>
div {
  position: relative;
  bottom: 0%;
}
nav {
  position: fixed;
  bottom: 0%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 2rem;
  background: #24252a;
}
button {
  background: transparent;
  border: none;
  padding: 10px;
  font-size: 1rem;
  font-weight: bolder;
  transition: 0.3s;
  text-transform: uppercase;
  color: #edf0f1;
}
button:active,
button:hover {
  box-shadow: 0px 2px 6px 1px rgba(255, 255, 255, 0.3);
  color: #0088a9;
}
button a {
  background: transparent;
  border: none;
  padding: 10px;
  font-size: 1rem;
  transition: 0.3s;
  text-transform: uppercase;
  color: #edf0f1;
}
a {
  text-decoration: none;
  color: #edf0f1;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  padding: 10px;
  font-size: 10px;
  cursor: pointer;
}
@media (max-width: 768px) {
  button a {
    background: transparent;
    border: none;
    padding: 00px;
    font-size: 10px;
    transition: 0.3s;
    text-transform: uppercase;
    color: #edf0f1;
  }
  a {
    text-decoration: none;
    color: #edf0f1;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    padding: 0;
    font-size: 10px;
    cursor: pointer;
  }
  button {
    background: transparent;
    border: none;
    padding: 5px;
    font-size: 10px;
    font-weight: bolder;
    transition: 0.3s;
    text-transform: uppercase;
    color: #edf0f1;
  }
}
</style>
