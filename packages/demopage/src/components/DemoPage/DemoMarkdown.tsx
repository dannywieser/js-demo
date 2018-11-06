import * as React from 'react';
import classnames from 'classnames';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { styles } from './DemoPage.styles';
import Markdown from 'markdown-to-jsx';
import { IMarkdownOpts } from '../../utilities/';

export interface  IDemoMarkdownProps extends StyledComponentProps {
  markdown: string;
  options: IMarkdownOpts;
  editOpen: boolean;
  navOpen: boolean;
}

export const onlyNavOpen = (navOpen: boolean, editOpen: boolean) => navOpen && !editOpen;
export const onlyEditOpen = (navOpen: boolean, editOpen: boolean) => !navOpen && editOpen;
export const bothOpen = (navOpen: boolean, editOpen: boolean) => navOpen && editOpen;
export const getContentClassName = (classes: any, navOpen: boolean, editOpen: boolean): string => {
  return classnames(classes.content, {
    [classes.contentShiftMenu]: onlyNavOpen(navOpen, editOpen),
    [classes.contentShiftSource]: onlyEditOpen(navOpen, editOpen),
    [classes.contentShiftBoth]: bothOpen(navOpen, editOpen),
  });
};

export const DemoMarkdownBase = ({ classes, markdown, options, editOpen, navOpen }: IDemoMarkdownProps) => (
  <main className={getContentClassName(classes, navOpen, editOpen)}>
    <div className={classes.drawerHeader} />
      <Markdown
        className={classes.markdown}
        children={markdown}
        options={options}
      />
  </main>
);

export const DemoMarkdown = withStyles(styles)(DemoMarkdownBase);
