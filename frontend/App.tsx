import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import { View, Text, ActivityIndicator } from 'react-native';
import { 
  Montserrat_400Regular, 
  Montserrat_500Medium, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';
import { 
  Lato_400Regular, 
  Lato_700Bold 
} from '@expo-google-fonts/lato';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { colors } from './src/utils/theme';

/**
 * Main App component
 * 
 * Note: If you encounter warnings about pointerEvents props being deprecated,
 * use the PointerEventsView component from src/components instead of using
 * the pointerEvents prop directly on View components.
 * 
 * Example:
 * import { PointerEventsView } from './src/components';
 * 
 * <PointerEventsView pointerEventsValue="none">
 *   {children}
 * </PointerEventsView>
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat': Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-Medium': Montserrat_500Medium,
    'Lato': Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
    'BebasNeue': BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
} 