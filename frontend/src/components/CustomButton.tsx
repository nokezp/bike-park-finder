import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, getShadow } from '../utils/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle[] = [styles.button];

    // Add variant style
    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'danger':
        buttonStyle.push(styles.dangerButton);
        break;
    }

    // Add size style
    switch (size) {
      case 'small':
        buttonStyle.push(styles.smallButton);
        break;
      case 'medium':
        buttonStyle.push(styles.mediumButton);
        break;
      case 'large':
        buttonStyle.push(styles.largeButton);
        break;
    }

    // Add disabled style
    if (disabled || loading) {
      buttonStyle.push(styles.disabledButton);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray: TextStyle[] = [styles.buttonText];

    // Add variant text style
    switch (variant) {
      case 'primary':
        textStyleArray.push(styles.primaryButtonText);
        break;
      case 'secondary':
        textStyleArray.push(styles.secondaryButtonText);
        break;
      case 'outline':
        textStyleArray.push(styles.outlineButtonText);
        break;
      case 'danger':
        textStyleArray.push(styles.dangerButtonText);
        break;
    }

    // Add size text style
    switch (size) {
      case 'small':
        textStyleArray.push(styles.smallButtonText);
        break;
      case 'medium':
        textStyleArray.push(styles.mediumButtonText);
        break;
      case 'large':
        textStyleArray.push(styles.largeButtonText);
        break;
    }

    // Add disabled text style
    if (disabled || loading) {
      textStyleArray.push(styles.disabledButtonText);
    }

    return textStyleArray;
  };

  // Map Ionicons names to MaterialCommunityIcons
  const getIconName = (iconName: string) => {
    const iconMap: {[key: string]: string} = {
      'bicycle': 'bike',
      'search': 'magnify',
      'location': 'map-marker',
      'calendar': 'calendar',
      'star': 'star',
      'filter': 'filter',
      'notifications': 'bell',
      'map': 'map',
      'add': 'plus',
      'remove': 'minus',
      'close': 'close',
      'checkmark': 'check',
      'arrow-forward': 'arrow-right',
      'arrow-back': 'arrow-left',
    };
    
    return iconMap[iconName] || iconName;
  };

  const iconSize = size === 'small' ? 16 : size === 'medium' ? 20 : 24;
  const iconColor = variant === 'outline' ? colors.primary : 
                   (variant === 'primary' || variant === 'secondary' ? colors.card : colors.card);

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'outline' ? colors.primary : colors.card} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <MaterialCommunityIcons
              name={getIconName(icon) as keyof typeof MaterialCommunityIcons.glyphMap}
              size={iconSize}
              color={iconColor}
              style={styles.leftIcon}
            />
          )}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <MaterialCommunityIcons
              name={getIconName(icon) as keyof typeof MaterialCommunityIcons.glyphMap}
              size={iconSize}
              color={iconColor}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    ...getShadow('small'),
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.difficulty.expert,
  },
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  mediumButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  largeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fontFamily.primary,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: colors.card,
  },
  secondaryButtonText: {
    color: colors.card,
  },
  outlineButtonText: {
    color: colors.primary,
  },
  dangerButtonText: {
    color: colors.card,
  },
  smallButtonText: {
    fontSize: typography.fontSizes.xs,
  },
  mediumButtonText: {
    fontSize: typography.fontSizes.sm,
  },
  largeButtonText: {
    fontSize: typography.fontSizes.md,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

export default CustomButton; 