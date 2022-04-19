import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const dowList = useSelector(store => store.dowList)
  const [heading, setHeading] = useState("Functional Component");

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_FAVORITES" });
  }, []);

  const handleDaySelect = () => {
    console.log( 'Inside of handleDaySelect');
  }

  return (
    <div className="dinner-container">
 
      <Container>
        <Row xs="3">
          {favorite.map((favoriteRecipe) => {
            console.log(favoriteRecipe);
            return (
              <>
                <Col key={favoriteRecipe.id}>
                  <Card>
                    <CardImg src={favoriteRecipe.recipe_image} />
                    <CardBody>
                      <CardTitle>
                        <p>{favoriteRecipe.recipe_name}</p>
                      </CardTitle>
                      <CardText>
                        This should be a description of the receipt
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
      )
    </div>
  );
}

export default DinnerHome;
