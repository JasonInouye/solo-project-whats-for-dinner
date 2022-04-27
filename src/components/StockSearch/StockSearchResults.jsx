import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function StockSearchResults() {
  const [stockRecipes, setStockRecipes] = useState([]);
  let params = useParams();

  const stockResults = async (name) => {
    //console.log( 'This is inside of the FETCH', name);
    const data = await fetch(
      //`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${name}`
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SECOND_API_KEY}&ingredients=${name}`
    );
    //console.log("this is the data", data);
    const recipes = await data.json();
    //console.log('this is the recipes results 1', recipes);
    setStockRecipes(recipes);
    console.log('this is the recipes results 2', recipes);
  };

  useEffect(() => {
    stockResults(params.searchString);
  }, [params.searchString]);

  //console.log("this is the search results of PARAMS", params.searchString);
  //console.log("this is the search results YAHOO", stockRecipes);

  return (
    <>
      {stockRecipes.map((item) => {
        console.log("this is the item", item);
        let percentage = parseFloat(Number(item.usedIngredientCount)/(Number(item.usedIngredientCount)+Number(item.missedIngredientCount))*100).toFixed(2)
        
        console.log( 'This is the percentage', percentage);
        return (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <Link to={"/recipeDetails/" + item.id}>
              <img src={item.image} alt="RecipeImage" />
            </Link>
            <p>{item.missedIngredientCount}</p>
            <p>{item.usedIngredientCount}</p>
          </div>
        );
      })}
    </>
  );
}

export default StockSearchResults;