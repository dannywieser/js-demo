import * as React from 'react';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { styles } from './DemoPage.styles';
import Markdown from 'markdown-to-jsx';
import { IMarkdownOpts } from '../../utilities/';

export interface  IDemoMarkdownProps extends StyledComponentProps {
  markdown: string;
  options: IMarkdownOpts;
  layoutClass: string;
}

const DemoMarkdownBase = ({ classes, markdown, options, layoutClass }: IDemoMarkdownProps) => (
  <main className={layoutClass}>
    <div className={classes.drawerHeader} />
      <Markdown
        className={classes.markdown}
        children={markdown}
        options={options}
      />
  </main>
);

export const DemoMarkdown = withStyles(styles)(DemoMarkdownBase);
