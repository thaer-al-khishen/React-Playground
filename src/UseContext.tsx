import React, { createContext, useContext, useState, ReactNode } from 'react';

export {}

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const ThemedButton: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme}>
            Current Theme: {theme}
        </button>
    );
};

//Equivalent in compose:
// Create a CompositionLocal for theme data
// val LocalThemeData = compositionLocalOf { ThemeData(light = true) }
//
// // Theme data holder
// data class ThemeData(var light: Boolean)
//
// // ThemeProvider equivalent in Compose
// @Composable
// fun ThemeProvider(content: @Composable () -> Unit) {
//     val themeData = remember { ThemeData(light = true) }
//     CompositionLocalProvider(LocalThemeData provides themeData) {
//         content()
//     }
// }
//
// // ThemedButton equivalent in Compose
// @Composable
// fun ThemedButton() {
//     val themeData = LocalThemeData.current
//     Button(onClick = { themeData.light = !themeData.light }) {
//         Text(if (themeData.light) "Light Theme" else "Dark Theme")
//     }
// }
//
// // App composable
// @Composable
// fun App() {
//     ThemeProvider {
//         ThemedButton()
//     }
// }
