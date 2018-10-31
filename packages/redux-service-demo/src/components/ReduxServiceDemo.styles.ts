import { css } from 'emotion';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme();

export const actionForm = css({
  padding: theme.spacing.unit * 2,
  button: {
    marginTop: theme.spacing.unit,
  }
});

export const state = css({
  backgroundColor: '#303030',
  color: '#ffb86c',
  padding: theme.spacing.unit * 2,
})
