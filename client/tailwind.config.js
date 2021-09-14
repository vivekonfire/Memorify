module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                background: "#eeefef",
                navbar: "#4BAFE8",
            },
            height: {
                100: "28rem",
                101: "32rem",
            },
            width: {
                100: "28rem",
                101: "32rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
