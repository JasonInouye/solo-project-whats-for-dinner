import React from 'react';
import { Stack, Box, Button, Typography, Container, Slide } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="main-container">
    <Slide direction="up" in="open" mountOnEnter unmountOnExit>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
            <Stack spacing={5}>
                <Box>
                    <Typography variant='h4'>
                        Future Considerations:
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2}}>
                        Add a shopping list function that will create a shopping list of ingredients that you are missing after planning the menu for the week.
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 5}}>
                        Technologies I used:
                    </Typography>
                </Box>
                <Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignContent: 'center'}}> 
                        <Typography variant='h5' sx={{ mt: 4}}>
                            App Developed By Jason Inouye
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <a href="https://www.linkedin.com/in/jason-inouye/" target="_blank"><LinkedInIcon fontSize="large" sx={{color: 'blue'}} /></a>
                            <a href="https://github.com/JasonInouye" target="_blank"><GitHubIcon fontSize="large" sx={{color: 'black'}}/></a>
                        </Box>
                        <Typography variant="b2" sx={{textAlign: 'center', mt: 4}}>
                           © 2022 Jason Inouye
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
        </Slide>
    </div>
  );
}

export default AboutPage;
