import React, { useContext } from "react";
import NotAuthenticatedPage from "../pages/NotAuthenticatedPage";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
	const auth = useContext(AuthContext);

	if (!auth.isAuthenticated) {
		return <NotAuthenticatedPage />;
	}

	return children;
}
