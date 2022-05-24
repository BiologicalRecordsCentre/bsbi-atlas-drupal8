// Based on example: https://github.com/rollup/rollup-starter-lib
//import { eslint } from "rollup-plugin-eslint";
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from "rollup-plugin-terser"
import pkg from './package.json'
import css from 'rollup-plugin-css-only'

export default [
  // Get rollup to make a single CSS file 
  {
    input: './js/css.js',
		plugins: [
      css({ output: pkg.browser_css })
		]
  },
  // Browser-friendly UMD build
  {
    external: ['d3', 'brcatlas', 'brccharts', 'lightgallery'],
		input: 'index.js',
		output: {
      globals: {
        'd3': 'd3',
        'brcatlas': 'brcatlas',
        'brccharts': 'brccharts',
        'lightgallery': 'lightgallery'
      },
			name: 'bsbi-atlas',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      json(), // required to import package into index.js
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
		]
  },
  // Minified browser-friendly UMD build
  {
    external: ['d3', 'brcatlas', 'brccharts', 'lightgallery'],
		input: 'index.js',
		output: {
      globals: {
        'd3': 'd3',
        'brcatlas': 'brcatlas',
        'brccharts': 'brccharts',
        'lightgallery': 'lightgallery'
      },
			name: 'bsbi-atlas',
			file: pkg.browser_min,
			format: 'umd',
      sourcemap: true
		},
		plugins: [
			resolve(), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      json(), // required to import package into index.js
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
		]
  }
]