/* globals module, require */
'use strict';

var typescript = require('broccoli-typescript-compiler').typescript;
var Rollup = require('broccoli-rollup');
var MergeTrees = require('broccoli-merge-trees');
var replace = require('broccoli-string-replace');

module.exports = function() {
  const es6Tree = typescript('src', {
    tsconfig: {
      compilerOptions: {
        "noImplicitAny": true,
        "declaration": true,
        "isolatedModules": false,
        "module": "es2015",
        "target": "es2015",
        "outDir": "es6",
        "sourceMap": true,
        "moduleResolution": "node"
      },
      filesGlob: [
        "**/*.ts"
      ]
    }
  });

  const umdTree = replace(new Rollup(es6Tree, {
    annotation: 'umdTree',
    rollup: {
      input: 'index.js',
      external: ['tiny-rockets'],
      output: [{
        file: 'tiny-rockets.js',
        format: 'umd',
        exports: 'named',
        sourcemap: true,
        name: 'umd'
      }]
    }
  }), {
      input: [ 'tiny-rockets.js' ],
      pattern: {
        match: /undefined.__extends/g,
        replacement: 'false'
      }
  });

  return new MergeTrees([es6Tree, umdTree], {
    annotation: 'dist'
  });
};