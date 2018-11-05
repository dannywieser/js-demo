import * as React from 'react';
import * as styles from './DemoPage.styles';
import autobind from 'autobind-decorator';
import { DemoPageNav } from './DemoPageNav';
import Markdown from 'markdown-to-jsx';
import { DemoPageViewSource } from './DemoPageViewSource';
import {
  IComponentModule,
  IMarkdownOpts,
  loadMarkdown,
  buildOpts,
  getComponentHref,
} from '../../utilities/';

export interface IDemoPageProps {
  components: IComponentModule;
  readme: string;
  srcFolder: string;
  title: string;
}

export interface IDemoPageState {
  markdown: string;
  sourceVisible: boolean;
  options: IMarkdownOpts;
}

export class DemoPage extends React.Component <IDemoPageProps, IDemoPageState> {
  constructor(props: any) {
    super(props);
    this.state = { markdown: '', sourceVisible: false, options: null };
  }

  async componentWillMount() {
    const { srcFolder, readme, components } = this.props;
    const activeComponent = getComponentHref();
    const src = activeComponent ? `${srcFolder}/${activeComponent}/README.md` : readme;
    const options = buildOpts(components, activeComponent);
    const markdown = await loadMarkdown(src);
    this.setState({ markdown, options });
  }

  @autobind
  handleMarkdownChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({ markdown: event.target.value });
  }

  @autobind
  toggleSource() {
    const { sourceVisible } = this.state;
    this.setState({ sourceVisible: !sourceVisible });
  }

  render() {
    const { title, components } = this.props;
    const { markdown, sourceVisible, options } = this.state;
    return (
      <div className={styles.demoWrap}>
        <h1 className={styles.componentTitle}>{title}</h1>
        <div className={styles.demoBody}>
          <DemoPageNav components={components} />
          <Markdown
            children={markdown}
            options={options}
            className={styles.demoContent}
          />
          <DemoPageViewSource
            markdown={markdown}
            onChange={this.handleMarkdownChange}
            sourceVisible={sourceVisible}
            toggleVisible={this.toggleSource}
          />
        </div>
      </div>
    );
  }
}
