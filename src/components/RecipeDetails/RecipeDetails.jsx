import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function RecipeDetails() {
  const [heading, setHeading] = useState("Recipe Details");
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
    <DetailWrapper>
        <Info>
      <div>
        <h2>{recipeDetails.title}</h2>
        <img src={recipeDetails.image} alt="RecipeImage" />
      </div>
      
        {/* setting the active class based on which button is selected */}
        <Button
          className={selectedButton === "instructions" ? "active" : ""}
          onClick={() => setSelectedButton("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={selectedButton === "ingredients" ? "active" : ""}
          onClick={() => setSelectedButton("ingredients")}
        >
          Ingredients
        </Button>
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
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  margin-left: 50rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default RecipeDetails;
