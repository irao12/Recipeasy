import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="signup" element={<SignUpPage />}></Route>
						<Route path="login" element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
