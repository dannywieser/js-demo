module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx,js}',
    '!src/**/*.styles.{ts}',
    '!src/config/*.{ts}'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  testMatch: [
    '**/__tests__/*.+(ts|tsx|js)'
  ],
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.json'
    }
  },
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest'
  },
  resetMocks: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    'dist',
    'typings'
  ],
  setupFiles: [ '<rootDir>/test.setup.ts' ]
}
