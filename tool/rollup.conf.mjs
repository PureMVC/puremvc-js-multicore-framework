import terser from "@rollup/plugin-terser";

export default [
    {
        input: "index.js",
        output: [
            {
                file: "bin/puremvc-2.0.0.js",
                format: "esm"
            },
            {
                file: "bin/puremvc-2.0.0.min.js",
                format: "esm",
                plugins: [terser()]
            }
        ]
    }
];
