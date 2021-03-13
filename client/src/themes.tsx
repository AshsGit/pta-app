import { createMuiTheme } from "@material-ui/core";

export const WPTASTheme = createMuiTheme({
    palette: {
        type: 'light'
    },
    typography: {
        htmlFontSize: 16,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        h1: {
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "1.625rem",
            lineHeight: "1.875rem",
        },
        h2: {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "1.375rem",
            lineHeight: "1.625rem",

        },
        h3: {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "1.125rem",
            lineHeight: "1.313rem",
        }
    }
})