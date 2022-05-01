import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import StockSearch from '../StockSearch/StockSearch';
import { Box, TextField } from '@mui/material';

function SingleSearch() {
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    console.log('This is your search data', search);
    event.preventDefault();
    history.push('/search/' + search);
  };

  return (
    <div className='main-container'>
      <h1>Search Dinner Tonight</h1>
      <FormStyle onSubmit={handleSubmit}>
        <Box
          sx={{
            maxWidth: '100%',
          }}
        >
          <TextField
            variant='outlined'
            id='outlined-basic'
            label='Search Recipes'
            type='search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ mt: 2, mb: 2, width: 500 }}
          />
        </Box>
      </FormStyle>
      <StockSearch />
    </div>
  );
}

const FormStyle = styled.form`
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
