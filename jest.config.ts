module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: [
    "./src"
  ],
  //testEnvironment: 'jest-environment-node',
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  //preset: "@shelf/jest-mongodb",
  verbose: true,
  testPathIgnorePatterns: ['client']
};
