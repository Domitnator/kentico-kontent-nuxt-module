import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
    input: 'lib/templates/plugin.template.js',
    output: {
      file: 'lib/templates/dist/plugin.template.js',
      format: 'esm'
    },
    plugins: [
        resolve(),
        babel({ babelrc: false }),
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
        'kentico-cloud-delivery'
      ]
};