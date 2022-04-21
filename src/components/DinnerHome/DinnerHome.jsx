import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  ButtonDropdown,
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
                <Col key={favoriteRecipe.id}>
                  <Card>
                    <Link to={"/recipeDetails/"+ favoriteRecipe.spoon_id}>
                    <CardImg src={favoriteRecipe.recipe_image} />
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
                    </Link>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default DinnerHome;
