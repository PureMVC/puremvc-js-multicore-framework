import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: "bin/esm/puremvc.js",
                format: "esm",
                sourcemap: false
            },
            {
                file: "bin/esm/puremvc.min.js",
                format: "esm",
                plugins: [terser()],
                sourcemap: true
            },
            {
                file: "bin/cjs/puremvc.js",
                format: "cjs",
                sourcemap: false
            },
            {
                file: "bin/cjs/puremvc.min.js",
                format: "cjs",
                plugins: [terser()],
                sourcemap: true
            }
        ],
    }
];
