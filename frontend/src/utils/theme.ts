export const colors = {
  primary: '#2ECC71',
  secondary: '#27AE60',
  accent: '#F1C40F',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: {
    primary: '#1E1E1E',
    secondary: '#333333',
    light: '#777777',
  },
  difficulty: {
    easy: '#2ECC71',
    intermediate: '#3498DB',
    advanced: '#F39C12',
    expert: '#E74C3C',
  },
  rating: '#F1C40F',
  border: '#E0E0E0',
  shadow: '#000000',
  dark: {
    primary: '#1E1E1E',
    secondary: '#2C3E50',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
  }
};

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: 'normal' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: 'bold' as const,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
}; 