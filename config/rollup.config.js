import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from 'rollup-plugin-dts'
import { dirname } from 'path'
import pkg from '../package.json'

const banner = `/**
 * @license ${pkg.name} v${pkg.version}
 *
 * Copyright (c) sskmy1024y
 *
 * This source code is licensed under the ${pkg.license} license found in the
 * \`license\` file in the root directory of this source tree.
 */

 `
const config = [
  {
    input: 'src/index.ts',
    preserveModules: true,
    output: [
      {
        format: 'cjs',
        dir: dirname(pkg.main),
        exports: 'named',
        banner,
        sourcemap: true,
      },
      {
        format: 'es',
        dir: dirname(pkg.module),
        exports: "named",
        banner,
        sourcemap: true,
      },
    ],
    plugins: [typescript(), peerDepsExternal()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      banner,
    },
    plugins: [dts()],
  },
]

export default config
