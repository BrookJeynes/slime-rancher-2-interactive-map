/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                beigelight: "#EFE7D4",
                beigedark: "#D2B394",
                red: "#FF5959",
                mapcolor: "#005F84",
                sr1color: "#2FB0D7"
            },
        },
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
