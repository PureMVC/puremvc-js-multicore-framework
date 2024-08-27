import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: "bin/esm/index.js",
                format: "esm",
                sourcemap: false
            },
            {
                file: "bin/esm/index.min.js",
                format: "esm",
                plugins: [terser()],
                sourcemap: true
            },
            {
                file: "bin/cjs/index.cjs",
                format: "cjs",
                sourcemap: false
            },
            {
                file: "bin/cjs/index.min.cjs",
                format: "cjs",
                plugins: [terser()],
                sourcemap: true
            }
        ],
    }
];
