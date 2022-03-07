<template>
  <div class="conteiner">
    <div class="background">
      <div class="kolo"></div>
      <div class="kolo"></div>
    </div>
    <form @submit.prevent>
      <h2>Nowa rezerwacja</h2>
      <div class="form__Date">
        <section>
          <label class="date_label" for="nazwa">klient:</label>
          <span type="text" id="nazwa">{{ cos2.name }}</span
          ><button class="addButton">
            <router-link :to="{ name: 'users', params: { msg } }"
              >wybierz</router-link
            >
          </button>
        </section>

        <section>
          <label class="date_label" for="autor">Tytuł:</label>
          <span type="text" id="nazwa">{{ cos.name }}</span
          ><button class="addButton">
            <router-link :to="{ name: 'books', params: { msg } }"
              >wybierz</router-link
            >
          </button>
        </section>
      </div>
      <div class="form__Data">
        <h2>okres Rezerwacji</h2>
        <label class="date_label">Data Do: </label>
        <input type="date" name="toData" class="data" v-model="rev.dataTo" />
      </div>
      <button class="wypo" @click="Rev">Rezerwuj</button>
    </form>

    <div @click="err = null" class="alter" v-if="err">
      <h2>Błąd</h2>
      <p>{{ err }}</p>
      <section class="but">
        <button class="exit" @click="exitButon">potwierdz</button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookO: {},
      userO: {},
      rev: {
        book: "",
        bookId: "",
        person: "",
        personId: "",
        dataTo: null,
      },
      err: null,
      msg: true,
    };
  },
  created() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.rev.dataTo = date.toISOString().substr(0, 10);
  },
  methods: {
    Rev() {
      this.bookO = this.$store.getters.getSBook;
      this.userO = this.$store.getters.getSUsers;

      this.rev.book = this.bookO.name;
      this.rev.bookId = this.bookO.id;

      this.rev.person = this.userO.name;
      this.rev.personId = this.userO.id;

      if (this.rev.book != "" && this.rev.person != null) {
        if (this.rev.dataTo != null) {
          this.$store.dispatch("NewRev", this.rev);
          this.$router.push({ path: "/reservation" });
        } else {
          this.err = "Prosze podać date ";
        }
      } else {
        this.err = "Prosze podać dane ";
      }

      this.rev.book = "";
      this.rev.bookid = "";
      this.rev.person = "";
      this.rev.personid = "";
      this.rev.dataTo = null;
    },
  },
  computed: {
    cos() {
      return this.$store.getters.getSBook;
    },
    cos2() {
      return this.$store.getters.getSUsers;
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.conteiner {
  background: linear-gradient(45deg, #413b5c, #161420);
  height: 90vh;
  overflow: hidden;
}
form {
  height: 60%;
  width: 30%;
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 50px;
  padding: 50px 50px;
  display: flex;
  flex-flow: column;
  text-align: center;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  transition: 0.5s;
}
form * {
  color: white;
  letter-spacing: 0.7px;
}
.form__Date {
  height: 50%;
  width: 100%;
  margin-top: 2rem;
}
.form__Date section {
  padding: 10px;
}
.form__Data {
  height: 30%;
  width: 100%;
}
.form__Data section {
  display: flex;
  align-content: center;
  align-items: center;
}
span {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px;
  letter-spacing: 1px;
}
.addButton {
  background: inherit;
  color: white;
  border: none;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 10px;
  padding: 10px;
}
.date_label {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
}
a {
  text-decoration: none;
}
input {
  width: 35%;
  padding: 10px 10px;
  font-size: 14px;
  font-weight: bold;
  background: rgba(71, 69, 69, 0.253);
  border: none;
  outline: none;
  cursor: pointer;
}
.wypo {
  background: inherit;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 10px;
  padding: 10px;
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
}
h2 {
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 10px 2px;
}
button:hover {
  opacity: 0.8;
  transform: scale(1.1);
  transition: 0.5s;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .kolo {
  height: 300px;
  width: 300px;
  position: absolute;
  border-radius: 50%;
}
.kolo:first-child {
  background: linear-gradient(#57f50e, #23a2f6);
  left: 300px;
  top: -70px;
}
.kolo:last-child {
  background: linear-gradient(#272af3, #9cd80f);
  left: -100px;
  bottom: -140px;
}
.alter {
  height: 30%;
  width: 20%;
  background: rgba(255, 255, 255, 0.247);
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  z-index: 30;
  color: #f7afaf;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.836);
}
p {
  text-align: left;
  width: 100%;
  height: 10%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
}
.but {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.exit {
  height: 10%;
  width: 50%;
  background: rgba(71, 69, 69, 0.253);
  color: white;
  padding: 10px;
  border: none;
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
}
.exit:hover {
  transform: scale(1.2);
}
@media (max-width: 768px) {
  form {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    top: 0%;
    left: 0%;
    transform: none;
  }
  .box {
    height: 90vh;
  }
  input {
    width: 100%;
  }
  .alter {
    height: 40%;
    width: 100%;
    position: absolute;
    transform: none;
    left: 00%;
    top: 10%;
    padding: 15px;
    z-index: 30;
  }
  .wypo {
    margin-top: 30px;
  }
}
</style>
