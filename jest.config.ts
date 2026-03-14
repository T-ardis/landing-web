import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^next/font/google$': '<rootDir>/src/__mocks__/next-font-google.ts',
    '\\.css$': '<rootDir>/src/__mocks__/style-mock.ts',
  },
};

export default config;
