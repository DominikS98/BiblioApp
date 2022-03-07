<template>
  <div
    class="card"
    v-if="
      (quantity > 0 || this.allBookChekBox) &&
      (this.selecTtag == this.tags || this.selecTtag == '')
    "
  >
    <div class="card_top">
      <img :src="img" />
      <span class="tag" :class="this.tags">{{ tags }}</span>
    </div>
    <div class="card_body">
      <h3 id="title">{{ name }}</h3>
      <p id="author">autor: {{ author }}</p>
      <p id="year">rok wydania: {{ year }}</p>
      <p id="ilosc" v-if="quantity > 0">dostępna ilosc: {{ quantity }}</p>
      <p v-else>niedostępna</p>
    </div>
    <div class="card_footer">
      <div v-if="permission === 'Admin'" class="butons">
        <button @click="openEdit(this.id)">edytuj</button>
        <button @click="deleteBook(this.id)">usuń</button>
      </div>
      <div v-if="permission == 'user' && quantity > 0" class="butons">
        <button @click="rez(this.id, this.name)">Rezerwuj</button>
      </div>
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
    "img",
    "tags",
    "year",
    "quantity",
    "allBookChekBox",
    "selecTtag",
  ],
  data() {
    return {
      con: false,
      person: "",
    };
  },
  methods: {
    deleteBook(id) {
      this.$emit("open-con", id);
      setTimeout(() => {
        if (this.Conf == true) {
          this.$store.dispatch("deleteBook", this.id);
        }
      }, 2000);
    },
    openEdit(id) {
      this.$emit("open-edit", id);
    },
    rez(id, Bname) {
      if (this.$store.getters.getLogget.que > 0) {
        const data = {
          Bid: id,
          Bname: Bname,
          Pid: this.$store.getters.getLogget.id,
        };
        this.$store.dispatch("NewRevU", data);
        this.$emit("new-rez");
        this.$router.push({ path: "/reservation" });
      } else {
        this.$emit("open-err");
      }
    },
  },
  computed: {
    Conf() {
      return this.$store.getters.getConfirm;
    },
    permission() {
      return this.$store.getters.getLogget.permision;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.192);
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
  backdrop-filter: blur(10px);
}
.card_top img {
  width: 100%;
  height: 250px;
}
.card_body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 150px;
}

.tag {
  background: #e93abd;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.card_body p {
  color: rgb(255, 255, 255);
  font-size: 15px;
  margin: 0 0 10px;
  text-shadow: 4px 4px 5px rgba(66, 68, 90, 1);
}
h3 {
  color: #dad8e7bb;
  font-size: 24px;
}
.przygodowa {
  background: #3af152;
}
.horror {
  background: #f10c0c;
}
.klasyka {
  background: #7424dd;
}
.kryminał {
  background: #282638bb;
}
.butons {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
button {
  background: none;
  outline: none;
  border: none;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  transition: 0.5s;
  background: #1614201c;
}
button:hover,
button:active,
button:focus {
  transform: scale(1.1);
  background: #16142094;
}
</style>
