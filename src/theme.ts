'use client';
import { createTheme } from '@mui/material/styles';
import { Noto_Sans } from 'next/font/google';

// Extend the theme to include custom properties
declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
        error: Palette['error'];
    }

    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
        error?: PaletteOptions['error'];
    }
}

const notoSans = Noto_Sans({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#1976d2',
                },
                background: {
                    default: '#ffffff',
                    paper: '#f5f5f5',
                },
                // Custom tertiary color that will become CSS variables
                tertiary: {
                    main: '#ff6b35',
                    light: '#ff8a65',
                    dark: '#e64a19',
                    contrastText: '#ffffff',
                },
                error: {
                    main: '#b2102f',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#90caf9',
                },
                background: {
                    default: '#121212',
                    paper: '#1e1e1e',
                },
                // Custom tertiary color for dark mode
                tertiary: {
                    main: '#ff8a65',
                    light: '#ffab91',
                    dark: '#f4511e',
                    contrastText: '#000000',
                },
                error: {
                    main: '#ff1744',
                },
            },
        },
    },
    typography: {
        fontFamily: notoSans.style.fontFamily,
    },
    components: {
        // MuiCssBaseline: {
        //     styleOverrides: {},
        // },
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [
                        {
                            props: { severity: 'info' },
                            style: {
                                backgroundColor: 'var(--mui-palette-primary-main)',
                                color: 'var(--mui-palette-primary-contrastText)',
                            },
                        },
                    ],
                },
            },
        },
    },
});

export default theme;
