import { createStore } from "vuex";
import db from "../Firebase.js";
import { doc, getDoc, deleteDoc, setDoc, updateDoc, collection, query, orderBy, limit, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const bookRef = collection(db, "Books");


const store = createStore({
  state() {
    return {
      books: [],
      notification: [],
      noti: null,
      query: [],
      query2: [],
      confirm: false,
      hire: [],
      users: [],
      revs: [],
      panelUsers: [],
      sBook: { id: "", name: "" },
      Sperson: { id: "", name: "" },
      logged: { id: "", permision: "", que: 0 },
    };
  },
  mutations: {
    addToStore(state, payloud) {
      state.books = payloud;
    },
    addTohires(state, payloud) {
      state.hire = payloud;
    },
    addToUsers(state, payloud) {
      state.users = payloud;
    },
    PanelAdmin(state, payloud) {
      state.panelUsers = payloud;
    },
    addToRes(state, payloud) {
      state.revs = payloud;
    },
    deleteBook(state, id) {
      const index = state.panelUsers.findIndex(item => item.id === id);
      state.panelUsers.splice(index, 1);
    },
    deleteUser(state, id) {
      const index = state.books.findIndex(item => item.id === id);
      state.books.splice(index, 1);
    },
    findBooks(state, data) {
      state.books = data;
    },
    querStor(state, payloud) {
      state.books = payloud;
    },
    confirmMutation(state, payloud) {
      state.confirm = payloud;
    },
    selectBook(state, payloud) {
      state.sBook = payloud;
    },
    selectPerson(state, payloud) {
      state.Sperson = payloud;
    },
    loggedUser(state, payloud) {
      state.logged = payloud;
    },
    addToQuer(state, payloud) {
      state.query = payloud;
    },
    addToQuer2(state, payloud) {
      state.query2 = payloud;
    },
    querHire(state, payloud) {
      state.hire = payloud;
    },
    querRev(state, payloud) {
      state.revs = payloud;
    },
    querUser(state, payloud) {
      state.users = payloud;
    },
    queNoti(state, payloud) {
      state.noti = payloud;
    },
    notification(state, payloud) {
      state.notification = payloud;
    },


  },
  actions: {
    confirmTrue(context) {
      context.commit("confirmMutation", true);
    },
    confirmFalse(context) {
      context.commit("confirmMutation", false);
    },
    loadUsers(context) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          let tab = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              phone: doc.data().Phone,
              address: doc.data().address,
              city: doc.data().city,
              pesel: doc.data().pesel,
              queBooks: doc.data().queBooks,
            };
            tab.push(data);
          });
          context.commit("addToUsers", tab);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    loadData(context) {
      db.collection("Books")
        .get()
        .then((querySnapshot) => {
          let tab = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              name: doc.data().Name,
              author: doc.data().author,
              hire: doc.data().hire,
              img: doc.data().img,
              tags: doc.data().tags,
              year: doc.data().year,
              state: doc.data().state,
              quantity: doc.data().quantity
            };
            tab.push(data);
          });
          context.commit("addToStore", tab);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    addBook(_, payloud) {
      db.collection("Books")
        .add({
          Name: payloud.Name,
          author: payloud.author,
          hire: false,
          img: payloud.img,
          tags: payloud.tags,
          year: payloud.year,
          state: false,
          quantity: payloud.quantity,
          Quan: 0
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    deleteBook(context, id) {
      let is = true;
      const query1 = query(collection(db, "hire"), where('bookId', '==', id));
      onSnapshot(query1, (querySnapshot) => {
        querySnapshot.forEach(() => {
          is = false;
        });
        if (is) {
          deleteDoc(doc(db, "Books", id)).then(() => {
            context.commit("deleteBook", id);
          });
        }

      });

    },
    findBooks(context, payloud) {
      const szukana = payloud;
      const szukanaDlugosc = szukana.lenght;
      const szukanaFront = szukana.slice(0, szukanaDlugosc - 1);
      const szukanaEnd = szukana.slice(szukanaDlugosc - 1, szukana.lenght);
      const koniec = szukanaFront + String.fromCharCode(szukanaEnd.charCodeAt(0) + 1);
      const query1 = query(bookRef, where('Name', '>=', szukana), where('Name', '<=', koniec));
      onSnapshot(query1, (querySnapshot) => {
        let finds = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().Name,
            author: doc.data().author,
            hire: doc.data().hire,
            img: doc.data().img,
            tags: doc.data().tags,
            year: doc.data().year,
            state: doc.data().state,
            quantity: doc.data().quantity
          };
          finds.push(data);
        });
        context.commit("querStor", finds);
      });
    },
    findHire(context, payloud) {

      let finds = [];
      const szukana = payloud;
      const szukanaDlugosc = szukana.lenght;
      const szukanaFront = szukana.slice(0, szukanaDlugosc - 1);
      const szukanaEnd = szukana.slice(szukanaDlugosc - 1, szukana.lenght);
      const koniec = szukanaFront + String.fromCharCode(szukanaEnd.charCodeAt(0) + 1);
      const query1 = query(collection(db, "hire"), where('bookName', '>=', szukana), where('bookName', '<=', koniec));
      const query2 = query(collection(db, "hire"), where('userName', '>=', szukana), where('userName', '<=', koniec));
      onSnapshot(query1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            bookName: doc.data().bookName,
            bookId: doc.data().bookId,
            userName: doc.data().userName,
            userId: doc.data().userId,
            dataFrom: doc.data().dataFrom,
            dataTo: doc.data().dataTo,
            state: doc.data().hire,
          };
          finds.push(data);
        });
        onSnapshot(query2, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              bookName: doc.data().bookName,
              bookId: doc.data().bookId,
              userName: doc.data().userName,
              userId: doc.data().userId,
              dataFrom: doc.data().dataFrom,
              dataTo: doc.data().dataTo,
              state: doc.data().hire,
            };
            finds.push(data);
          });
          context.commit("querHire", finds);
        });
      });
    },

    findRev(context, payloud) {
      let finds = [];
      const szukana = payloud;
      const szukanaDlugosc = szukana.lenght;
      const szukanaFront = szukana.slice(0, szukanaDlugosc - 1);
      const szukanaEnd = szukana.slice(szukanaDlugosc - 1, szukana.lenght);
      const koniec = szukanaFront + String.fromCharCode(szukanaEnd.charCodeAt(0) + 1);
      const query1 = query(collection(db, "reservations"), where('bookName', '>=', szukana), where('bookName', '<=', koniec));
      const query2 = query(collection(db, "reservations"), where('userName', '>=', szukana), where('userName', '<=', koniec));
      onSnapshot(query1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            bookName: doc.data().bookName,
            bookId: doc.data().bookId,
            userName: doc.data().userName,
            userId: doc.data().userId,
            dataTo: doc.data().dataTo,
            state: doc.data().state,
          };
          finds.push(data);
        });
        onSnapshot(query2, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              bookName: doc.data().bookName,
              bookId: doc.data().bookId,
              userName: doc.data().userName,
              userId: doc.data().userId,
              dataTo: doc.data().dataTo,
              state: doc.data().state,
            };
            const isIn = finds.findIndex(item => item.id === data.id);
            if (!isIn) {
              finds.push(data);
            }

          });
          context.commit("querRev", finds);
        });
      });
    },

    findPerson(context, payloud) {
      let finds = [];
      const szukana = payloud;
      const szukanaDlugosc = szukana.lenght;
      const szukanaFront = szukana.slice(0, szukanaDlugosc - 1);
      const szukanaEnd = szukana.slice(szukanaDlugosc - 1, szukana.lenght);
      const koniec = szukanaFront + String.fromCharCode(szukanaEnd.charCodeAt(0) + 1);
      const query1 = query(collection(db, "users"), where('name', '>=', szukana), where('name', '<=', koniec));
      const query2 = query(collection(db, "users"), where('pesel', '>=', szukana), where('pesel', '<=', koniec));
      onSnapshot(query1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().Phone,
            address: doc.data().address,
            city: doc.data().city,
            pesel: doc.data().pesel,
            queBooks: doc.data().queBooks,
          };
          finds.push(data);
        });
        onSnapshot(query2, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              phone: doc.data().Phone,
              address: doc.data().address,
              city: doc.data().city,
              pesel: doc.data().pesel,
              queBooks: doc.data().queBooks,
            };
            const isIn = finds.findIndex(item => item.id === data.id);
            if (!isIn) {
              finds.push(data);
            }

          });
          context.commit("querUser", finds);
        });
      });
    },


    upDatePerson(_, payloud) {
      updateDoc(doc(db, "users", payloud.id), {
        name: payloud.name,
        pesel: payloud.pesel,
        city: payloud.city,
        address: payloud.address,
        phone: payloud.phone,
      });
    },
    upDateBook(_, payloud) {
      updateDoc(doc(db, "Books", payloud.Id), {
        Name: payloud.Name,
        author: payloud.author,
        img: payloud.img,
        tags: payloud.tags,
        year: payloud.year,
      });
    },

    loggedUser(context, payloud) {
      if (payloud == "non") {
        const data = {
          id: "",
          permision: "",
          que: 0,
        };
        context.commit("loggedUser", data);
      } else {
        db.collection('users').doc(payloud).get()
          .then((doc) => {
            if (doc.exists) {
              const data = {
                id: doc.id,
                permision: doc.data().Position,
                que: doc.data().queBooks,
              };
              context.commit("loggedUser", data);
            }
            else {
              console.log('Brak danych');
            }

          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    },

    AddUser(_, payloud) {
      setDoc(doc(db, "users", payloud.Id), {
        Email: payloud.Email,
        Phone: payloud.Phone,
        Position: 'user',
        address: payloud.address,
        city: payloud.city,
        name: payloud.name,
        pesel: payloud.pesel,
        queBooks: 5,
        Bokswypo: 0,
      });
    },
    DelUser(context, payloud) {
      getAuth()
        .deleteUser(payloud)
        .then(() => {
          deleteDoc(doc(db, "users", payloud)).then(() => {
            context.commit("deleteUser", payloud);
          });
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    },
    editPerrmision(_, payloud) {
      updateDoc(doc(db, "users", payloud.Id), {
        Position: payloud.perrmision,
      });

    },
    loadUsersPanel(context) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          let tab = [];
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              name: doc.data().name,
              Email: doc.data().Email,
              Phone: doc.data().Phone,
              Position: doc.data().Position,
              queBooks: doc.data().queBooks,
            };
            tab.push(data);
          });
          context.commit("PanelAdmin", tab);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });

    },

    loadHire({ commit, getters }) {
      let tab = [];
      let user = getters.getLogget;
      if (user.permision == 'Admin') {
        db.collection("hire").get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                bookName: doc.data().bookName,
                bookId: doc.data().bookId,
                userName: doc.data().userName,
                userId: doc.data().userId,
                dataFrom: doc.data().dataFrom,
                dataTo: doc.data().dataTo,
                state: doc.data().hire,
              };
              tab.push(data);
            });

            commit("addTohires", tab);
          });

      }
      else {
        db.collection("hire").where("userId", "==", user.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                bookName: doc.data().bookName,
                bookId: doc.data().bookId,
                userName: doc.data().userName,
                userId: doc.data().userId,
                dataFrom: doc.data().dataFrom,
                dataTo: doc.data().dataTo,
                state: doc.data().hire,
              };
              tab.push(data);
            });
            commit("addTohires", tab);
          });
      }

    },

    loadRes({ commit, getters }) {
      let tab = [];
      let user = getters.getLogget;
      if (user.permision == 'Admin') {
        db.collection("reservations")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                bookName: doc.data().bookName,
                bookId: doc.data().bookId,
                userName: doc.data().userName,
                userId: doc.data().userId,
                dataTo: doc.data().dataTo,
                state: doc.data().state,
              };
              tab.push(data);
            });
            commit("addToRes", tab);
          });
      }
      else {
        db.collection("reservations").where("userId", "==", user.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                bookName: doc.data().bookName,
                bookId: doc.data().bookId,
                userName: doc.data().userName,
                userId: doc.data().userId,
                dataTo: doc.data().dataTo,
                state: doc.data().state,
              };
              tab.push(data);
            });
            commit("addToRes", tab);
          });
      }
    },
    NewHire(_, payloud) {
      db.collection("hire")
        .add({
          bookName: payloud.book,
          bookId: payloud.bookId,
          userName: payloud.person,
          userId: payloud.personId,
          dataFrom: payloud.dataFrom,
          dataTo: payloud.dataTo,
          hire: true,
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      if (payloud.fromRev == false) {
        getDoc(doc(db, "Books", payloud.bookId)).then(docSnap => {
          if (docSnap.exists()) {
            let quantity = docSnap.data().quantity;
            let Quan = docSnap.data().Quan;
            db.collection("Books").doc(payloud.bookId).update({ quantity: quantity - 1 });
            db.collection("Books").doc(payloud.bookId).update({ hire: true });
            db.collection("Books").doc(payloud.bookId).update({ Quan: Quan + 1 });

          }
        });
        if (payloud.fromRev == false) {
          getDoc(doc(db, "users", payloud.personId)).then(docSnap => {
            if (docSnap.exists()) {
              let quantity = docSnap.data().queBooks;
              let Bokswypo = docSnap.data().Bokswypo;
              db.collection("users").doc(payloud.personId).update({ queBooks: quantity - 1 });
              db.collection("users").doc(payloud.personId).update({ Bokswypo: Bokswypo + 1 });
            }
          });
        }
      }

    },
    backBook(_, payloud) {
      db.collection("hire").doc(payloud.id).update({ hire: false });


      getDoc(doc(db, "Books", payloud.Bid)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().quantity;
          console.log(quantity);
          db.collection("Books").doc(payloud.Bid).update({ quantity: quantity + 1 });
          db.collection("Books").doc(payloud.Bid).update({ hire: false });
        }
      });

      getDoc(doc(db, "users", payloud.userId)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().queBooks;
          db.collection("users").doc(payloud.userId).update({ queBooks: quantity + 1 });
        }
      });

    },

    NewRev(_, payloud) {
      db.collection("reservations")
        .add({
          bookName: payloud.book,
          bookId: payloud.bookId,
          userName: payloud.person,
          userId: payloud.personId,
          dataTo: payloud.dataTo,
          state: "oczekuje",
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      getDoc(doc(db, "Books", payloud.bookId)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().quantity;
          db.collection("Books").doc(payloud.bookId).update({ quantity: quantity - 1 });
        }
      });
      getDoc(doc(db, "users", payloud.personId)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().queBooks;
          db.collection("users").doc(payloud.personId).update({ queBooks: quantity - 1 });
        }
      });
    },
    revCancel(_, payloud) {
      db.collection("reservations").doc(payloud.id).update({ state: 'odrzucona' });

      getDoc(doc(db, "users", payloud.Uid)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().queBooks;
          db.collection("users").doc(payloud.Uid).update({ queBooks: quantity + 1 });
        }
      });
    },
    revCon(_, payloud) {
      db.collection("reservations").doc(payloud.id).update({ state: 'Potwierdzona' });
    },


    selectBook(context, payloud) {
      context.commit("selectBook", payloud);
    },
    selectPerson(context, payloud) {
      context.commit("selectPerson", payloud);
    },
    logout(context) {
      const tab = [];
      context.commit("addTohires", tab);
      context.commit("addToUsers", tab);
      context.commit("addToRes", tab);
    },

    RQuery(context) {

      let tabB = [];
      let tabP = [];
      const query1 = query(collection(db, "Books"), orderBy("Quan", "desc"), limit(5));
      onSnapshot(query1, (querySnapshot) => {

        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            bookName: doc.data().Name,
            Quan: doc.data().Quan
          };
          tabB.push(data);
        });
        context.commit("addToQuer", tabB);
      });
      const query2 = query(collection(db, "users"), orderBy("Bokswypo", "desc"), limit(5));
      onSnapshot(query2, (querySnapshot) => {

        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            bookName: doc.data().name,
            Quan: doc.data().Bokswypo
          };
          tabP.push(data);
        });
        context.commit("addToQuer2", tabP);
      });

    },
    NewRevU(_, payloud) {
      let Uname = "";
      let date = new Date();
      date.setDate(date.getDate() + 7);
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      const makeDate = y + "-" + m + "-" + d;
      date = new Date(makeDate);
      console.log(payloud.Pid);
      db.collection('users').doc(payloud.Pid).get()
        .then((doc) => {
          if (doc.exists) {
            Uname = doc.data().name;
            db.collection("reservations")
              .add({
                bookName: payloud.Bname,
                bookId: payloud.Bid,
                userName: Uname,
                userId: payloud.Pid,
                dataTo: makeDate,
                state: "oczekuje",
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }
          else {
            console.log("No such document!");
          }
        });
      getDoc(doc(db, "Books", payloud.Bid)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().quantity;
          db.collection("Books").doc(payloud.Bid).update({ quantity: quantity - 1 });
        }
      });
      getDoc(doc(db, "users", payloud.Pid)).then(docSnap => {
        if (docSnap.exists()) {
          let quantity = docSnap.data().queBooks;
          db.collection("users").doc(payloud.Pid).update({ queBooks: quantity - 1 });
        }
      });
    },
    loadNoti(context) {
      let notifyTab = [];
      const q2 = query(collection(db, "notify"), where('active', '==', true));
      onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const notify = {
            idDoc: doc.id,
            id: doc.data().hireId,
            bookName: doc.data().bookName,
            userName: doc.data().userName,
            dataTo: doc.data().dataTo,
          };
          notifyTab.push(notify);
        });
        context.commit("notification", notifyTab);
      });

    },
    NotiQue(context) {
      let ilosc = 0;
      const q = query(collection(db, "notify"), where('active', '==', true));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach(() => {
          ilosc++;
        });
        context.commit("queNoti", ilosc);
      });
    },

    delNoti(context, payloud) {
      deleteDoc(doc(db, "notify", payloud)).then(() => {
      });
    },

    noti() {
      let notifyTab = [];
      let isInTab = true;
      let date = new Date();
      date.setDate(date.getDate() + 1);
      const y = date.getFullYear();
      const m = date.getMonth();
      const d = date.getDate();
      const makeDate = y + "-" + m + "-" + d;

      const q2 = query(collection(db, "notify"), where('active', '==', true));
      onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const notify = {
            id: doc.data().hireId,
            bookName: doc.data().bookName,
            userName: doc.data().userName,
            dataTo: doc.data().dataTo,
          };
          notifyTab.push(notify);
        });
      });

      const q = query(collection(db, "hire"), where("dataTo", "<=", makeDate), where('hire', '==', true));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          isInTab = true;
          const data = {
            id: doc.id,
            bookName: doc.data().bookName,
            userName: doc.data().userName,
            dataTo: doc.data().dataTo,
          };
          notifyTab.forEach(tabDoc => {
            if (tabDoc.id == data.id) {
              isInTab = false;
            }
          });
          if (isInTab) {
            db.collection("notify")
              .add({
                hireId: data.id,
                bookName: data.bookName,
                userName: data.userName,
                dataTo: data.dataTo,
                active: true,
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }
        });
      });

    }
  },
  getters: {
    getBooks(state) {
      return state.books;
    },
    getConfirm(state) {
      return state.confirm;
    },
    gethires(state) {
      return state.hire;
    },
    getUsers(state) {
      return state.users;
    },
    getPanelUsers(state) {
      return state.panelUsers;
    },
    getSUsers(state) {
      return state.Sperson;
    },
    getSBook(state) {
      return state.sBook;
    },
    getRevs(state) {
      return state.revs;
    },
    getLogget(state) {
      return state.logged;
    },
    getQuery(state) {
      return state.query;
    },
    getQuery2(state) {
      return state.query2;
    },
    getNotiNumber(state) {
      return state.noti;
    },
    getNotification(state) {
      return state.notification;
    },
  }
});

export default store;
