import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../utils/theme';
import CustomHeader from '../../components/CustomHeader';

type BikePark = {
  _id: string;
  name: string;
  location: string;
  latitude?: number;
  longitude?: number;
  difficulty: string;
};

type MapViewProps = {
  bikeParks: BikePark[];
  onMarkerPress: (parkId: string) => void;
  getDifficultyColor: (difficulty: string) => string;
};

const MapViewComponent = ({ bikeParks, onMarkerPress, getDifficultyColor }: MapViewProps) => {
  // Calculate the initial region based on available coordinates
  const initialRegion = bikeParks.length > 0
    ? {
        latitude: bikeParks[0].latitude || 0,
        longitude: bikeParks[0].longitude || 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
    : {
        latitude: 37.78825,  // Default to San Francisco if no coordinates
        longitude: -122.4324,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

  return (
    <View style={styles.container}>
      <CustomHeader title="Bike Parks Map" showBackButton={true} />
      {bikeParks.length > 0 ? (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
        >
          {bikeParks.map(park => (
            <Marker
              key={park._id}
              coordinate={{
                latitude: park.latitude || 0,
                longitude: park.longitude || 0,
              }}
              title={park.name}
              description={park.location}
              pinColor={getDifficultyColor(park.difficulty)}
              onCalloutPress={() => onMarkerPress(park._id)}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.noDataContainer}>
          <Ionicons name="map-outline" size={60} color={colors.text.light} />
          <Text style={styles.noDataText}>No bike parks with location data available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
});

export default MapViewComponent; 