<template>
  <back-drop v-if="editFormOpen || confirm"></back-drop>
  <div class="conteiner">
    <div class="Search"></div>
    <alter-que v-if="this.err" @close-dialog="closeDialog"
      >Brak dostępnych kopi książki</alter-que
    >
    <chek-box @is-chek="allBookSee" @isset-tag="tags"></chek-box>
    <div class="Table-h">
      <h3>tytuł</h3>
      <h3>autor</h3>
      <h3>tag</h3>
      <h3>rok</h3>
      <h3>ilość</h3>
    </div>
    <book-table
      v-for="book in books"
      :key="book.id"
      :id="book.id"
      :name="book.name"
      :author="book.author"
      :hire="book.hire"
      :tags="book.tags"
      :year="book.year"
      :state="book.state"
      :quantity="book.quantity"
      @activ-div="activate"
      :class="{ active: book.id == activ }"
      :allBookChekBox="this.allBookChekBox"
      :selecTtag="this.tag"
    ></book-table>

    <edit-form
      :id="this.EditId"
      @edit-cancel="openEditCardcancel"
      v-if="editFormOpen"
    >
    </edit-form>

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
        ><p>dsad</p></the-footer-menu-h
      >
    </div>
  </div>
</template>

<script>
import TheConfirm from "../components/ui/TheConfirm.vue";
import EditForm from "../components/ui/EditForm.vue";
import BackDrop from "../components/ui/Backdrop.vue";
import BookTable from "../components/ui/BookTable.vue";
import TheFooterMenuH from "../components/nav/TheFooterMenuH.vue";
import TheFooterMenuR from "../components/nav/TheFooterMenuR.vue";
import ChekBox from "../components/input/ChekBox.vue";
import AlterQue from "../components/input/AlertQue.vue";

export default {
  components: {
    TheConfirm,
    EditForm,
    BackDrop,
    BookTable,
    TheFooterMenuH,
    TheFooterMenuR,
    ChekBox,
    AlterQue,
  },
  name: "book",
  props: {
    msg: {
      type: String,
    },
  },
  data() {
    return {
      EditId: "",
      editFormOpen: false,
      confirm: false,
      activ: null,
      activD: {
        name: "",
        id: "",
        que: 0,
      },
      allBookChekBox: false,
      err: false,
      tag: "",
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadData");
    console.log(this.$store.getters.getLogget.permision);
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
  },
  methods: {
    tags(data) {
      this.tag = data;
    },
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
        this.$store.dispatch("selectBook", this.activD);
        this.sleep(200).then(() => {
          this.$router.go(-1);
        });
      } else {
        this.err = true;
        console.log("cos tam jako blad");
      }
    },
    activate(data) {
      this.activ = data.id;
      this.activD = data;
    },
    allBookSee(isChek) {
      this.allBookChekBox = isChek;
    },
    closeDialog() {
      this.err = false;
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
