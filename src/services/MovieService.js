import {addDoc, updateDoc, collection, deleteDoc, getDocs} from "firebase/firestore";
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

	updateStream(movie, stream)
	{
		return updateDoc(movie.ref, "stream", stream);
	}

	delete(movie) {
		return deleteDoc(movie.ref);
	}
}

export default new MovieService();