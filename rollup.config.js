import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
    input: './index.ts', // ⬅️ Your entry file
    output: {
        file: 'dist/bundle.js', // ⬅️ Single bundled output
        format: 'esm', // or 'cjs' for CommonJS
        sourcemap: true,
        inlineDynamicImports: true
    },
    plugins: [
        resolve(), // Resolves node_modules
        commonjs(), // Converts CommonJS to ES6
        json(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ],
    external: [], // Optional: add externals like ['fs', 'path'] if needed
};
