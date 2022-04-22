import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function DinnerHome() {
  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.favorite);
  const dowList = useSelector((store) => store.dow);
  const [dow, setDow] = useState("");

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_FAVORITES" });
    dispatch({ type: "GET_DOW" });
  }, []);

  //console.log( 'This is the DOW', dowList);

  const saveDow = (favoriteRecipe) => {
    console.log("Inside of saveDow", favoriteRecipe, dow);
    let addDow = {
      id: favoriteRecipe.id,
      spoon_id: favoriteRecipe.spoon_id,
      dow: dow
    };
    dispatch({ type: "SET_MENU_DOW", payload: addDow });
  };

  return (
    <div className="dinner-container">
      <Container>
        <Row xs="3">
          {favorite.map((favoriteRecipe) => {
            //console.log(favoriteRecipe);
            return (
              <>
              <div  key={favoriteRecipe.id}>
                <Col>
                  <Card>
                    <Link to={"/recipeDetails/"+ favoriteRecipe.spoon_id}>
                    <CardImg src={favoriteRecipe.recipe_image} />
                    </Link>
                    <CardBody>
                      <CardTitle>
                        <p>{favoriteRecipe.recipe_name}</p>
                      </CardTitle>
                      <CardText>
                        <select
                          id="dow"
                          name="dow"
                          onChange={(event) => setDow(event.target.value)}
                        >
                          {dowList.map((dow) => {
                            return (
                              <option key={dow.id} value={dow.dow}>
                                {dow.dow}
                              </option>
                            );
                          })}
                        </select>
                        <button onClick={() => saveDow(favoriteRecipe)}>
                          Add Day
                        </button>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                </div>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default DinnerHome;
