import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [ingredientList, setIngredientList] = useState([]);

	useEffect(() => {
		fetch("/api/auth/login")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unauthenticated");
				}

				return response.json();
			})
			.then((body) => setUser(body))
			.catch((error) => setUser(false));
		getIngredientList();
	}, []);

	const authenticate = (email, password) => {
		return fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Login Failed");
				}
				return response.json();
			})
			.then((body) => {
				setUser(body);
				return body;
			});
	};

	const signout = () => {
		return fetch("api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					console.log(response);
					throw new Error("Logout Failed");
				}
			})
			.then((body) => {
				setUser(false);
				return body;
			});
	};

	const refresh = () => {
		fetch("/api/auth/login")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unauthenticated");
				}

				return response.json();
			})
			.then((body) => setUser(body))
			.catch((error) => setUser(false));
	};

	const getExperienceFromLevel = (level) => {
		return Math.pow(level / 0.5, 2);
	};

	const getLevelFromExperience = () => {
		return Math.floor(Math.sqrt(user.experience) * 0.5);
	};

	const getIngredientList = () => {
		fetch("/api/ingredientlist/")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Unauthenticated");
				}

				return response.json();
			})
			.then((body) => {
				setIngredientList(body.ingredients);
			})
			.catch((error) => setUser(false));
	};

	return (
		<Provider
			value={{
				authenticate,
				signout,
				getExperience: getExperienceFromLevel,
				getLevel: getLevelFromExperience,
				refresh: refresh,
				getIngredientList: getIngredientList,
				ingredientList,
				user,
				setUser,
				isAuthenticated: user ? true : false,
				experience: user.experience,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
