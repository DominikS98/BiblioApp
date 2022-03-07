<template>
  <div class="main__box">
    <the-header class="head"></the-header>
    <router-view />
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import TheHeader from "./components/nav/TheHeader.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    TheHeader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const auth = getAuth();

    onBeforeMount(() => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace("/");
        } else if (route.path == "/login" || route.path == "/register" || route.path == "/books") {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<style>
* {
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.main__box {
  min-height: 100vh;
}
</style>
