/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        minHeight: {
            "1/2": "50%",
        },
        minWidth: {
            "1/3": "33.333333%",
        },
        maxWidth: {
            "1/2": "50%",
            "1/3": "33.333333%"
        }

    },
    plugins: [],
};
