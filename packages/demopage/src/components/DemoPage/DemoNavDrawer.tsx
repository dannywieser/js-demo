import * as React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import { StyledComponentProps, withStyles } from '@material-ui/core';

import { IComponentModule } from '../../utilities/markdown';
import { styles } from './DemoPage.styles';

export interface IDemoNavDrawerProps extends Partial<StyledComponentProps> {
  components: IComponentModule;
  toggleMenu: (event: React.MouseEvent<HTMLButtonElement>) => void;
  navOpen: boolean;
  active: string;
}

export interface IRouterButtonProps {
  to: string;
  name: string;
  selected: boolean;
}

export const RouterButton = Button as any;
const RouterLink = (props: IRouterButtonProps) => <Link to="/" {...props} />;

const getComponentNames = (components: IComponentModule): string[] => Object.keys(components);
const LinkListItem = ({ name, to, selected }: IRouterButtonProps) => (
  <ListItem disableGutters={true} style={ { padding: 0 }} selected={selected}>
    <RouterButton
      fullWidth={true}
      to={to}
      component={RouterLink}
      name={name}
      style={{ textTransform: 'none' }}
      disabled={selected}
    >
      {name}
    </RouterButton>
  </ListItem>
);

export const isSelected = (active: string, target: string = '') => active === `/${target}`;

export const DemoNavDrawerBase = ({ toggleMenu, classes, navOpen, components, active }: IDemoNavDrawerProps) => (
  <Drawer
    className={classes.menuDrawer}
    variant="persistent"
    anchor="left"
    open={navOpen}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <div className={classes.drawerHeaderLeft}>
      <IconButton onClick={toggleMenu}><ChevronLeftIcon /></IconButton>
    </div>
    <Divider />
    <List className={classes.noPadding}>
      <LinkListItem name="README" to="/" key={name} selected={isSelected(active)}/>
      {getComponentNames(components).map(name => <LinkListItem key={name} name={name} to={name} selected={isSelected(active, name)}/>)}
    </List>
  </Drawer>
);

export const DemoNavDrawer = withStyles(styles)(DemoNavDrawerBase);
