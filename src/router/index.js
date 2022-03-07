import { createRouter, createWebHistory } from "vue-router";
import BookList from "../pages/BookList.vue";
import BookTableList from "../pages/BooksListTable.vue";
import LoansList from "../pages/LoansList.vue";
import ReportsList from "../pages/ReportsList.vue";
import AddBook from "../pages/AddBook.vue";
import NewHire from "../pages/NewHire.vue";
import UsersList from "../pages/UsersList.vue";
import NewHireForm from "../components/ui/NewHireForm.vue";
import ReservationList from "../pages/ReservationList.vue";
import NewRev from "../pages/NewRev.vue";
import NewRevForm from "../components/ui/NewRevForm.vue";
import AdminPanel from "../pages/AdminPanel.vue";
import Notification from "../pages/Notification.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: "/panel", name: "AdminPanel", component: AdminPanel
    },
    {
      path: "/login", name: "login", component: () => import('../pages/Login.vue')
    },
    {
      path: "/register", name: "register", component: () => import('../pages/Register.vue')
    },
    { path: "/", redirect: "/books" },
    { path: "/notification", component: Notification },
    { path: "/books", component: BookList },
    { path: "/loans", name: 'loans', component: LoansList, props: true },
    { path: "/reports", component: ReportsList },
    { path: "/addBook", component: AddBook },
    { path: "/reservation", name: 'revs', component: ReservationList, props: true },
    {
      path: "/newHire", component: NewHire, props: true,
      children: [
        {
          path: "", name: 'NewHireForm', component: NewHireForm, props: true
        },

      ]
    },
    {
      path: "/NewHire/users", name: 'users1', component: UsersList, props: true
    },
    {
      path: "/NewHire/bookTable", name: 'books1', component: BookTableList, props: true
    },
    {
      path: "/NewRev", component: NewRev, props: true,
      children: [
        {
          path: "", component: NewRevForm, props: true
        },
        {
          path: "/newRev/users", name: 'users', component: UsersList, props: true
        },
        {
          path: "/newRev/bookTable", name: 'books', component: BookTableList, props: true
        },
      ]
    }
  ],
});

export default router;
