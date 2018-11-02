import { createMuiTheme } from '@material-ui/core/styles';

export const fontFamily = '"Roboto Mono", "Roboto", "Helvetica", "Arial", sans-serif';

export const demoTheme = createMuiTheme({
  typography: {
    fontFamily,
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
  stateBody: { fontFamily },
});
