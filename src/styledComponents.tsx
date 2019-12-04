import React from 'react';
import baseStyled, { createGlobalStyle, ThemedStyledInterface, ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,900|Roboto');

    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-touch-callout: none; /* disable callout, image save panel (popup) */
    }
    
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    
    *,
    *::before,
    *::after {
        //box-sizing: inherit;
        box-sizing: border-box;
    }
    
    ul[class],
    ol[class] {
      padding: 0;
    }
    
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul[class],
    ol[class],
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
      margin: 0;
    }

    body {
        padding: 0;
        margin: 0;
        color: #222;
        font-family: Roboto, sans-serif;
        font-size: 1.4rem;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        //line-height: normal;
        letter-spacing: normal;
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
    }
    
    ul[class],
    ol[class] {
        list-style: none;
    }

    a:not([class]) {
        text-decoration-skip-ink: auto;
    }

    img {
        max-width: 100%;
        display: block;
    }

    article > * + * {
        margin-top: 1em;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
`;

export type Theme = {
    name: string;
    backgroundColorStart: string;
    backgroundColorStop: string;
    cardBackground: string;
    primary: string;
    secondary: string;
    fontColorLight: string;
    fontColorDark: string;
    shadow: string;
}

export const lightTheme: Theme = {
    name: 'lightTheme',
    backgroundColorStart: '#9618F7',
    backgroundColorStop: '#52A1D5',
    cardBackground: '#fff',
    primary: '#8919e0',
    secondary: '#66acdb',
    fontColorLight: '#fff',
    fontColorDark: '#707070',
    shadow: '1px 2px 4px 0 rgba(0, 0, 0, 0.16)'
};

export const darkTheme: Theme = {
    name: 'darkTheme',
    backgroundColorStart: '#9618F7',
    backgroundColorStop: '#52A1D5',
    cardBackground: '#fff',
    primary: '#fff',
    secondary: '#01c1d6',
    fontColorLight: '#222',
    fontColorDark: '#707070',
    shadow: '1px 2px 4px 0 rgba(0, 0, 0, 0.16)'
};

export const styled = baseStyled as ThemedStyledInterface<Theme>;

export const renderTheme = (component: React.ReactElement, theme = lightTheme) => render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
