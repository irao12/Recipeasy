import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Error from "../components/Error";
import AccountIcon from "../assets/icons/account.svg";
import LockIcon from "../assets/icons/lock.svg";
import Fridge from "../assets/images/Fridge.png";
import "./LoginPage.css";

export default function LoginPage() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	const validateEmail = (input) => {
		if (input.indexOf("@") <= 0) {
			setIsEmailValid(false);
			return false;
		}
		if (input.slice(-4) !== ".com") {
			setIsEmailValid(false);
			return false;
		}
		setIsEmailValid(true);
		return true;
	};

	const validatePassword = (input) => {
		if (input.trim().length === 0) {
			setIsPasswordValid(false);
			return false;
		} else {
			setIsPasswordValid(true);
			return true;
		}
	};

	const handleInputChange = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let isValid = validateEmail(inputs.email);
		isValid = validatePassword(inputs.password) && isValid;
		if (!isValid) {
			return;
		}

		auth.authenticate(inputs.email, inputs.password)
			.then((user) => {
				navigate("/findrecipes");
			})
			.catch((error) => {
				setErrorMessage(error.message);
			});
	};

	return (
		<div className="login-page">
			<div className="login-content">
				<img src={Fridge} className="fridge-img" alt="fridge" />
				<div className="login-group">
					<div className="login-section">
						<h3 className="login-heading">Log In</h3>
						<form className="login-form" onSubmit={handleSubmit}>
							<div
								className={
									(isEmailValid ? "" : "invalid ") + "login-email"
								}
							>
								<div className="login-icon">
									<img src={AccountIcon} alt="account" />
								</div>
								<input
									id="email"
									name="email"
									placeholder="Email Address"
									value={inputs.email}
									onChange={handleInputChange}
								></input>
							</div>
							{!isEmailValid && (
								<Error message={"* Enter a valid email"} />
							)}

							<div
								className={
									(isPasswordValid ? "" : "invalid ") +
									"login-password"
								}
							>
								<div className="login-icon">
									<img src={LockIcon} alt="account" />
								</div>
								<input
									name="password"
									id="password"
									type="password"
									placeholder="Password"
									value={inputs.password}
									onChange={handleInputChange}
								></input>
							</div>
							{!isPasswordValid && (
								<Error message={"* Enter a password"} />
							)}

							{errorMessage !== "" && (
								<Error message={errorMessage} />
							)}
							<button type="submit" className="login-button">
								Login
							</button>
							<Link className="signup-link" to="/signup">
								Don't Have An Account?
								<span className="sign-up-text"> Sign Up</span>
							</Link>
						</form>
					</div>
				</div>
			</div>	
		</div>
	);
}
