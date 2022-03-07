<template>
  <div class="container">
    <div class="data">
      <p>{{ bookName }}</p>
      <p>{{ Quan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bookName", "Quan"],
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
</style>
