<template>
  <back-drop v-if="editFormOpen || confirm"></back-drop>
  <div class="conteiner">
    <div class="Search">
      <the-search></the-search>
    </div>
    <alter-que v-if="this.err" @close-dialog="closeDialog"
      >Osiągnieto maksymalną liczbe wyporzyczeń
    </alter-que>
    <div class="Table-h">
      <h3>imie i nazwisko</h3>
      <h3>telefon</h3>
      <h3>adres</h3>
      <h3>miasto</h3>
      <h3>pesel</h3>
    </div>
    <user-table
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :name="user.name"
      :phone="user.phone"
      :address="user.address"
      :city="user.city"
      :pesel="user.pesel"
      :queBooks="user.queBooks"
      @open-edit="openEditCard"
      @open-con="openComfirm"
      @activ-div="activate"
      :class="{ active: user.id == activ }"
    ></user-table>

    <person-edit
      :id="this.activ"
      @edit-cancel="openEditCardcancel"
      v-if="editFormOpen"
    >
    </person-edit>
    <the-confirm
      v-if="confirm"
      :id="this.EditId"
      @open-con2="openComfirm"
    ></the-confirm>

    <div v-if="this.msg == 'true'">
      <the-footer-menu-r
        :activ="activ"
        @open-edit="openEditCard"
        @delete-el="openComfirm"
        @select-el="selectEl"
      ></the-footer-menu-r>
    </div>

    <div v-else>
      <the-footer-menu-h
        :activ="activ"
        @open-edit="openEditCard"
        @delete-el="openComfirm"
        @select-el="selectEl"
      ></the-footer-menu-h>
    </div>
  </div>
</template>

<script>
import TheConfirm from "../components/ui/TheConfirm.vue";
import PersonEdit from "../components/ui/PersonEdit.vue";
import BackDrop from "../components/ui/Backdrop.vue";
import UserTable from "../components/ui/UserTable.vue";
import TheFooterMenuH from "../components/nav/TheFooterMenuH.vue";
import TheFooterMenuR from "../components/nav/TheFooterMenuR.vue";
import AlterQue from "../components/input/AlertQue.vue";
import TheSearch from "../components/search/TheSerachUser.vue";
export default {
  components: {
    TheConfirm,
    PersonEdit,
    BackDrop,
    UserTable,
    TheFooterMenuH,
    TheFooterMenuR,
    AlterQue,
    TheSearch,
  },
  name: "users",
  props: ["msg"],
  data() {
    return {
      editFormOpen: false,
      confirm: false,
      activ: null,
      activD: {
        name: "",
        id: "",
        que: 0,
      },
      err: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadUsers");
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    openEditCard(data) {
      this.EditId = data;
      this.editFormOpen = !this.editFormOpen;
    },
    openEditCardcancel() {
      this.editFormOpen = false;
    },
    openComfirm(data) {
      this.EditId = data;
      this.confirm = !this.confirm;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    selectEl() {
      if (this.activD.que > 0) {
        this.$store.dispatch("selectPerson", this.activD);
        this.sleep(200).then(() => {
          this.$router.go(-1);
        });
      } else {
        this.err = true;
      }
    },
    activate(data) {
      this.activ = data.id;
      this.que = data.que;
      this.activD = data;
    },
    closeDialog() {
      this.err = false;
    },
  },
};
</script>

<style scoped>
.Search {
  width: 30%;
  margin: auto;
}
.Table-h {
  display: flex;
  justify-content: space-around;
  background-color: #55608f;
}
.Table-h h3 {
  text-align: left;
  height: 100%;
  color: #fff;
  width: 100%;
  padding: 0 20px;
}
.add {
  font-size: 3rem;
  font-weight: bolder;
  position: fixed;
  bottom: 5%;
  right: 1%;
  border-radius: 50px;
  background: red;
  padding: 5px 20px;
  box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, 0.363);
}
.active {
  background-color: rgba(128, 128, 128, 0.267);
}
.conteiner {
  background: linear-gradient(45deg, #413b5c, #161420);
  min-height: 90vh;
  padding-top: 1rem;
}
@media (max-width: 768px) {
  .Table-h {
    display: none;
  }
  .Search {
    width: 50%;
  }
}
</style>
