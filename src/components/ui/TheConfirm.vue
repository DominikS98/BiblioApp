<template>
  <div>
    <header>
      <h2>Czy jesteś pwenie że chcesz to zrobić?</h2>
    </header>
    <section>
      <button @click="closeCon(true)">Tak</button>
      <button @click="closeCon(false)">Nie</button>
    </section>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    closeCon(data) {
     // console.log(this.id, data);
      if (data == true) {
        this.$store.dispatch("confirmTrue");

        this.$emit("open-con2");
      } else {
        this.$store.dispatch("confirmFalse");
        this.$emit("open-con2");
      }
    },
  },
};
</script>
<style scoped>
div {
  height: 20%;
  width: 20%;
  background: rgba(255, 255, 255, 0.562);
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 50px;
  display: flex;
  flex-flow: column;
  text-align: center;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  transition: 0.5s;
  z-index: 100;
  position: fixed;
}
header {
  margin-block: 2rem;
  height: 60%;
}
h2 {
  color: rgb(255, 255, 255);
}
section {
  display: flex;
  border-top: 1px solid black;
  width: 100%;
  height: 40%;
}
section button:first-child {
  border-right: 1px solid black;
}
button {
  background: transparent;
  color: white;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  transition: 0.5s;
}
button:hover {
  opacity: 0.8;
  background: rgba(71, 69, 69, 0.253);
}
@media (max-width: 768px) {
  div {
    top: 50%;
    height: 300px;
    width: 100%;
    z-index: 5;
    position: fixed;
  }
}
</style>
