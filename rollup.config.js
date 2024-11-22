import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';

const extensions = ['.ts', '.tsx'];
const isDev = process.env.NODE_ENV === 'development';

const getPlugins = () => {
  const plugins = [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    resolve({ extensions, browser: true }),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['solid', '@babel/preset-typescript'],
      extensions,
    }),
    postcss({
      plugins: [autoprefixer(), tailwindcss()],
      extract: false,
      modules: false,
      autoModules: false,
      minimize: true,
      inject: false,
    }),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
    }),
    typescriptPaths({ preserveExtensions: true }),
    terser({
      output: { comments: false },
      compress: true,
    }),
  ];

  if (isDev) {
    plugins.push(
      serve({
        contentBase: 'dist',
        host: 'localhost',
        port: 5678,
        open: true,
        verbose: true,
      }),
      livereload({ watch: 'dist' }),
    );
  }

  return plugins;
};

const configs = [
  {
    input: './src/web.ts',
    output: {
      file: 'dist/web.js',
      format: 'es',
    },
    plugins: getPlugins(),
  },
  {
    input: './src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
    },
    external: ['solid-js', 'solid-element'],
    plugins: getPlugins(),
  },
];

export default configs;
