import * as React from 'react';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { styles } from './ReduxServiceDemo.styles';

export interface IStateMonitorProps extends StyledComponentProps {
  stateString: string;
}

export const StateMonitorBase = ({ stateString, classes } : IStateMonitorProps) => (
  <Paper square className={classes.stateMonitor}>
    <pre className={classes.stateBody}>{stateString}</pre>
  </Paper>
);

export const StateMonitor = withStyles(styles)(StateMonitorBase);
