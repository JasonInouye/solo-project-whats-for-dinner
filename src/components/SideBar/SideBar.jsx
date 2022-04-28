import React from 'react';
import PropTypes from 'prop-types';
import {
  Link as RouterLink,
  Route,
  Routes,
  MemoryRouter,
  useLocation,
  StaticRouter,
} from 'react-router-dom';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home,
  Inventory,
  Kitchen,
  MenuBook,
  Save,
  Search,
} from '@mui/icons-material';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location='/drafts'>{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  function Content() {
    const location = useLocation();
    return (
      <Typography variant='body2' sx={{ pb: 2 }} color='text.secondary'>
        Current route: {location.pathname}
      </Typography>
    );
  }

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function SideBar() {
  return (
      <Box flex={1} p={3} mt={9}>
        <Box position='fixed'>
          <List>
            <ListItemLink
              to='/favorite'
              primary='Saved Recipes'
              icon={<Save />}
            />
            <ListItemLink
              to='/stockSearch'
              primary='Inventory Search'
              icon={<Inventory />}
            />
            <ListItemLink
              to='/search'
              primary='Search'
              icon={<Search />}
            />
            <ListItemLink
              to='/schedule'
              primary='Weekly Menu'
              icon={<MenuBook />}
            />
            <ListItemLink
              to='/ingredients/refrigerator'
              primary='Refrigerator'
              icon={<Kitchen />}
            />
            <ListItemLink
              to='/ingredients/pantry'
              primary='Pantry'
              icon={<Kitchen />}
            />
            <ListItemLink
              to='/ingredients/spices'
              primary='Spices'
              icon={<Kitchen />}
            />
          </List>
        </Box>
      </Box>
  );
}

export default SideBar;
