import * as React from 'react';
import {  withRouter, RouteComponentProps } from 'react-router-dom';
import { styles } from './DemoPage.styles';
import autobind from 'autobind-decorator';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import { DemoAppBar, DemoNavDrawer, DemoViewSourceDrawer, DemoMarkdown } from './index';
import {
  IComponentModule,
  IMarkdownOpts,
  loadMarkdown,
  buildOpts,
} from '../../utilities/';

export interface IDemoPageProps extends StyledComponentProps, Partial<RouteComponentProps> {
  components: IComponentModule;
  readme: string;
  srcFolder: string;
  title: string;
}

export interface IDemoPageState {
  markdown: string;
  editOpen: boolean;
  options: IMarkdownOpts;
  navOpen: boolean;
}

export const getActiveComponent = (pathName: string) => (pathName === '/') ? undefined : pathName;

export class DemoPageBase extends React.Component <IDemoPageProps, IDemoPageState, RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = { markdown: '', editOpen: false, options: null, navOpen: false };
  }

  private async loadMarkdownAndOpts({ srcFolder, readme, components, location }: IDemoPageProps) {
    const activeComponent = getActiveComponent(location.pathname);
    const src = activeComponent ? `${srcFolder}/${activeComponent}/README.md` : readme;
    const options = buildOpts(components);
    const markdown = await loadMarkdown(src);
    this.setState({ markdown, options });
  }

  async componentWillMount() {
    await this.loadMarkdownAndOpts(this.props);
  }

  async componentWillReceiveProps(props: IDemoPageProps) {
    this.loadMarkdownAndOpts(props);
  }

  @autobind
  handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({ markdown: event.target.value });
  }

  @autobind
  toggleEdit() {
    const { editOpen } = this.state;
    this.setState({ editOpen: !editOpen });
  }

  @autobind
  toggleMenu() {
    const { navOpen } = this.state;
    this.setState({ navOpen: !navOpen });
  }

  render() {
    const { title, components, classes, location } = this.props;
    const { markdown, editOpen, options, navOpen } = this.state;
    const active = location.pathname;

    return (
        <div className={classes.root}>
          <DemoAppBar
            title={title}
            navOpen={navOpen}
            editOpen={editOpen}
            toggleEdit={this.toggleEdit}
            toggleMenu={this.toggleMenu}
          />
          <DemoNavDrawer
            navOpen={navOpen}
            toggleMenu={this.toggleMenu}
            components={components}
            active={active}
          />
          <DemoMarkdown
            navOpen={navOpen}
            editOpen={editOpen}
            markdown={markdown}
            options={options}
          />
          <DemoViewSourceDrawer
            markdown={markdown}
            markdownChange={this.handleMarkdownChange}
            editOpen={editOpen}
            toggleEdit={this.toggleEdit}
          />
        </div>
    );
  }
}

export const DemoPage = withStyles(styles)(withRouter(DemoPageBase));
