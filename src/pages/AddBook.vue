<template>
  <div class="box">
    <div class="background">
      <div class="kolo"></div>
      <div class="kolo"></div>
    </div>
    <form @submit.prevent="submitForm">
      <h2>Dodaj książke</h2>
      <section>
        <label for="nazwa">Tytuł:</label>
        <input type="text" id="nazwa" v-model="inputName" />
      </section>
      <section>
        <label for="autor">autor:</label>
        <input type="text" id="autor" v-model="inputAuthor" />
      </section>
      <section>
        <label for="rok">rok wydania:</label>
        <input type="number" id="rok" v-model="inputYear" />
      </section>
      <section>
        <label for="img">Zdjęcie:</label>
        <input type="url" id="img" v-model="inputUrl" />
      </section>
      <section>
        <label for="tag">kategoria:</label>
        <select class="" name="tag" id="tag" v-model="inputTags">
          <option value="przygodowa">przygodowa</option>
          <option value="horror">horror</option>
          <option value="klasyka">klasyka</option>
          <option value="kryminał">kryminał</option>
          <option value="literatura piękna">literatura piękna</option>
        </select>
      </section>
      <section>
        <label for="ilosc">ilosc</label>
        <input type="number" id="ilosc" v-model="quantity" />
      </section>
      <button class="wypo">dodaj</button>
    </form>

    <div v-if="val" class="vall-box">
      <ul>
        <li v-for="valid in erro" :key="valid.txt">{{ valid.txt }}</li>
      </ul>
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
      inputName: "",
      inputAuthor: "",
      inputYear: "",
      inputUrl: "",
      inputTags: "",
      erro: [],
      val: false,
      quantity: 1,
    };
  },
  methods: {
    submitForm() {
      this.validation();
      if (this.val == false) {
        const data = {
          Name: this.inputName,
          author: this.inputAuthor,
          hire: false,
          img: this.inputUrl,
          tags: this.inputTags,
          year: this.inputYear,
          quantity: this.quantity,
        };
        this.$store.dispatch("addBook", data);
        this.inputName = "";
        this.inputAuthor = "";
        this.inputYear = "";
        this.inputUrl = "";
        this.inputTags = "";
        this.quantity = 1;
      } else {
        this.val = true;
      }
    },
    exitButon() {
      this.val = false;
    },
    validation() {
      this.erro = [];
      if (!this.inputName) {
        this.val = true;
        this.erro.push({
          id: 1,
          txt: "proszę podać Nazwe",
        });
        console.log(this.erro.id);
      }
      if (!this.inputAuthor) {
        this.val = true;
        this.erro.push({
          id: 2,
          txt: "proszę podać Autora",
        });
      }
      if (!this.inputYear) {
        this.val = true;
        this.erro.push({
          id: 3,
          txt: "proszę podać Rok ",
        });
      }
      if (!this.inputUrl) {
        this.inputUrl = "https://legionowo.pl/img/artykuly/1/2016_09/13374.jpg";
      }
      if (!this.inputTags) {
        this.val = true;
        this.erro.push({
          id: 4,
          txt: "proszę wybrać Kategorię z  Listy",
        });
      }
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
.box {
  background: linear-gradient(45deg, #413b5c, #161420);
  height: 90vh;
  overflow: hidden;
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
form {
  height: auto;
  width: 700px;
  background: rgba(255, 255, 255, 0.062);
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -10%);
  left: 50%;
  top: 11%;
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
h2 {
  font-size: 36px;
  font-weight: bold;
  text-transform: uppercase;
}
label {
  display: block;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
  width: 30%;
  text-align: left;
}
input {
  display: block;
  width: 100%;
  padding: 20px 10px;
  font-size: 18px;
  font-weight: bold;
  background: rgba(71, 69, 69, 0.253);
  border: none;
  outline: none;
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.go {
  width: 45%;
  height: 50px;
  background: rgba(54, 53, 53, 0.658);
  margin: 60px 0;
  cursor: pointer;
}
.go:hover,
.go:focus,
.go:active {
  background: rgba(116, 114, 114, 0.658);
}
button {
  background: transparent;
  color: white;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
}
a {
  top: 25%;
  padding: 15px 40px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}
::placeholder {
  color: #e5e5e5;
}
.vall-box {
  height: 40%;
  width: 30%;
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
li {
  text-align: left;
  width: 100%;
  height: 10%;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  list-style: none;
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
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
}
.exit:hover {
  transform: scale(1.2);
}
.sec {
  height: 50%;
}
.errTxt {
  color: #e5e5e5;
  background: inherit;
  font-size: 20px;
}
select {
  width: 100%;
  background: rgba(71, 69, 69, 0.253);
  border: none;
  outline: none;
  font-size: 18px;
  padding: 20px 10px;
  transition: 0.4s;
  color: white;
  opacity: 0.8;
}
select:hover,
select:active,
select:focus {
  opacity: 1;
}
option {
  color: #161420;
}
.wypo {
  background: inherit;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  margin: 15px auto;
  padding: 10px;
  width: 80%;
}
.wypo:hover {
  opacity: 0.8;
}
@media (max-width: 768px) {
  .box {
    min-height: 100vh;
  }
  form {
    width: 100%;
    height: 100vh;
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
  .vall-box {
    height: 40%;
    width: 100%;
    position: absolute;
    transform: none;
    left: 00%;
    top: 10%;
    padding: 15px;
    z-index: 30;
  }
}
</style>
