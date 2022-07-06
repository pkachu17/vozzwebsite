// Import required dependencies for react, react components, firebase, images and style sheet
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getFirestore, query, getDocs, doc, updateDoc, collection, where, setDoc, addDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// FireBase configurations
const firebaseConfig = {
  apiKey: "AIzaSyCHzYKSfA0fZXMLT5s6DZJSkwPw-DrmPFc",
  authDomain: "vozz1-ce312.firebaseapp.com",
  projectId: "vozz1-ce312",
  storageBucket: "vozz1-ce312.appspot.com",
  messagingSenderId: "1076365253821",
  appId: "1:1076365253821:web:39b8180ac010edfb026bd4",
  measurementId: "G-FRPF7DLJDB"
};

// Initializing firebase using above configurations
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

// AddUsers function to provide CreateUser component with adding new users/students
const AddUsers = async (name, uid) => {
  try {
    const userRef = query(collection(db, "students"), where("sid", "==", uid));
    const result = await getDocs(userRef);
    if (result.docs.length === 0) {
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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


// AddButtons function to provide CreateButton component with adding new Buttons
const AddButtons = async (value, url, color) => {
  try {
    const userRef = query(collection(db, "buttons"), where("name", "==", value));
    const result = await getDocs(userRef);
    if (result.docs.length === 0) {
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

// AddButtons function to provide EditButton component with adding updated Buttons
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

// Signing in with Google account
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

// Loging in with Email ID and Password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Register new User/Therapist/Doctor
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

// Password reset option when forgot password
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// User/Therapist/Doctor Logout
const logout = () => {
  signOut(auth);
};

// Initializing firebase storage
const storage = getStorage(app);

// export firebase functionalities
export { auth, app, db, storage, database, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, AddUsers, AddButtons, UpdateButton };