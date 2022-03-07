<template>
  <div class="conteiner">
    <div class="Table-h">
      <h3>Email</h3>
      <h3>Uprawnienia</h3>
      <h3>Imie i nazwisko</h3>
      <h3>adres</h3>
      <h3>ilość wyporzyczeń</h3>
    </div>
    <admin-panel-table
      v-for="user in users"
      :key="user.id"
      :id="user.id"
      :Position="user.Position"
      :Email="user.Email"
      :name="user.name"
      :Phone="user.Phone"
      :queBooks="user.queBooks"
      @activ-div="activate"
      :class="{ active: user.id == activ }"
    ></admin-panel-table>

    <edit-perrmision
      v-if="OpenEdit"
      @edit-user-submit="editUserSubmit"
      @close-dialog-edit="closeEdit"
    ></edit-perrmision>

    <the-footer-panel-admin
      :activ="activ"
      @delete-user="delUser"
      @edit-user="editUser"
    ></the-footer-panel-admin>
    <alert-que @close-dialog="close" v-if="err">Nie wybrano osoby </alert-que>
  </div>
</template>

<script>
import AdminPanelTable from "../components/ui/AdminPanelTable.vue";
import TheFooterPanelAdmin from "../components/nav/TheFooterAdminPanel.vue";
import EditPerrmision from "../components/edits/EditPerrmision.vue";
import AlertQue from "../components/input/AlertQue.vue";

export default {
  components: {
    AdminPanelTable,
    TheFooterPanelAdmin,
    EditPerrmision,
    AlertQue,
  },
  data() {
    return {
      activ: null,
      OpenEdit: false,
      err: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadUsersPanel");
  },
  computed: {
    users() {
      return this.$store.getters.getPanelUsers;
    },
  },
  methods: {
    activate(id) {
      this.err = false;
      this.activ = id;
    },
    delUser() {
      //console.log(this.activ);
      this.$store.dispatch("DelUser", this.activ);
    },
    editUser() {
      if (this.activ == null) {
        this.err = true;
      } else this.OpenEdit = !this.OpenEdit;
    },
    close() {
      this.err = !this.err;
    },
    closeEdit() {
      this.OpenEdit = !this.OpenEdit;
    },

    editUserSubmit(per) {
      const data = {
        Id: this.activ,
        perrmision: per,
      };
      this.$store.dispatch("editPerrmision", data);
      this.$store.dispatch("loadUsersPanel");
    },
  },
};
</script>

<style scoped>
.Search {
  width: 80%;
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
}
</style>
