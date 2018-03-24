import React from 'react';
import Reboot from 'material-ui/Reboot';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

/*
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import InfiniScroll from './InfiniScroll';

import logo from './logo.svg';
*/

import Calendar from './Calendar';
import {__} from './i18n';

const communityName = 'Tinkuy';

const styles = {
  appBarContainer: {
    paddingTop: 64
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const {classes} = props;
  return (
    <div className={classes.appBarContainer}>
      <AppBar>
        <Toolbar>
          {/*
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography
            type="title"
            color="inherit"
            className={classes.flex}>
            {communityName}
          </Typography>
          <Typography
            type="title"
            color="inherit"
            className={classes.flex}>
            <TextField value="Feb 2018" fullWidth={false} />
          </Typography>
          <Button color="inherit">{__('Login')}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Bar = withStyles(styles)(ButtonAppBar);

const theme = createMuiTheme({
  /*
  palette: {
    primary: {
      light: '#ffffb0',
      main: '#ffcc80',
      dark: '#ca9b52',
      contrastText: '#000'
    },
    secondary: {
      light: '#ffff6e',
      main: '#cddc39',
      dark: '#99aa00',
      contrastText: '#000'
    }
  }
  */
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <div
        style={{
          background: '#eee',
          fontFamily: 'roboto, arial, sans-serif'
        }}>
        <Reboot />
        <Bar />
        {/*<InfiniScroll />*/}
        <Calendar />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
