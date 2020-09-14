import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
    color: {
        primary: "rgb(230, 111, 15)",
        primaryPress: "#C25738"
    }
}

export const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// export default Theme;