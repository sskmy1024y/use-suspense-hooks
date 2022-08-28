import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  rootDir: '../test',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: {
          type: "commonjs",
        },
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      }
    ]
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
}

export default config
