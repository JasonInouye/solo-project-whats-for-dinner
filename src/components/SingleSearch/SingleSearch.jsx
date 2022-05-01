import React from "react";
import styled from "styled-components";
import {useState} from "react";
import {useHistory} from 'react-router-dom';
import StockSearch from '../StockSearch/StockSearch';

function SingleSearch() {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    console.log( 'This is your search data', search);
      event.preventDefault();
      history.push('/search/' + search)
  };

  return (
    <div className="main-container">
      <h1>Search Dinner Tonight</h1>
      <FormStyle onSubmit={handleSubmit}>
        <div>
          <input type="text" value={search} onChange={(event) => setSearch(event.target.value)}/>
        </div>
      </FormStyle>
      <StockSearch />
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
    width: 75%;
    border-radius: 3px;
  }
`;

export default SingleSearch;
