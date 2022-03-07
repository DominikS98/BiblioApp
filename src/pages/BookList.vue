<template>
  <back-drop v-if="editFormOpen || confirm"></back-drop>
  <div class="conteiner">
    <chek-box @is-chek="allBookSee" @isset-tag="tags"></chek-box>
    <alter-que v-if="this.err" @close-dialog="openErr"
      >Osiągnieto maksymalną liczbe wyporzyczeń
    </alter-que>
    <div class="list--books">
      <book-card
        v-for="book in books"
        :key="book.id"
        :id="book.id"
        :name="book.name"
        :author="book.author"
        :hire="book.hire"
        :img="book.img"
        :tags="book.tags"
        :year="book.year"
        :quantity="book.quantity"
        @open-edit="openEditCard"
        @open-con="openComfirm"
        @new-rez="newRez"
        @open-err="openErr"
        :allBookChekBox="this.allBookChekBox"
        :selecTtag="this.tag"
      ></book-card>
    </div>
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

    <router-link to="/AddBook" v-if="permission == 'Admin'">
      <div class="add">+</div>
    </router-link>
  </div>
</template>

<script>
import TheConfirm from "../components/ui/TheConfirm.vue";
import BookCard from "../components/ui/BookCard.vue";
import EditForm from "../components/ui/EditForm.vue";
import BackDrop from "../components/ui/Backdrop.vue";
import ChekBox from "../components/input/ChekBox.vue";
import AlterQue from "../components/input/AlertQue.vue";

export default {
  components: {
    TheConfirm,
    BookCard,
    EditForm,
    BackDrop,
    ChekBox,
    AlterQue,
  },
  data() {
    return {
      EditId: "",
      editFormOpen: false,
      confirm: false,
      allBookChekBox: false,
      tag: "",
      alter: false,
      err: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadData");
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
    permission() {
      return this.$store.getters.getLogget.permision;
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
    allBookSee(isChek) {
      this.allBookChekBox = isChek;
    },
    tags(data) {
      this.tag = data;
    },
    openErr() {
      this.err = !this.err;
    },
    newRez() {
      this.$store.dispatch("loadData");
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
  color: #e5e5e5;
}
.list--books {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.add {
  font-size: 3rem;
  font-weight: bolder;
  position: fixed;
  bottom: 5%;
  right: 3%;
  border-radius: 50px;
  background: red;
  padding: 5px 20px;
  box-shadow: 1px 5px 10px 2px rgba(0, 0, 0, 0.363);
}
.conteiner {
  background: linear-gradient(45deg, #413b5c, #161420);
  padding: 3rem;
  min-height: 90vh;
}
.find {
  display: flex;
  justify-content: space-between;
}
</style>
