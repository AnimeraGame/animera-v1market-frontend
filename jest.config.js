module.exports = {
  setupFilesAfterEnv: ['./jest/jest.setup.js'],
  setupFiles: ['./jest/setEnvVars.js'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pageComponents(.*)$': '<rootDir>/src/pageComponents$1',
    '^containers(.*)$': '<rootDir>/src/containers$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^lib(.*)$': '<rootDir>/src/lib$1',
    '^state(.*)$': '<rootDir>/state$1',
    '^pages(.*)$': '<rootDir>/pages$1',
  },
}
