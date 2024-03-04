import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/index.js",
        output: [
            {
                file: "bin/puremvc.js",
                format: "esm",
            },
            {
                file: "bin/puremvc.min.js",
                format: "esm",
                plugins: [terser()]
            },
        ],
    }
];