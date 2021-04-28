import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Theme({ children }) {

    const primaryColor = '#e0e0e0'
    const secondaryColor = '#303030'

    const theme = createMuiTheme({
        palette: {
            primary: { main: primaryColor },
            secondary: { main: secondaryColor },
        },
        overrides: {
            MuiStepIcon: {
                root: {
                    '&$completed': {
                        color: secondaryColor,
                    },
                    '&$active': {
                        color: secondaryColor,
                    },
                },
                text: {
                    fill: primaryColor,
                }
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
