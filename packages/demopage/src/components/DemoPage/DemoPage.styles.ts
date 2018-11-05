import { css } from 'emotion';

export const padding = '10px';

export const componentTitle = css({

});

export const demoWrap = css`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  h1 {
    margin: 0;
  }
`;

export const demoContent = css({
  padding,
  flex: 1,
});

export const demoBody = css({
  display: 'flex',
  flex: 1,
});

export const demoNav = css({
  order: -1,
  flex: '0 0 12em',
  borderRight: '1px solid blue',
  ul: {
    padding,
  },
  li: {
    listStyleType: 'none',
  },
});

export const demoSource = css({
  padding,
  flex: '0 0 30em',
  backgroundColor: 'white',
  color: 'green',
  textarea: {
    backgroundColor: 'white',
    color: 'green',
    width: '100%',
    height: '100%',
    resize: 'none',
    border: 0,
    outline: 'none',
    padding: 0,
  },
});

export const toggleSourceButton = css({
  float: 'right',
});
