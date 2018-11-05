const menuDrawerWidth = 240;
const sourceDrawerWidth = 340;

const viewSourceColor = {
  backgroundColor: '#303030',
  color: '#ffb86c',
};

const drawerTransition = (theme: any) => {
  return theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });
};

const drawerHeader = (theme: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  ...theme.mixins.toolbar,
})

export const styles = (theme: any) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${menuDrawerWidth}px)`,
    marginLeft: menuDrawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  menuDrawer: {
    width: menuDrawerWidth,
    flexShrink: 0,
  },
  noPadding: {
    padding: 0,
  },
  drawerPaper: {
    width: menuDrawerWidth,
  },
  drawerHeaderLeft: {
    ...drawerHeader(theme),
    justifyContent: 'flex-end',
  },
  drawerHeader: {
    ...drawerHeader(theme),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -menuDrawerWidth,
    marginRight: -sourceDrawerWidth,
  },
  contentShiftMenu: {
    transition: drawerTransition(theme),
    marginLeft: 0,
    marginRight: -sourceDrawerWidth,
  },
  contentShiftSource: {
    transition: drawerTransition(theme),
    marginLeft: -menuDrawerWidth,
    marginRight: 0,
  },
  contentShiftBoth: {
    transition: drawerTransition(theme),
    marginLeft: 0,
    marginRight: 0,
  },
  sourceDrawer: {
    width: sourceDrawerWidth,
    flexShrink: 0,
  },
  drawerSource: {
    width: sourceDrawerWidth,
  },
  demoSourceContainer: {
    ...viewSourceColor,
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  demoSource: {
    ...viewSourceColor,
    width: '100%',
    height: '100%',
    border: 0,
    outline: 'none',
    padding: 0,
  },
  grow: {
    flexGrow: 1,
  },
  markdown: {
    fontFamily: theme.typography.fontFamily,
  }
});
