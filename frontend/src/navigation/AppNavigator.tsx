import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BikeParkListScreen from '../screens/BikeParkListScreen';
import BikeParkDetailScreen from '../screens/BikeParkDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import LandingScreen from '../screens/LandingScreen';
import AdminScreen from '../screens/AdminScreen';

// Import auth context
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../utils/colors';

// Define navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  BikeParks: undefined | { search?: string };
  Profile: undefined;
  Admin: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined | { screen: keyof MainTabParamList, params?: any };
  BikeParkDetail: { parkId: string };
  Map: undefined;
  Landing: undefined;
};

// Create navigators
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Auth navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

// Main tab navigator
const MainTabNavigator = () => {
  const { user } = useAuth();
  
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap = 'bike';
          
          if (route.name === 'BikeParks') {
            iconName = focused ? 'bike' : 'bike-fast';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'shield-account' : 'shield-account-outline';
          }
          
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.dark.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <MainTab.Screen 
        name="BikeParks" 
        component={BikeParkListScreen} 
        options={{ title: 'Bike Parks' }}
      />
      <MainTab.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
      {user?.isAdmin && (
        <MainTab.Screen 
          name="Admin" 
          component={AdminScreen} 
          options={{ title: 'Admin' }}
        />
      )}
    </MainTab.Navigator>
  );
};

// App navigator
const AppNavigator = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or a loading screen
  }
  
  return (
    <RootStack.Navigator>
      {!user ? (
        <>
          <RootStack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="BikeParkDetail"
            component={BikeParkDetailScreen}
            options={({ route }) => ({
              title: 'Bike Park Details',
              headerBackTitleVisible: false,
              headerShown: false,
            })}
          />
          <RootStack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator; 