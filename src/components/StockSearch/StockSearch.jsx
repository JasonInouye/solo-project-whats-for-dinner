import React from "react";
import styled from "styled-components";
import {useEffect} from "react";
import StockSearchResults from "./StockSearchResults";
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'

function StockSearch() {
  const dispatch = useDispatch();  
  const allItems = useSelector((store) => store.ingredients);
  const history = useHistory();

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_ALL_STOCK' });
  }, []);

  

  const handleEntireStock = (all_ingredients) => {
    console.log('This is all of your stock items', all_ingredients );
    history.push('/stockSearch/' + all_ingredients)
  }

  return (
    <div className="main-container">
      <h1>Entire Stock</h1>
      <div>
        <ul>
          {allItems.map((item) => {
            return (
              <div key={item.id}>
                <li key={item.all_ingredients}>{item.all_ingredients}</li>
                <button onClick={() => handleEntireStock(item.all_ingredients)}>Submit</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const FormStyle = styled.form`
  margin: 0rem 20rem;
  position: relative;

  div {
    position: relative;
  }

  input {
    font-size: 1.5rem;
    width: 100%;
  }
`;

export default StockSearch;