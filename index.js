
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";



const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");

let isSigningIn = false;



onAuthStateChanged(auth, (currentUser) => {

    if (currentUser && !isSigningIn) {
        window.location.replace("home.html");
    }

});



submitBtn.addEventListener("click", async () => {

    const emailValue = email.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value;

    if (!emailValue || !usernameValue || !passwordValue) {
        alert("Please fill in all fields!");
        return;
    }

    isSigningIn = true;
    submitBtn.disabled = true;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                emailValue,
                passwordValue
            );

        const userRef = doc(
            db,
            "users",
            userCredential.user.uid
        );

        await setDoc(userRef, {

            email: emailValue,
            username: usernameValue,
            created_at: serverTimestamp()

        });

        window.location.replace("home.html");

    } catch (error) {

        console.log(error);

        alert(error.message);

        isSigningIn = false;
        submitBtn.disabled = false;

    }

});
