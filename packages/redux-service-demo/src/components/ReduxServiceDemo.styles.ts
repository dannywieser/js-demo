import { createMuiTheme } from '@material-ui/core/styles';

export const defaultFont = 'Roboto Mono';

export const demoTheme = createMuiTheme({
  typography: {
    fontFamily: defaultFont,
    useNextVariants: true,
  },
});

export const styles = (theme: any) => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  dispatchButton: {
    marginTop: theme.spacing.unit,
  },
  stateMonitor: {
    backgroundColor: '#303030',
    color: '#ffb86c',
    padding: theme.spacing.unit * 2,
  },
  stateBody: {
    fontFamily: defaultFont,
  },
});
