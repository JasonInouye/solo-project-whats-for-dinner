import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  ButtonDropdown,
} from "reactstrap";

function DinnerHome() {
  const dispatch = useDispatch();
  const favorite = useSelector((store) => store.favorite);
  const [heading, setHeading] = useState("Functional Component");

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: "GET_FAVORITES" });
  }, []);

  console.log("Logging the GET", favorite);

  return (
    <div className="dinner-container">
      {/* <Navbar
                className="navbar"
                color="danger"
                dark
                expand
                fixed="top"
                full="true"
                light
            >
                <NavbarBrand href="/">
                    Home
                </NavbarBrand>
                <Collapse navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <NavItem>
                            <NavLink href="/components/">
                                Search Recipes
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown
                            inNavbar
                            nav
                        >
                            <DropdownToggle
                                caret
                                nav
                            >
                                Ingredients
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>
                                    Refrigerator
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Pantry
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Spice Rack
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>
                        About
                    </NavbarText>
                </Collapse>
            </Navbar> */}
      <Container>
        <Row xs="3">
          {favorite.map((favoriteRecipe) => {
            console.log(favoriteRecipe);
            return (
              <Col>
                <Card>
                  <CardImg src={favoriteRecipe.recipe_image} />
                  <CardBody>
                    <CardTitle>
                      <p>{favoriteRecipe.recipe_name}</p>
                    </CardTitle>
                    <CardText>
                      <p>This should be a description of the receipt</p>
                    </CardText>
                  </CardBody>
                </Card>
                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                    Schedule
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>Saturday</DropdownItem>
                    <DropdownItem>Sunday</DropdownItem>
                    <DropdownItem>Monday</DropdownItem>
                    <DropdownItem>Tuesday</DropdownItem>
                    <DropdownItem>Wednesday</DropdownItem>
                    <DropdownItem>Thursday</DropdownItem>
                    <DropdownItem>Friday</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            );
          })}
        </Row>
      </Container>
      )
    </div>
  );
}

export default DinnerHome;
