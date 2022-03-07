<template>
  <div class="conteiner">
    <div class="background">
      <div class="kolo"></div>
      <div class="kolo"></div>
    </div>
    <form @submit.prevent>
      <h2>Nowe Wypożyczenie</h2>
      <div class="form__Date">
        <section v-if="!this.fromRev">
          <label class="date_label" for="klient">klient:</label>
          <span type="text" id="klient">{{ User.name }}</span
          ><button class="addButton">
            <router-link :to="{ name: 'users1', params: { msg } }"
              >wybierz</router-link
            >
          </button>
        </section>

        <section v-else>
          <label class="date_label" for="klient">klient:</label>
          <span type="text" id="klient">{{ userName }}</span>
        </section>

        <section v-if="!this.fromRev">
          <label class="date_label" for="autor">Tytuł:</label>
          <span type="text" id="nazwa">{{ book.name }}</span
          ><button class="addButton">
            <router-link :to="{ name: 'books1', params: { msg } }"
              >wybierz</router-link
            >
          </button>
        </section>

        <section v-else>
          <label class="date_label" for="autor">Tytuł:</label>
          <span type="text" id="nazwa">{{ bookName }}</span>
        </section>
      </div>

      <div class="form__Data">
        <h2>okres wpożyczenia</h2>
        <label> data od: </label>
        <input
          type="date"
          name="fromData"
          class="data"
          v-model="hire.dataFrom"
        />
        <label> do: </label>
        <input type="date" name="toData" class="data" v-model="hire.dataTo" />
      </div>
      <button class="wypo" @click="Hire">wypożycz</button>
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
  props: ["userId", "userName", "bookId", "bookName", "fromRev"],
  data() {
    return {
      bookO: {},
      userO: {},
      hire: {
        book: "",
        bookId: "",
        person: "",
        personId: "",
        dataFrom: new Date().toISOString().substr(0, 10),
        dataTo: null,
        fromRev: false,
      },
      err: null,
      msg: false,
    };
  },
  created() {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    this.hire.dataTo = date.toISOString().substr(0, 10);
  },
  methods: {
    Hire() {
      if (this.userName) {
        this.hire.book = this.bookName;
        this.hire.bookId = this.bookId;
        this.hire.person = this.userName;
        this.hire.personId = this.userId;
        this.hire.fromRev = true;
      } else {
        this.bookO = this.$store.getters.getSBook;
        this.userO = this.$store.getters.getSUsers;
        this.hire.book = this.bookO.name;
        this.hire.bookId = this.bookO.id;
        this.hire.person = this.userO.name;
        this.hire.personId = this.userO.id;
      }

      if (this.hire.book != "" && this.hire.person != null) {
        if (this.hire.dataFrom != null && this.hire.dataTo != null) {
          if (new Date(this.hire.dataFrom) < new Date(this.hire.dataTo)) {
            this.$store.dispatch("NewHire", this.hire);
            this.$router.push({ path: "/loans" });
          } else {
            this.err = "data do nie może być wieksza niż data od ";
          }
        } else {
          this.err = "Prosze podać date ";
        }
      } else {
        this.err = "Prosze podać dane ";
      }

      this.hire.book = "";
      this.hire.bookid = "";
      this.hire.person = "";
      this.hire.personid = "";
      this.hire.dataFrom = null;
      this.hire.dataTo = null;
    },
  },
  computed: {
    book() {
      return this.$store.getters.getSBook;
    },
    User() {
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
  background: rgba(255, 255, 255, 0.062);
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
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1px;
}
a {
  text-decoration: none;
}
input {
  width: 35%;
  padding: 10px 10px;
  font-size: 10px;
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
    margin-top: 60px;
  }
}
</style>
