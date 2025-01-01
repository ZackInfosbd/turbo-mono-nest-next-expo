import type { JestConfigWithTsJest } from 'ts-jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?)|(?:.pnpm/)?(expo(nent)?|@expo(nent)?([/+]).*|@expo-google-fonts([/+]).*|react-navigation|@react-navigation.*|@unimodules([/+]).*|unimodules|sentry-expo|native-base|react-native-svg|@sentry([/+])react-native))',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  roots: ['<rootDir>', '<rootDir>/components/__tests__/'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svg.tsx',
    ...pathsToModuleNameMapper(compilerOptions.paths),
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default jestConfig;
