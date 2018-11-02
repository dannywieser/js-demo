module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx,js}',
    '!src/**/*.styles.{ts}',
    '!src/config/*.{ts}',
    '!src/**/__tests__/*'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  testMatch: [
    '**/__tests__/*.test.+(ts|tsx|js)'
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
