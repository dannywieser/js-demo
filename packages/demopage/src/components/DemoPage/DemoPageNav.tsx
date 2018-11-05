import * as React from 'react';
import * as styles from './DemoPage.styles';
import { IComponentModule } from '../../utilities/markdown';

export interface IDemoPageNavProps {
  components: IComponentModule;
}

export const navListItem = (component: string) => (<li key={component}><a href={`${component}`}>{component}</a></li>);

export class DemoPageNav extends React.Component <IDemoPageNavProps> {
  render() {
    const { components } = this.props;
    const componentNames = Object.keys(components);
    return (
      <nav className={styles.demoNav}>
        <ul>
          <li key="README"><a href="/">README</a></li>
          {componentNames.map(navListItem)}
        </ul>
      </nav>
    );
  }
}
