<template>
  <div>
    <form @submit.prevent="submitForm">
      <h2>Zmień uprawnienia</h2>
      <section>
        <label for="perrmision">Wybierz uprawnienia</label>
        <select v-model="perValue" name="perrmision" id="perrmision">
          <option value="">--Prosze wybrać uprawnnienie --</option>
          <option value="user">uzytkownik</option>
          <option value="Admin">Administrator</option>
          <option value="Editor">Edytor</option>
        </select>
      </section>
      <section>
        <input value="zmień" type="submit" />
        <button @click="closeDialog()">zamknij</button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perValue: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog-edit");
    },
    submitForm() {
      if (this.perValue != "") {
        this.$emit("edit-user-submit", this.perValue);
      }

      this.$emit("close-dialog-edit");
    },
  },
};
</script>
<style scoped>
div {
  width: 400px;
  background: rgba(255, 255, 255, 0.397);
  backdrop-filter: blur(20px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 30%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 50px;
  padding: 50px 50px;
  display: flex;
  flex-flow: column;
  text-align: center;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  transition: 0.5s;
  z-index: 30;
  color: white;
}
h2 {
  margin-bottom: 10px;
  font-size: 30px;
}
input,
button {
  padding: 16px;
  background: inherit;
  border: none;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  color: white;
  transition: 1s;
}
button:hover,
input:hover {
  opacity: 0.5;
  transform: scale(1.2);
  border: 1px solid rgba(255, 255, 255, 0.397);
}
label {
  padding: 10px;
  font-size: 20px;
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
  margin: 10px;
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
</style>
