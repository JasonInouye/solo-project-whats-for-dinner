import React from "react";
import styled from "styled-components";
import {useState} from "react";
import StockSearchResults from "./StockSearchResults";
import {useHistory} from 'react-router-dom'

function StockSearch() {
  const [search, setSearch] = useState('');
  const allItems = useSelector((store) => store.ingredients);
  const history = useHistory();

  useEffect(() => {
    // dispatch to get all items to display on the DOM
    dispatch({ type: 'GET_ALL_STOCK' });
  }, []);

  const handleEntireStock = (event) => {
    setAllStockItems({...newSItem, ingredient: event.target.value,});
  }

  const handleSubmit = () => {
      event.preventDefault();
      history.push('/stockSearch/' + allItems)
  };

  return (
    <>
      <h1>StockSearch</h1>
      <FormStyle onSubmit={handleSubmit}>
        <div>
          <Button type="text" onChange={(event) => setSearch(event.target.value)}/>
        </div>
      </FormStyle>
    </>
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