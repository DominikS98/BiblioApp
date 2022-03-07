<template>
  <header class="box">
    <nav>
      <button v-if="cos.state" @click="Logout">wyloguj</button>
      <router-link v-else to="/login">
        <button>Zaloguj sie</button></router-link
      >
      <the-menu :class="{ active: isA }" class="menu"></the-menu>
      <span :class="{ active2: isA }" @click="open"></span>
    </nav>
  </header>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { reactive } from "vue";
import TheMenu from "../ui/TheMenu.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    TheMenu,
  },
  data() {
    return {
      isA: false,
    };
  },
  methods: {
    open() {
      this.isA = !this.isA;
    },
  },
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const store = useStore();
    let cos = reactive({ state: false });

    onAuthStateChanged(auth, (user) => {
      if (!user) cos.state = false;
      else cos.state = true;
    });

    const Logout = () => {
      signOut(auth)
        .then(() => {
          router.replace("/login");
           store.dispatch("loggedUser", "non");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      Logout,
      cos,
      asyncIncrement: () => store.dispatch("logout"),
    };
  },
};
</script>
<style scoped>
.box {
  background: #161420;
}
nav {
  background: rgba(255, 255, 255, 0.062);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 2rem;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  backdrop-filter: blur(10px);
  z-index: 10;
}

button {
  background: transparent;
  border: none;
  padding: 15px;
  font-size: 1rem;
  font-weight: bolder;
  transition: 0.3s;
  text-transform: uppercase;
  color: #edf0f1;
  letter-spacing: 0.7px;
}
button:active,
button:hover {
  box-shadow: 0px 2px 6px 1px rgba(255, 255, 255, 0.3);
  transform: scale(1.3);
  color: #0088a9;
}
.menu {
  display: flex;
}
span {
  display: none;
}
@media (max-width: 768px) {
  .menu {
    position: absolute;
    top: calc(100% + 5px);
    right: 0px;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(45deg, #413b5c8c, #161420);
    backdrop-filter: blur(10px);
    z-index: 10;
    padding: 5px 0;
    display: none;
  }
  span {
    width: 40px;
    height: 25px;
    border-radius: 3px;
    cursor: pointer;
    display: block;
  }
  span::after,
  span::before {
    content: "";
    display: inline-block;
    height: 2px;
    width: 70%;
    position: absolute;
    left: 15%;
    top: 50%;
    background: #fff;
    transition: transform 0.2s ease, top 0.2s ease;
    transform-origin: center center;
    transform: rotate(0deg) translateY(-50%);
  }
  span::after {
    top: 30%;
  }
  span::before {
    top: 70%;
  }
  .active2::after,
  .active2::after {
    top: 50%;
    transform: rotate(30deg) translateY(-50%);
  }

  .active2::before,
  .active2::before {
    top: 50%;
    transform: rotate(-30deg) translateY(-50%);
  }
  .active {
    display: inline-block;
  }
}
</style>
