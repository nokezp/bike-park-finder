import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
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

const MapView = ({ bikeParks, onMarkerPress, getDifficultyColor }: MapViewProps) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Bike Parks Map" showBackButton={true} />
      <View style={styles.webMapContainer}>
        <Text style={styles.webMapText}>
          Interactive map is only available in the mobile app.
        </Text>
        <Text style={styles.webMapSubText}>
          Please use the list view to explore bike parks.
        </Text>
        {bikeParks.length > 0 ? (
          <ScrollView style={styles.parksList}>
            <Text style={styles.parksListTitle}>Available Bike Parks:</Text>
            {bikeParks.map(park => (
              <TouchableOpacity 
                key={park._id} 
                style={[
                  styles.parkItem,
                  { borderLeftColor: getDifficultyColor(park.difficulty) }
                ]}
                onPress={() => onMarkerPress(park._id)}
              >
                <Text style={styles.parkName}>{park.name}</Text>
                <Text style={styles.parkLocation}>{park.location}</Text>
                <Text style={styles.parkDifficulty}>Difficulty: {park.difficulty}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noDataContainer}>
            <Ionicons name="map-outline" size={60} color={colors.text.light} />
            <Text style={styles.noDataText}>No bike parks with location data available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webMapContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  webMapText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  webMapSubText: {
    marginTop: spacing.sm,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  parksList: {
    width: '100%',
    maxWidth: 600,
    marginTop: spacing.lg,
    alignSelf: 'center',
  },
  parksListTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  parkItem: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  parkName: {
    fontSize: typography.fontSizes.md,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  parkLocation: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  parkDifficulty: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
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

export default MapView; 