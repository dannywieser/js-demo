import { configure, config } from '../config';

test('correctly updates the application config', () => {
  configure({
    useLogger: false,
    title: 'a test',
  });
  expect(config.useLogger).toBe(false);
  expect(config.title).toBe('a test');

  configure({
    useLogger: true,
    title: 'another test',
  });
  expect(config.useLogger).toBe(true);
  expect(config.title).toBe('another test');
});
