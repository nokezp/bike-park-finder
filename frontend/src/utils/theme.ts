import { Platform } from 'react-native';

export const colors = {
  primary: '#2E7D32',
  secondary: '#5D4037',
  accent: '#FF9800',
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: {
    primary: '#1E1E1E',
    secondary: '#333333',
    light: '#777777',
  },
  difficulty: {
    easy: '#2E7D32',
    intermediate: '#4CAF50',
    advanced: '#FF9800',
    expert: '#D32F2F',
  },
  rating: '#FF9800',
  border: '#E0E0E0',
  shadow: '#000000',
  dark: {
    primary: '#1E5B24',
    secondary: '#3E2723',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
  }
};

export const typography = {
  fontFamily: {
    primary: 'Montserrat',
    secondary: 'Lato',
    accent: 'BebasNeue',
  },
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
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
  },
};

// Helper function to apply the correct shadow based on platform
export const getShadow = (size: 'small' | 'medium' | 'large') => {
  const shadow = shadows[size];
  
  if (Platform.OS === 'web') {
    return {
      boxShadow: shadow.boxShadow,
    };
  }
  
  return {
    shadowColor: shadow.shadowColor,
    shadowOffset: shadow.shadowOffset,
    shadowOpacity: shadow.shadowOpacity,
    shadowRadius: shadow.shadowRadius,
    elevation: shadow.elevation,
  };
}; 