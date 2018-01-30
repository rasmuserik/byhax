import React from 'react';
import logo from './logo.svg';
import {__} from './i18n';
import Calendar from './Calendar';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const communityName = 'Tinkuy'

const styles = {
  appBarContainer: {
		paddingTop: 64
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.appBarContainer}>
      <AppBar>
        <Toolbar>
          {/*
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography type="title" color="inherit" className={classes.flex}>
            {communityName}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Bar = withStyles(styles)(ButtonAppBar);

function App(props) {
  return (
    <div>
      <Bar />
      <img
        src={logo}
        style={{
          width: 64,
          height: 64
        }}
      />
      <div>{__('ByHax (under development)')}</div>
      <Calendar />
    </div>
  );
}

export default App;
