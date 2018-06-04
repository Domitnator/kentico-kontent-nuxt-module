import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

export default {
    entry: 'lib/templates/plugin.template.js',
    dest: 'lib/templates/dist/plugin.template.js',
    format: 'es',
    plugins: [
        json(),
        babel({
          presets: [ 'es2015-rollup' ],
          babelrc: false
        }),
        commonjs(),
        resolve(),
        replace({
          include: 'lib/templates/plugin.template.js',
          KENTICOOPTIONS: '<%= serialize(options) %>'
        })
      ],
    external: [
        'path',
        'fs',
        'express',
        'babel-polyfill',
        'moment',
        'kentico-cloud-delivery'
      ]
};
