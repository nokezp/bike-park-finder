import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainTabNavigationProp = NativeStackNavigationProp<MainTabParamList>;
export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<MainTabParamList, T>;
export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>; 