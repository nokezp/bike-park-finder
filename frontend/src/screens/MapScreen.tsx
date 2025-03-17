import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../utils/theme';
import CustomHeader from '../components/CustomHeader';
import { RootStackParamList } from '../navigation/AppNavigator';
import { API_URL } from '../config/constants';
import MapView from './map/MapView';

type BikePark = {
  _id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  difficulty: string;
};

const MapScreen = () => {
  const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Navigation for React Navigation (for both web and native)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchBikeParks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/bikeparks`);
        setBikeParks(response.data);
      } catch (error) {
        console.error('Error fetching bike parks:', error);
        setError('Failed to load bike parks');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeParks();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return colors.difficulty.easy;
      case 'Intermediate':
        return colors.difficulty.intermediate;
      case 'Advanced':
        return colors.difficulty.advanced;
      case 'Expert':
        return colors.difficulty.expert;
      default:
        return colors.primary;
    }
  };

  const handleMarkerPress = (parkId: string) => {
    navigation.navigate('BikeParkDetail', { parkId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Map" showBackButton={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomHeader title="Map" showBackButton={true} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={60} color={colors.difficulty.expert} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  // Filter out bike parks without coordinates
  const parksWithCoordinates = bikeParks.filter(
    park => park.latitude && park.longitude
  );

  return (
    <MapView
      bikeParks={parksWithCoordinates}
      onMarkerPress={handleMarkerPress}
      getDifficultyColor={getDifficultyColor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  noDataText: {
    marginTop: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  }
  // Web-specific styles have been moved to WebMapView component
});

export default MapScreen; 