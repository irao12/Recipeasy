import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function FavoritesPage() {
	const auth = useContext(AuthContext);

	const getFavorites = () => {
		fetch(`/api/favorite/${auth.user.id}`).then((response) => {
			response
				.json()
				.then((favorites) => {
					setFavorites(favorites);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		getFavorites();
	});

	return <div>FavoritesPage</div>;
}
