// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOrvrCin0vwfoW1kqOQg9rj91nXRp-_TU",
  authDomain: "fb-auth-e660c.firebaseapp.com",
  projectId: "fb-auth-e660c",
  storageBucket: "fb-auth-e660c.appspot.com",
  messagingSenderId: "25812502618",
  appId: "1:25812502618:web:ad0cf80e00190303257063",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

// DOM References
const signUpbtn = document.getElementById("signUp-btn");
const googleSign = document.getElementById("googleSign");
const logOut = document.getElementById("logout")
// const signIn = document.getElementById("login-btn");

signUpbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let email = document.getElementById("email-login").value;
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password, username)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        writeUserData(user, username, email);
        console.log(user)
      continuePage(user);
      alert("User Created");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

function writeUserData(user, username, email) {
  set(ref(database, "users/" + user.uid), {
    email: email,
    displayName: username,
  });
}

googleSign.addEventListener("click", (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      continuePage(user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

function continuePage(user) {
  if (user) {
    document.getElementById("signUp-btn").classList.add('hidden')
    document.getElementById("logout").classList.remove('hidden')
    document.querySelector(".forgot-pass").classList.add('hidden')
    const userName = document.getElementById("user-name");
    document.querySelector("form").classList.add('hidden')
    document.querySelector(".title-login").innerText = "Bienvenido"
    userName.classList.remove("hidden")
    userName.innerText = user.email;
  }
}

/**
 *
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
*/
let currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
*/
function onAuthStateChanged(user) {
  const userName = document.getElementById("user-name");
  
  if (user) {
    currentUID = user.uid;
    // userName.style.display = "block";
    // userName.innerHTML = `${user.email}`;
    // logOut.style.display = "initial";
    // login.style.display = "none";
  } else {
    // Set currentUID to null.
    currentUID = null;
    // userName.style.display = "none";
    // logOut.style.display = "none"
    // login.style.display = "inline-block";
  }
}
onAuthStateChanged();

// Listen for auth state changes
auth.onAuthStateChanged(onAuthStateChanged);

// Bind Sign out button.
logOut.addEventListener("click", function () {
    const user = document.getElementById("username")
    user.value = ""
    document.getElementById("email-login").value = ""
    document.getElementById("password").value = ""
    document.getElementById("signUp-btn").classList.remove('hidden')
    document.getElementById("logout").classList.add('hidden')
    document.querySelector(".forgot-pass").classList.remove('hidden')
    document.querySelector("form").classList.remove('hidden')
    document.querySelector(".title-login").innerText = "Ingresar"
    const userName = document.getElementById("user-name");
    userName.classList.add("hidden")
    userName.innerText = "Username";
    auth.signOut();
});

