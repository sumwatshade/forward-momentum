module.exports = {
  rootDir: '.',
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'svelte'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/.jest/setup-match-media.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/*.svelte',
    // These components deserve good integration tests, not unit tests
    '!src/components/Nav.svelte',
    '!src/components/Modal.svelte',
    '!src/components/DistrictForm.svelte',
  ],
};
