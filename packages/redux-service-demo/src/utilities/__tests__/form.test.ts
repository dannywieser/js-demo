import * as formUtils from '../form';
import exampleServices from '../../__tests__/example-services';

const fieldNames = ['fieldA', 'fieldB', 'fieldC'];

test('should handle no field values', () => {
  const defaults = formUtils.getDefaultFormValues(undefined);
  expect(defaults).toEqual({});
});

test('should default all fields to blank if no parameters have been provided', () => {
  const defaults = formUtils.getDefaultFormValues(fieldNames);
  expect(defaults).toEqual({
    fieldA: '',
    fieldB: '',
    fieldC: '',
  });
});

test('should default form fields to provided parameter values', () => {
  const defaults = formUtils.getDefaultFormValues(fieldNames, { fieldB: 'bValue', fieldC: 'cValue' });
  expect(defaults).toEqual({
    fieldA: '',
    fieldB: 'bValue',
    fieldC: 'cValue',
  });
});

test('should lookup the form configuration for the active service/action', () => {
  const activeForm = formUtils.getActiveActionForm(exampleServices, 'serviceA', 'typeB');
  expect(activeForm).toEqual(['fieldC', 'fieldD']);
});

test('should handle lookup for a service/action with no form', () => {
  const activeForm = formUtils.getActiveActionForm(exampleServices, 'serviceB', 'typeF');
  expect(activeForm).toEqual([]);
});

test('should return [] if there is no active action', () => {
  const activeForm = formUtils.getActiveActionForm(exampleServices, undefined, undefined);
  expect(activeForm).toEqual([]);
});
