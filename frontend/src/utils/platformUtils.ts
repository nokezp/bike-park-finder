import { Platform } from 'react-native';

/**
 * Returns the appropriate pointerEvents property based on the platform
 * For web, it returns a style object with pointerEvents
 * For native, it returns a pointerEvents prop
 * 
 * @param value The pointerEvents value ('auto', 'none', 'box-none', 'box-only')
 * @returns An object with the appropriate pointerEvents property
 */
export const getPointerEventsProps = (value: 'auto' | 'none' | 'box-none' | 'box-only') => {
  if (Platform.OS === 'web') {
    return {
      style: { pointerEvents: value },
    };
  }
  
  return {
    pointerEvents: value,
  };
}; 