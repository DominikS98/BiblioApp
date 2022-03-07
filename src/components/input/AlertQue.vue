<template>
  <div>
    <section class="txt">
      <h2>Powiadomienie</h2>
      <p><slot></slot></p>
    </section>
    <section class="button">
      <button @click="closeDialog()">Potwierdz</button>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style scoped>
div {
  height: 300px;
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
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.212);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  text-shadow: 1px 1px 10px rgba(8, 7, 16, 0.808);
  transition: 0.5s;
  z-index: 30;
  position: fixed;
}
.txt {
  height: 80%;
}
h2 {
  margin-bottom: 10px;
  font-size: 30px;
}
p {
  font-size: 20px;
  color: black;
}
section {
  padding: 30px;
}
.button {
  display: flex;
  justify-content: flex-end;
}
button {
  padding: 16px;
  background: inherit;
  border: none;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  transition: 1s;
}
button:hover {
  opacity: 0.5;
  transform: scale(1.2);
  border: 1px solid rgba(255, 255, 255, 0.397);
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
