export default {
  serviceA: {
    reducer: (): any => null,
    types: {
      typeA: 'typeA',
      typeB: 'typeB',
    },
    actions: {
      typeA: jest.fn(),
      typeB: jest.fn(),
    },
    forms: {
      typeA: ['fieldA', 'fieldB'],
      typeB: ['fieldC', 'fieldD'],
    },
  },
  serviceB: {
    reducer: (): any => null,
    types: {
      typeD: 'typeD',
      typeE: 'typeE',
      typeF: 'typeF',
    },
    actions: {
      typeD: (): any => null,
      typeE: (): any => null,
      typeF: (): any => null,
    },
    forms: {
      typeD: ['fieldG', 'fieldH'],
      typeE: ['fieldI', 'fieldJ'],
    },
  },
};
