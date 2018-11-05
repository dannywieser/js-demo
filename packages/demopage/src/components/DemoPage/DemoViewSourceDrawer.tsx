import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { styles } from './DemoPage.styles';

export interface IDemoViewSourceDrawerProps extends StyledComponentProps {
  editOpen: boolean;
  toggleEdit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  markdownChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  markdown: string;
}

export const DemoViewSourceDrawerBase = ({ editOpen, classes, markdown, markdownChange, toggleEdit }: IDemoViewSourceDrawerProps) => (
  <Drawer
    className={classes.sourceDrawer}
    open={editOpen}
    variant="persistent"
    anchor="right"
    classes={{ paper: classes.drawerSource }}>
    <div className={classes.drawerHeader}>
      <IconButton onClick={toggleEdit}>
        <ChevronRightIcon />
      </IconButton>
    </div>
    <Divider />
    <div className={classes.demoSourceContainer}>
      <textarea
        className={classes.demoSource}
        value={markdown}
        onChange={markdownChange}
      />
    </div>
  </Drawer>
);

export const DemoViewSourceDrawer = withStyles(styles)(DemoViewSourceDrawerBase);
