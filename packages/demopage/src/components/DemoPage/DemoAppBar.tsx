import * as React from 'react';
import classnames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { styles } from './DemoPage.styles';

export interface IDemoAppBarProps extends StyledComponentProps {
  navOpen: boolean;
  editOpen: boolean;
  toggleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
}
export const DemoAppBarBase = ({ classes, navOpen, editOpen, toggleMenu, toggleEdit, title }: IDemoAppBarProps) => (
  <AppBar position="fixed"
    className={classnames(classes.appBar, {
      [classes.appBarShift]: navOpen,
    })}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={toggleMenu}
        className={classnames(classes.menuButton, navOpen && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography color="inherit" className={classes.grow}>{title}</Typography>
      <div>
        <IconButton
          color="inherit"
          onClick={toggleEdit}
          className={classnames(classes.editButton, editOpen && classes.hide)}>
          <EditIcon />
        </IconButton>
      </div>
    </Toolbar>
  </AppBar>
);

export const DemoAppBar = withStyles(styles)(DemoAppBarBase);
