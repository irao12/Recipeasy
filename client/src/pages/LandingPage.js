import React from 'react'
import { Link } from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
        <div className="landing-page-content">
            <h1>Recipes made easy.</h1>
            <div className="landing-page-text">
                <p>Have you ever looked into your fridge and struggled figuring out what to cook? Us, too.</p>
                <p> 
                With Recipeasy, you can find recipes based on the ingredients you have at hand! Not only 
                can you save money on groceries and takeout, but also try new foods and prevent your 
                ingredients from going to waste.
                </p>
            </div>
            <Link className="sign-up-link" to="/signup">Sign up today!</Link>
        </div>
    </div>
  )
}
