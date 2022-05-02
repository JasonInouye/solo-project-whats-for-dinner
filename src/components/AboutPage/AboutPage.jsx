import React from 'react';
import {
  Stack,
  Box,
  Button,
  Typography,
  Container,
  Slide,
  ListItemIcon,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FaReact, FaNodeJs, FaRegHandshake } from 'react-icons/fa'
import { AiFillApi } from 'react-icons/ai'
import { SiReduxsaga, SiMaterialui, SiPostgresql } from 'react-icons/si'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className='main-container'>
      <Container
        sx={{
          display: 'flex',
        }}
      >
        <Stack spacing={4}>
          <Box>
            <Typography variant='h4'>Future Considerations:</Typography>
            <Typography variant='subtitle1' sx={{ width: 400, mt: 2 }}>
              Add a shopping list function that will create a shopping list of
              ingredients that you are missing after planning the menu for the
              week.
            </Typography>
            <Typography variant='h4' sx={{ mt: 5 }}>
              Technologies I used:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FaReact />
                </ListItemIcon>
                <ListItemText primary='React' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SiReduxsaga />
                </ListItemIcon>
                <ListItemText primary='Redux Saga' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaNodeJs />
                </ListItemIcon>
                <ListItemText primary='Node.js' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FaRegHandshake />
                </ListItemIcon>
                <ListItemText primary='Axios' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SiMaterialui />
                </ListItemIcon>
                <ListItemText primary='Material UI' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SiPostgresql />
                </ListItemIcon>
                <ListItemText primary='PostgreSQL' />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AiFillApi />
                </ListItemIcon>
                <ListItemText primary='Spoonacular API' />
              </ListItem>
            </List>
            <Typography variant='h4' sx={{ mt: 5 }}>
              Thank You
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary='Prime Digital Academy' />
              </ListItem>
              <ListItem>
                <ListItemText primary='Dane my Instructor' />
              </ListItem>
              <ListItem>
                <ListItemText primary='The entire Prime Staff' />
              </ListItem>
              <ListItem>
                <ListItemText primary='The Butler Cohort' />
              </ListItem>
              <ListItem>
                <ListItemText primary='My family and my wife' />
              </ListItem>
            </List>
          </Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
              }}
            >
              <Typography variant='h5' sx={{ mt: 4 }}>
                App Developed By Jason Inouye
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <a
                  href='https://www.linkedin.com/in/jason-inouye-9744938a/'
                  target='_blank'
                >
                  <LinkedInIcon fontSize='large' sx={{ color: 'blue' }} />
                </a>
                <a href='https://github.com/JasonInouye' target='_blank'>
                  <GitHubIcon fontSize='large' sx={{ color: 'black' }} />
                </a>
              </Box>
              <Typography variant='b2' sx={{ textAlign: 'center', mt: 4 }}>
                © 2022 Jason Inouye
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default AboutPage;