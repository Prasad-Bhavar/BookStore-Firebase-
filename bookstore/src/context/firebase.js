import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAhY8Ta69xE0Zkr7wO5iTchT7BJmMKmY3Q",
  authDomain: "bookstore-1b5f9.firebaseapp.com",
  projectId: "bookstore-1b5f9",
  storageBucket: "bookstore-1b5f9.firebasestorage.app",
  messagingSenderId: "477762865995",
  appId: "1:477762865995:web:9a354680c2aae5b4a0b6ce",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const fireStore = getFirestore(firebaseApp);
// const firebaseStorage = getStorage(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((response) => {
        console.log("success: ", response);
      })
      .catch((err) => {
        console.log(err);
      });
    googleProvider.addScope("email");
  };
  // console.log(user);

  const handleNewListing = async (name, isbn, price, cover) => {
    // const imageRef = ref(
    //   firebaseStorage,
    //   `uploads/images/${Date.now()}-${cover.name}`
    // );
    // const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(fireStore, "book"), {
      name: name,
      isbn: isbn,
      price: price,
      // bookCover: uploadResult.ref.fullPath,
      userId: user.uid,
      userImg: user.photoURL,
      userName: user.displayName,
    });
  };

  const getAllBook = () => {
    return getDocs(collection(fireStore, "book"));
  };

  const getViewPage = async (id) => {
    const docRef = doc(fireStore, "book", id);
    const snapShot = await getDoc(docRef);
    // console.log("snap",snapShot)
    return snapShot;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(fireStore, "book", bookId, "order");
    const result = await addDoc(collectionRef, {
      userId: user.uid,
      userImg: user.photoURL,
      userName: user.displayName,
      qty: Number(qty),
    });

    return result;
  };

  const fetchMyBook = async (userID) => {
    const collectionRef = collection(fireStore, "book");
    const q = query(collectionRef, where("userId", "==", userID));
    const response = await getDocs(q);
    console.log("qury data", response);
    return response;
  };

  const fetchOrder = async (bookId) => {
    const collectionRef = collection(fireStore, "book", bookId, "order");
    const result = await getDocs(collectionRef);
    return result;
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("exists", user);
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const isLoading = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signInWithGoogle,
        isLoading,
        handleNewListing,
        getAllBook,
        getViewPage,
        placeOrder,
        fetchMyBook,
        user,
        fetchOrder,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
