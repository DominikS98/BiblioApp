<template>
  <div class="box">
    <div class="background">
      <div class="kolo"></div>
      <div class="kolo"></div>
    </div>
    <form @submit.prevent="Login">
      <h2>Logowanie</h2>
      <section>
        <label for="email">email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="email"
          placeholder="email"
          v-model="email"
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
        />
      </section>
      <section class="buttons">
        <div class="go">
          <button type="submit">zaloguj</button>
        </div>
        <div class="go">
          <router-link to="/register"> Rejestracja</router-link>
        </div>
      </section>
    </form>
    <div class="err" v-if="err == 'true'">
      <section>
        <h2>Powadomienie</h2>
      </section>
      <section class="sec">
        <input class="errTxt" disabled type="text" v-model="errTxt" />
      </section>
      <section>
        <button @click="ok">potwierdz</button>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const email = ref("");
    const password = ref("");
    let errTxt = ref("");
    let err = ref("false");

    const auth = getAuth();
    const Login = () => {
      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = userCredential.user;
            const userID = user.uid;
            store.dispatch("loggedUser", userID);
            store.dispatch("noti");
            store.dispatch("NotiQue");

            router.replace("/");
          })
          .catch((error) => {
            err.value = "true";
            if (error.code == "auth/internal-error")
              errTxt.value = "brak danych";
            else {
              errTxt.value = "złe danych";
            }
          });
      });
    };

    const ok = () => {
      err.value = "false";
    };

    return {
      Login,
      email,
      password,
      err,
      errTxt,
      ok,
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
  height: 600px;
  width: 500px;
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
  width: 10%;
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
::placeholder {
  color: #e5e5e5;
}
.err {
  height: 300px;
  width: 500px;
  background: rgba(255, 255, 255, 0.247);
  backdrop-filter: blur(10px);
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 30%;
  border: 4px solid rgba(19, 15, 15, 0.205);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  box-shadow: 0 0 45px rgba(228, 228, 230, 0.384);
  z-index: 30;
  color: #e5e5e5;
}
.err section:first-child {
  text-align: left;
  width: 100%;
  height: 30%;
}
.err section:last-child {
  background: rgba(54, 53, 53, 0.658);
  width: 50%;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
}
.err section:last-child:hover,
.err section:last-child:focus,
.err section:last-child:active {
  background: rgba(116, 114, 114, 0.658);
}
.sec {
  height: 50%;
}
.errTxt {
  color: #e5e5e5;
  background: inherit;
  font-size: 20px;
}
@media (max-width: 768px) {
  form {
    width: 100%;
    height: 80%;
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
  .err {
    height: 40%;
    width: 80%;
    position: absolute;
    transform: none;
    left: 10%;
    top: 30%;
    padding: 15px;
    z-index: 30;
  }
}
</style>
