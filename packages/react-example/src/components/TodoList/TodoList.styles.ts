import { css } from 'emotion';

export const todoList = css({
  'list-style-type': 'none',
  padding: '10px',
});

export const todo = css({
  'border-radius': '6px',
  color: 'black',
  border: '1px solid',
  padding: '12px',
  ':hover': {
    cursor: 'pointer',
  },
  margin: '2px',
  '>div': {
    'margin-bottom': '0px',
  },
  'min-height': '20px',
});

export const title = css({ 'text-align': 'center' });
export const complete = css({ 'text-decoration-line': 'line-through' });
export const incomplete = css({ color: 'blue' });

export const centered = css({
  '.ms-Spinner-circle': {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export const loading = css({
  ':hover': {
    cursor: 'default',
  },
});

export const centeredText = css({ 'text-align': 'center' });

export const right = css({
  float: 'right',
  height: '100%',
  margin: 'auto',
  padding: '0 8px 0 8px',
});

export const inline = css({
  display: 'inline-flex',
  width: '100%',
  '.ms-TextField': {
    width: '100%',
    'margin-bottom': 0,
  },
  '.ms-Spinner': {
    float: 'right',
  },
});
