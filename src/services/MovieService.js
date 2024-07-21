import {addDoc, collection, getDocs, where, deleteDoc, doc, query} from "firebase/firestore";
import {db} from "../firebase.js"

const movieCollection = collection(db, "movies");

class MovieService {
	getAll() {
		return getDocs(movieCollection);
	}

	create(movie) {
		return addDoc(movieCollection, {
			name: movie,
		});
	}

	delete(movie) {
		console.log(movie);
		return deleteDoc(movie.ref);
		// const q = await movieCollection.where("name", "==", movie).get();
		// const res = await getDocs(q);
		// if (res.size > 1 || res.size < 1) {
		// 	return false;
		// }
		// let success = false;
		// res.forEach(doc => doc.ref.delete().then(() => success = true));
		// return success;
	}
}

export default new MovieService();