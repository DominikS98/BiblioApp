<template>
  <div class="box">
    <div class="background">
      <div class="kolo"></div>
      <div class="kolo"></div>
    </div>

    <form @submit.prevent="Register">
      <h2>Rejestracja</h2>
      <section>
        <label for="email">email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="email"
          placeholder="email"
          v-model="email"
          required
        />
      </section>
      <section>
        <label for="password">haslo</label>
        <input
          type="password"
          class="form-control"
          name="password"
          id="password"
          placeholder="haslo"
          v-model="password"
          required
        />
      </section>
      <section>
        <label for="Phone">telefon</label>
        <input
          type="tel"
          class="form-control"
          name="Phone"
          id="Phone"
          placeholder="telefon"
          v-model="Phone"
          required
        />
      </section>
      <section>
        <label for="pesel">pesel</label>
        <input
          type="number"
          class="form-control"
          name="pesel"
          id="pesel"
          placeholder="pesel"
          v-model="pesel"
          required
        />
      </section>
      <section>
        <label for="name">imie i nazwisko</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          placeholder="imie i nazwisko"
          v-model="name"
          required
        />
      </section>
      <section>
        <label for="address">Adres</label>
        <input
          type="text"
          class="form-control"
          name="address"
          id="address"
          placeholder="Adres"
          v-model="address"
          required
        />
      </section>
      <section>
        <label for="city">Miasto</label>
        <input
          type="text"
          class="form-control"
          name="city"
          id="city"
          placeholder="Miasto"
          v-model="city"
          required
        />
      </section>
      <section class="buttons">
        <div class="go">
          <button type="submit">Rejestracja</button>
        </div>
        <div class="go">
          <router-link to="/login">logowanie</router-link>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const Phone = ref("");
    const address = ref("");
    const city = ref("");
    const name = ref("");
    const pesel = ref("");
    const store = useStore();
    const Register = () => {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const userID = user.uid;
          const data = {
            Id: userID,
            Email: email.value,
            Phone: Phone.value,
            address: address.value,
            city: city.value,
            name: name.value,
            pesel: pesel.value,
          };
          console.log(data);
          store.dispatch("AddUser", data);
          store.dispatch("loggedUser", userID);
          router.replace("/");
        })
        .catch((error) => {
          alert(error.code);
          alert(error.errorMessage);
        });
    };
    return {
      Register,
      email,
      password,
      Phone,
      address,
      city,
      name,
      pesel,
    };
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
  height: 150vh;
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
  left: 400px;
  top: -400px;
}
.kolo:last-child {
  background: linear-gradient(#272af3, #9cd80f);
  left: -200px;
  bottom: -440px;
}
form {
  height: 70%;
  min-width: 40%;
  background: rgba(255, 255, 255, 0.062);
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 40%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 20px;
  padding: 50px 50px;
  display: flex;
  flex-flow: column;
  text-align: center;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
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
  margin-top: 30px;
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
  box-shadow: 1px 2px 3px 2px rgba(0, 0, 0, 0.219);
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
  top: 26%;
  padding: 10% 10%;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
}

@media (max-width: 768px) {
  .box {
    min-height: 100vh;
  }
  form {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    top: 0%;
    left: 0%;
    transform: none;
  }
  .box {
    height: 110vh;
  }
  input {
    width: 100%;
  }
}
</style>
