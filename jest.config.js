module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Handle TypeScript files
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // Transform ES modules like axios
    ],
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js', // Mock assets
    },
  };
  