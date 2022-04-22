import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleSearchResults() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const searchResults = async (name) => {
    console.log("this is the Name", name);
    const data = await fetch(
      //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${name}`
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&query=${name}`
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
      // `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information?rapidapi-key=${process.env.REACT_RAPID_API_KEY}`
    );

    console.log("this is the data", data);
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    searchResults(params.searchItem);
  }, [params.searchItem]);

  console.log("this is the search results", searchedRecipes);

  return (
    <>
      {searchedRecipes.map((item) => {
        console.log("this is the item", item);
        return (
          <>
            <Link to={"/recipeDetails/" + item.id}>
              <img src={item.image} alt="RecipeImage" />
            </Link>
            <h2>{item.title}</h2>
          </>
        );
      })}
    </>
  );
}

export default SingleSearchResults;
