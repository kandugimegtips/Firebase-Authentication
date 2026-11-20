
import {
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";



const logout = document.getElementById("logout");
const username = document.getElementById("username");
const addPostBtn = document.getElementById("add-post");
const postText = document.getElementById("post");
const postsContainer = document.getElementById("posts");

let currentUser = null;



onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.replace("index.html");
        return;
    }

    currentUser = user;

    try {

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (userData.exists()) {
            username.innerText =
                "Logged in as: " + userData.data().username;
        } else {
            username.innerText = "Welcome!";
        }

        fetchAllPosts();

    } catch (error) {

        console.log(error);
        alert(error.message);

    }

});



addPostBtn.addEventListener("click", async () => {

    if (!currentUser) return;

    const text = postText.value.trim();

    if (!text) {
        alert("Write something first!");
        return;
    }

    try {

        const postsRef = collection(db, "posts");

        await addDoc(postsRef, {

            text: text,
            created_by: currentUser.uid,
            created_at: serverTimestamp()

        });

        postText.value = "";

        alert("Post added!");

        fetchAllPosts();

    } catch (error) {

        console.log(error);
        alert(error.message);

    }

});



async function fetchAllPosts() {

    try {

        const postsRef = collection(db, "posts");

        const postsQuery = query(
            postsRef,
            orderBy("created_at", "desc")
        );

        const allPosts = await getDocs(postsQuery);

        postsContainer.innerHTML = "";

        allPosts.forEach((post) => {

            const data = post.data();

            const postElement = document.createElement("p");

            postElement.textContent = data.text;

            postsContainer.appendChild(postElement);

        });

    } catch (error) {

        console.log(error);
        alert(error.message);

    }

}



logout.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.replace("index.html");

    } catch (error) {

        console.log(error);
        alert(error.message);

    }

});
