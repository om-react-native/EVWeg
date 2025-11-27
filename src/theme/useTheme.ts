import { useThemeContext } from './ThemeContext';
import { Theme } from './index';

export const useTheme = (): Theme => {
  const { theme } = useThemeContext();
  return theme;
};

export { useThemeContext };

