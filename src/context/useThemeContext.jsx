import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

export const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => !prev);
        document.body.classList.toggle("dark");
    }, [theme]);

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export default ThemeContextProvider;

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("Context must be used within a context provider");
    }
    return context;
};
