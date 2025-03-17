import React from 'react';
import { View, ViewProps, StyleSheet, Platform } from 'react-native';

interface PointerEventsViewProps extends ViewProps {
  pointerEventsValue?: 'auto' | 'none' | 'box-none' | 'box-only';
}

/**
 * A wrapper component that handles pointerEvents properly across platforms
 * For web, it uses style.pointerEvents
 * For native, it uses the pointerEvents prop
 */
const PointerEventsView: React.FC<PointerEventsViewProps> = ({
  pointerEventsValue = 'auto',
  style,
  children,
  ...props
}) => {
  if (Platform.OS === 'web') {
    const webStyle = StyleSheet.flatten([
      style,
      { pointerEvents: pointerEventsValue },
    ]);
    
    return (
      <View style={webStyle} {...props}>
        {children}
      </View>
    );
  }
  
  return (
    <View style={style} pointerEvents={pointerEventsValue} {...props}>
      {children}
    </View>
  );
};

export default PointerEventsView; 