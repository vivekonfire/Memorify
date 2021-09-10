module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                background: "#eeefef",
                navbar: "#4BAFE8",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
