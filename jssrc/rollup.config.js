// Based on example: https://github.com/rollup/rollup-starter-lib
//import { eslint } from "rollup-plugin-eslint";
import nodeResolve  from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import terser from "@rollup/plugin-terser"
import css from 'rollup-plugin-css-only'

export default [
  {
    // Get rollup to make a single CSS file 
    // Can't find a way to do this without generating
    // and emtpy js file which we delete afterwards.
    input: './js/css.js',
    output: {
      file: '../css/rollup-dummy.js', // Deleted afterwards by cleanup.js script
      format: 'es',
      assetFileNames: 'bsbi-atlas.css'
    },
    plugins: [css()]
  },

  // Minified browser-friendly UMD build
  {
    external: ['d3', 'brcatlas', 'brccharts', 'lightgallery', 'taxonpicker'],
		input: 'index.js',
		output: {
      globals: {
        'd3': 'd3',
        'brcatlas': 'brcatlas',
        'brccharts': 'brccharts',
        'lightgallery': 'lightgallery',
        'taxonpicker': 'taxonpicker'
      },
			name: 'bsbi-atlas',
			file: "../js/bsbi-atlas-min.umd.js",
			format: 'umd',
      sourcemap: true
		},
		plugins: [
			nodeResolve (), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      json(), // required to import package into index.js
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
		]
  },
  // Minified browser-friendly UMD build for standaloneTaxon selector
  {
    external: ['taxonpicker'],
		input: 'index2.js',
		output: {
      globals: {
        'taxonpicker': 'taxonpicker'
      },
			name: 'bsbi-atlas-taxsel',
			file: "../js/bsbi-atlas-taxsel-min.umd.js",
			format: 'umd',
      sourcemap: true
		},
		plugins: [
			nodeResolve (), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
		]
  },
  // Minified browser-friendly UMD build for all pages (for metatags)
  {
		input: 'index3.js',
		output: {
			name: 'bsbi-atlas-gen',
			file: "../js/bsbi-atlas-gen-min.umd.js",
			format: 'umd',
      sourcemap: true
		},
		plugins: [
			nodeResolve (), // so Rollup can find node libs
      commonjs(), // so Rollup can convert CommonJS modules to an ES modules
      babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
      terser()
		]
  }
]
