import * as util from '../index';

test('isJsonString returns true for a valid json string', () => {
  expect(util.isJsonString('{ "foo": "bar" }')).toBe(true);
  expect(util.isJsonString('{ "boolean": true }')).toBe(true);
  expect(util.isJsonString('[ "foo", "bar" ]')).toBe(true);
});

test('isJsonString returns false for a invalid json string', () => {
  expect(util.isJsonString('foo')).toBe(false);
});

test('parseFieldValue will parse a string into a JSON object', () => {
  const aJsonString = '{ "foo": "bar" }';
  const result = util.parseFieldValue(aJsonString);
  expect(result).toEqual({ foo: 'bar' });
});

test('parseFieldValue will return a string as-is (no JSON parsing)', () => {
  const aJsonString = 'a string';
  const result = util.parseFieldValue(aJsonString);
  expect(result).toEqual('a string');
});

test('fieldValueForDisplay will convert an object into a string for display', () => {
  const anObject: any = { foo: 'bar' };
  const result = util.fieldValueForDisplay(anObject);
  expect(result).toEqual('{"foo":"bar"}');
});

test('fieldValueForDisplay will return a string as-is for display', () => {
  const aString = 'a string value';
  const result = util.fieldValueForDisplay(aString);
  expect(result).toEqual('a string value');
});
