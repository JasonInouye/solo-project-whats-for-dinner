import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  let params = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [selectedButton, setSelectedButton] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      //`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_SECOND_API_KEY}`
      // `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information?rapidapi-key=${process.env.REACT_RAPID_API_KEY}`
    );
    const detailData = await data.json();
    setRecipeDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  console.log("this is the JSON for details", recipeDetails);

  return (
    <div>
      <div>
        <h2>{recipeDetails.title}</h2>
        <img src={recipeDetails.image} alt="RecipeImage" />
      </div>
      
        {/* setting the active class based on which button is selected */}
        <button
          className={selectedButton === "instructions" ? "active" : ""}
          onClick={() => setSelectedButton("instructions")}
        >
          Instructions
        </button>
        <button
          className={selectedButton === "ingredients" ? "active" : ""}
          onClick={() => setSelectedButton("ingredients")}
        >
          Ingredients
        </button>
        {selectedButton === "instructions" && (
          <div>
            {/* this code sets the raw api data with html tags to render html data on dom */}
            <h3
              dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }}
            ></h3>
          </div>
        )}
        {selectedButton === "ingredients" && (
        <ul>
          {recipeDetails.extendedIngredients?.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.original}</li>;
          })}
        </ul>
        )}
    </div>
  );
}


export default RecipeDetails;
