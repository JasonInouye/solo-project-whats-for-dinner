import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleSearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const searchResults = async (name) => {
    console.log("this is the Name inside of FETCH", name);
    const data = await fetch(
      //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${name}`
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&query=${name}`
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      // `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information?rapidapi-key=${process.env.REACT_RAPID_API_KEY}`
    );
    console.log("this is the data", data);
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
    console.log('this is the recipes results', recipes.results);
  };

  useEffect(() => {
    searchResults(params.searchItem);
  }, [params.searchItem]);

  console.log("this is the search results of the PARAMS", params.searchItem);
  console.log("this is the search results", searchedRecipes);

  return (
    <div className="main-container">
      {searchedRecipes.map((item) => {
        console.log("this is the item", item);
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <Link to={"/recipeDetails/" + item.id}>
              <img src={item.image} alt="RecipeImage" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SingleSearchResults;
