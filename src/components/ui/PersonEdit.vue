<template>
  <form @submit.prevent="submitForm">
    <h2>Osobe</h2>
    <section>
      <label for="name">Imie i nazwisko:</label>
      <input type="text" id="name" v-model="name" />
    </section>
    <section>
      <label for="Pesel">Pesel:</label>
      <input type="number" id="Pesel" v-model="pesel" maxlength="11" />
    </section>
    <section>
      <label for="Adres">Adres:</label>
      <input type="text" v-model="address" id="Adres" />
    </section>
    <section>
      <label for="Miasto">Miasto:</label>
      <input type="text" v-model="city" id="Miasto" />
    </section>
    <section>
      <label for="Telefon">Telefon:</label>
      <input type="number" v-model="phone" id="Telefon" maxlength="9" />
    </section>

    <section class="but">
      <button class="wypo">Edytuj</button>
      <button class="wypo" @click="cancel">anuluj</button>
    </section>
  </form>

  <div v-if="val" class="vall-box">
    <ul>
      <li v-for="valid in erro" :key="valid.txt">{{ valid.txt }}</li>
    </ul>
    <section class="but2">
      <button class="exit" @click="exitButon">zamknij</button>
    </section>
  </div>
</template>
<script>
export default {
  props: ["id"],
  emits: ["edit-cancel"],
  data() {
    return {
      name: null,
      pesel: null,
      city: null,
      address: null,
      phone: null,
      erro: [],
      val: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("edit-cancel");
    },
    exitButon() {
      this.val = !this.val;
    },
    submitForm() {
      console.log(this.id);
      this.validation();
      if (this.val == false) {
        const data = {
          id: this.id,
          name: this.name,
          pesel: this.pesel,
          city: this.city,
          address: this.address,
          phone: this.phone,
        };
        this.$store.dispatch("upDatePerson", data);
        this.name = "";
        this.pesel = "";
        this.city = "";
        this.address = "";
        this.phone = "";
      } else {
        this.val = true;
      }
    },
    validation() {
      this.erro = [];
      if (!this.name) {
        this.val = true;
        this.erro.push({
          id: 1,
          txt: "proszę podać Nazwe",
        });
      }
      if (!this.pesel) {
        this.val = true;
        this.erro.push({
          id: 2,
          txt: "proszę podać pesel",
        });
      }
      if (!this.city) {
        this.val = true;
        this.erro.push({
          id: 3,
          txt: "proszę podać Miasto ",
        });
      }
      if (!this.address) {
        this.val = true;
        this.erro.push({
          id: 4,
          txt: "proszę podać  link do Adres",
        });
      }
      if (!this.phone) {
        this.val = true;
        this.erro.push({
          id: 5,
          txt: "proszę podać  nr Telefonu",
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
form {
  height: 700px;
  width: 700px;
  background: rgba(255, 255, 255, 0.315);
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
  z-index: 10;
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
  padding: 10px 10px;
  font-size: 18px;
  font-weight: bold;
  background: rgba(71, 69, 69, 0.253);
  border: none;
  outline: none;
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
}

::placeholder {
  color: #e5e5e5;
}
.vall-box {
  max-height: 350px;
  max-width: 500px;
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
  align-items: center;
  margin-top: 2rem;
  border-top: 1px solid black;
}
.but2 {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}
.exit {
  height: 5%;
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
  padding: 10px 10px;
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
  padding: 30px;
  width: 80%;
  height: 100%;
  transition: 0.5s;
}
.wypo:first-child {
  border-right: 1px solid black;
}
.wypo:hover {
  opacity: 0.8;
  background: rgba(71, 69, 69, 0.253);
}
@media (max-width: 768px) {
  form {
    top: 10%;
    height: 650px;
    width: 100%;
    z-index: 5;
  }
  input {
    width: 100%;
  }
  .vall-box {
    height: 400px;
    width: 100%;
    top: 20%;
  }
}
</style>
