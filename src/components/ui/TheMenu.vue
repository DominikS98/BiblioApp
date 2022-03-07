<template>
  <ul v-if="perm.state">
    <li><router-link to="/books">lista</router-link></li>
    <li><router-link to="/loans">wypożyczenia</router-link></li>
    <li><router-link to="/reservation">rezerwacja</router-link></li>
    <li v-if="per === 'Admin'">
      <router-link to="/reports">Rapoty</router-link>
    </li>
    <li v-if="per === 'Admin'">
      <router-link to="/panel">Admin Panel</router-link>
    </li>
    <li v-if="per === 'Admin'">
      <router-link to="/notification" class="notification">
        <span>Powiadomienia</span>
        <span class="badge">{{ noti.que }}</span>
      </router-link>
    </li>
  </ul>
  <ul v-else>
    <li><router-link to="/books">lista</router-link></li>
  </ul>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const auth = getAuth();
    let noti = reactive({ que: 0 });
    noti.que = computed(() => store.getters.getNotiNumber);
    let per = computed(() => store.getters.getLogget.permision);
    let perm = reactive({ state: false });
    onAuthStateChanged(auth, (user) => {
      if (!user) perm.state = false;
      else perm.state = true;
    });

    return {
      perm,
      per,
      noti,
    };
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
li {
  margin-right: 1rem;
}

a {
  text-decoration: none;
  color: #edf0f1;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.25rem;
  font-size: 20px;
  cursor: pointer;
}

a:hover,
a:active,
a.router-link-active {
  color: #0088a9;
  border-color: #0088a9;
}

.notification .badge {
  position: absolute;
  top: -15px;
  right: -15px;
  padding: 5px 10px;
  border-radius: 50%;
  background-color: red;
  color: white;
  font-size: 10px;
}

@media (max-width: 768px) {
  ul {
    width: 100vw;
    height: 100vh;
    top: -25px;
    right: -25px;
    align-items: center;
    background: rgba(#222, 0.8);
  }
  li {
    margin: 5vh 0;
    text-align: center;
  }
  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 5vw;
    width: 50vw;
    letter-spacing: 0.1em;
    padding: 10px;
    opacity: 0.7;
    border-bottom: 2px solid transparent;
    transition: opacity 0.3s ease, border-bottom 0.3s ease;
    background: none;
  }
}
</style>
