//theme for the app, including light/dark mode and accessibility options. It also persists user preferences using AsyncStorage.
//from settings page- might change the name to avoid confusion
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, accessibleTheme, protanopiaTheme, deuteranopiaTheme, tritanopiaTheme } from '../themes/color';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [isAccessible, setIsAccessible] = useState(false);
  const [fontScale, setFontScale] = useState(1.0); 
  const [colorCorrection, setColorCorrection] = useState('none');


  // might change the load storage logic
  useEffect(() => {
    const loadSettings = async () => {
      const values = await AsyncStorage.multiGet([
        '@dark_mode',
        '@accessible',
        '@font_scale',
        '@color_correction',
    ]);
      if (values[0][1] !== null) setIsDarkMode(values[0][1] === 'true');
      if (values[1][1] !== null) setIsAccessible(values[1][1] === 'true');
      if (values[2][1] !== null) setFontScale(parseFloat(values[2][1]));
      if (values[3][1] !== null) setColorCorrection(values[3][1]);

    };
    loadSettings();
  }, []);


  const toggleDarkMode = (val) => {
    setIsDarkMode(val);
    AsyncStorage.setItem('@dark_mode', val.toString());
  };

  const toggleAccessibility = (val) => {
    setIsAccessible(val);
    AsyncStorage.setItem('@accessible', val.toString());
  };

  const updateFontScale = (val) => {
    setFontScale(val);
    AsyncStorage.setItem('@font_scale', val.toString());
  };

  const updateColorCorrection = (val) => {
    setColorCorrection(val);
    AsyncStorage.setItem('@color_correction', val);
  };

  const getTheme = () => {
    if (colorCorrection === 'protanopia')   return protanopiaTheme;
    if (colorCorrection === 'deuteranopia') return deuteranopiaTheme;
    if (colorCorrection === 'tritanopia')   return tritanopiaTheme;
    if (isAccessible)                       return accessibleTheme;
    return isDarkMode ? darkTheme : lightTheme;
  };
  
  const theme = getTheme();

  return (
    <ThemeContext.Provider value={{ 
      theme, isDarkMode, isAccessible, fontScale, 
      toggleDarkMode, toggleAccessibility, updateFontScale, updateColorCorrection, colorCorrection
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);