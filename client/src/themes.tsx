import { createMuiTheme } from "@material-ui/core";
import { grey, deepOrange } from "@material-ui/core/colors";

export const WPTASTheme = createMuiTheme({
    palette: {
        type: 'light',
        secondary: deepOrange,
        background: {
            default: "#e4f0e2"
        }
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
        },
        h4: {
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "0.875rem",
            lineHeight: "1rem",
        },
        body1: {
            fontStyle: "normal",
            fontWeight: "lighter",
            fontSize: "1.125rem",
            lineHeight: "1.313rem",
        }
    }
})