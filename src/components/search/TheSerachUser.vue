<template>
  <div>
    <input
      type="text"
      placeholder="wyszukaj"
      v-model="input"
      @keyup="wpisane"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      imputs: [],
    };
  },
  methods: {
    wpisane() {
      setTimeout(() => {
        if (this.input !== "") {
          this.imputs = [];
          this.imputs.push(this.input);
          this.$store.dispatch("findPerson", this.input);
        } else {
          this.$store.dispatch("loadUsers");
        }
      }, 500);
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  padding: 10px;
}
input {
  background: inherit;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(128, 89, 236, 0.473);
  font-size: 1em;
  padding: 5px 40px;
  text-align: center;
  transition: 0.4s;
  width: 100%;
  color: white;
  opacity: 0.7;
}
input:active,
input:focus,
input:hover {
  opacity: 1;
}
.ikona {
  transform: translate(-20px, 5px);
}
</style>
