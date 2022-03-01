<template>
  <div class="conteiner">
    <the-search></the-search>
    <div class="list--books">
      //p
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
        @open-edit="openEditCard()"
      ></book-card>
    </div>
    <edit-form :id="this.id" v-if="editFormOpen"></edit-form>
    <router-link to="/AddBook">
      <div class="add">+</div>
    </router-link>
  </div>
</template>

<script>
import BookCard from "../components/ui/BookCard.vue";
import TheSearch from "../components/ui/TheSearch.vue";
import EditForm from "../components/ui/EditForm.vue";

export default {
  components: {
    BookCard,
    TheSearch,
    EditForm,
  },
  data() {
    return {
      editFormOpen: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("loadData");
  },
  computed: {
    books() {
      return this.$store.getters.getBooks;
    },
  },
  methods: {
    openEditCard(data) {
      this.editFormOpen = !this.editFormOpen;
    },
  },
};
</script>

<style scoped>
.list--books {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
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
.conteiner {
  padding: 3rem;
}
</style>
