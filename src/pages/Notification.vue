<template>
  <div class="conteiner">
    <div class="Table-h">
      <h3>tytuł</h3>
      <h3>użytkownik</h3>
      <h3>Data</h3>
    </div>
    <noti-tab
      v-for="noti in notis"
      :key="noti.id"
      :id="noti.idDoc"
      :bookName="noti.bookName"
      :userName="noti.userName"
      :dataTo="noti.dataTo"
      @activ-div="activate"
      :class="{ active: noti.idDoc == activ }"
    ></noti-tab>
  </div>
  <footer-noti @del-noti="del"></footer-noti>
</template>

<script>
import NotiTab from "../components/ui/NotiTab.vue";
import FooterNoti from "../components/nav/TheFooterNoti.vue";

export default {
  components: {
    NotiTab,
    FooterNoti,
  },
  data() {
    return {
      activ: null,
      activD: {
        bookName: "",
        userName: "",
        dataTo: "",
      },
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadNoti");
  },
  computed: {
    notis() {
      return this.$store.getters.getNotification;
    },
  },
  methods: {
    activate(data) {
     // console.log(data);
      this.activ = data.id;
      this.activD = data;
    },
    del() {
      this.$store.dispatch("delNoti", this.activ);
      this.$store.dispatch("loadNoti");
      this.$store.dispatch("NotiQue");
    },
  },
};
</script>

<style scoped>
.Search {
  width: 80%;
  margin: auto;
}
.Table-h {
  display: flex;
  justify-content: space-around;
  background-color: #55608f;
}
.Table-h h3 {
  text-align: left;
  height: 100%;
  color: #fff;
  width: 100%;
  padding: 0 20px;
}
.add {
  font-size: 3rem;
  font-weight: bolder;
  position: fixed;
  bottom: 5%;
  right: 1%;
  border-radius: 50px;
  background: red;
  padding: 5px 20px;
  box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, 0.363);
}
.active {
  background-color: rgba(128, 128, 128, 0.267);
}
.conteiner {
  background: linear-gradient(45deg, #413b5c, #161420);
  min-height: 90vh;
  padding-top: 1rem;
}
@media (max-width: 768px) {
  .Table-h {
    display: none;
  }
}
</style>
