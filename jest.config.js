const config = {
  verbose: true,
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
  testMatch: ['**/packages/evershop/src/**/tests/unit/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.evershop/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/core/node_modules/'
  ],
  moduleNameMapper: {
      '^axios$': require.resolve('axios')
    }
}

module.exports = config;
// Update dependencies at 2024-10-17 09:44:06
// Improve documentation at 2024-11-05 17:41:43
// Tweak ESLint settings at 2024-11-25 16:02:57
