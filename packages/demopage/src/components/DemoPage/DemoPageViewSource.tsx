import * as React from 'react';
import * as styles from './DemoPage.styles';

export interface IDemoPageViewSourceProps {
  markdown: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sourceVisible: boolean;
  toggleVisible: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class DemoPageViewSource extends React.Component <IDemoPageViewSourceProps> {
  render() {
    const { sourceVisible, markdown, onChange, toggleVisible } = this.props;
    const title = sourceVisible ? 'hide source' : 'view source';
    const style = sourceVisible ? styles.demoSource : '';
    return (
      <div className={style}>
        <button
          onClick={toggleVisible}
          className={styles.toggleSourceButton}>
          {title}
        </button>
        {sourceVisible ? (<textarea value={markdown} onChange={onChange}></textarea>) : null}
      </div>
    );
  }
}
