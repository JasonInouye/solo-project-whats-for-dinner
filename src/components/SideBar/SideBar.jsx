import React from 'react';
import PropTypes from 'prop-types';
import {
  Link as RouterLink,
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
  ExpandLess,
  ExpandMore,
  Favorite,
  Inbox,
  Inventory,
  Kitchen,
  MeetingRoom,
  MenuBook,
  Save,
  Search,
  StarBorder,
} from '@mui/icons-material';
import { GiCoolSpices } from 'react-icons/gi'


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
  const handleClick = () => {
    setOpen(!open);
  };

  const [open, setOpen] = React.useState(true);

  return (
    <Box flex={1} p={3} mt={11}>
      <Box position='fixed'>
        <List>
          <ListItemLink
            to='/favorite'
            primary='Favorite Recipes'
            icon={<Favorite />}
          />
          <ListItemLink
            to='/search'
            primary="What's for dinner?"
            icon={<Search />}
          />
          <ListItemLink
            to='/ingredients/refrigerator'
            primary='Refrigerator'
            icon={<Kitchen />}
          />
          <ListItemLink
            to='/ingredients/pantry'
            primary='Pantry'
            icon={<MeetingRoom />}
          />
          <ListItemLink
            to='/ingredients/spices'
            primary='Spices'
            icon={<GiCoolSpices />}
          />
        </List>
      </Box>
    </Box>
  );
}

export default SideBar;
