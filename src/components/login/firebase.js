import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  doc,
  updateDoc,
  collection,
  where,
  deleteDoc,
  setDoc,
  addDoc
} from "firebase/firestore";
import { getDatabase } from "firebase/database";



const firebaseConfig = {

  //new
  // apiKey: "AIzaSyDncyuDACBn3YZyd5Pp6zTFYi_3RqT3BKs",
  // authDomain: "vozz-rp.firebaseapp.com",
  // projectId: "vozz-rp",
  // storageBucket: "vozz-rp.appspot.com",
  // messagingSenderId: "93173898454",
  // appId: "1:93173898454:web:92623db95c02aef03a3d77",
  // measurementId: "G-T4TJBB9L5D"

  apiKey: "AIzaSyCHzYKSfA0fZXMLT5s6DZJSkwPw-DrmPFc",
  authDomain: "vozz1-ce312.firebaseapp.com",
  projectId: "vozz1-ce312",
  storageBucket: "vozz1-ce312.appspot.com",
  messagingSenderId: "1076365253821",
  appId: "1:1076365253821:web:39b8180ac010edfb026bd4",
  measurementId: "G-FRPF7DLJDB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

const googleProvider = new GoogleAuthProvider();

const AddUsers = async (name, uid) => {
  try {
    const userRef = query(collection(db, "students"), where("sid", "==",uid));
    const result = await getDocs(userRef);
    if (result.docs.length==0){
      await setDoc(doc(db, "students", uid), {
        sname: name,
        sid: uid,
        screen1: "",
        screen2: "",
        screen3: ""
      });
      alert("User added successfully.");
    }
    else alert("User ID already exists!"); 
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



const AddButtons = async (value, url, color) => {

  try {
    const userRef = query(collection(db, "buttons"), where("name", "==", value));
    const result = await getDocs(userRef);
    if (result.docs.length == 0) {
      await setDoc(doc(db, "buttons", value), {
        name: value,
        image_url: url,
        color: color
      }).then((data) => { alert("Button Added"); })
        .catch((err) => { console.log('err', err); });
    }
    else alert("Button already exists!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const deleteButtons = async (name) => {
  try {
    await deleteDoc(doc(db, "buttons", name));
    console.log("Document deleted")
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const UpdateButton = async (value, url, color) => {
  console.log(value, url, color);
  try {
    await updateDoc(doc(db, "buttons", value), {
      name: value,
      image_url: url,
      color: color
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
const storage = getStorage(app);
export {
  auth,
  app,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  // listUsers,
  storage,
  AddUsers,
  AddButtons,
  database,
  UpdateButton
};