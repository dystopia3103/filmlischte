import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA5GX11GST3tQy6nEI1cbtSzZcrSfOux7E",
	authDomain: "gheimi-filmlischte.firebaseapp.com",
	projectId: "gheimi-filmlischte",
	storageBucket: "gheimi-filmlischte.appspot.com",
	messagingSenderId: "811091132268",
	appId: "1:811091132268:web:e07b8a438eeb08b0a43d49"
};

initializeApp(firebaseConfig);

export const db = getFirestore();