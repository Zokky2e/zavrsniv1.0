import React, { createContext, useContext, useEffect, useState } from "react";

export const themes = {
  dark: true,
  light: false,
};

export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: () => {},
});
export function ThemeProvider(props) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.remove("black-content");
        document.body.classList.add("white-content");
        break;
      case themes.dark:
        document.body.classList.remove("white-content");
        document.body.classList.add("black-content");
        break;
      default:
        document.body.classList.add("black-content");
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
export function useThemeValue() {
  return useContext(ThemeContext);
}
