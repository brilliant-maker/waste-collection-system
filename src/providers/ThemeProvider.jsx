import useCXTheme from "../hooks/useCXTheme.js";
import ThemeContext from "../contexts/ThemeContext.js";

export default function ThemeProvider({ children }) {
  const theme = useCXTheme();
  
  return (
    <ThemeContext.Provider
      value={theme}
    >
      {children}
    </ThemeContext.Provider>
  );
};
