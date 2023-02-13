import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import FindRecipesPage from "./pages/FindRecipesPage";
import RecipePage from "./pages/RecipePage";
import FavoritesPage from "./pages/FavoritesPage";
import LandingPage from "./pages/LandingPage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="" element={<LandingPage />}></Route>
						<Route path="signup" element={<SignUpPage />}></Route>
						<Route path="login" element={<LoginPage />} />
						<Route
							path="favorites"
							element={
								<PrivateRoute>
									<FavoritesPage />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="history"
							element={
								<PrivateRoute>
									<HistoryPage />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="findrecipes"
							element={
								<PrivateRoute>
									<FindRecipesPage />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="account"
							element={
								<PrivateRoute>
									<AccountPage />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="recipes/:recipeID"
							element={<RecipePage />}
						></Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
