import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius, shadows, getShadow } from '../utils/theme';
import { BikeParkCard, MainHeader } from '../components';
import { API_URL } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';
import { getAllBikeParks } from '../services/bikeParkService';

// Define types for the component
interface BikePark {
  _id: string;
  name: string;
  location: string;
  description: string;
  difficulty: string;
  features: string[];
  amenities: string[];
  images: string[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  website?: string;
  contactPhone?: string;
  contactEmail?: string;
  hours?: string;
  pricing?: string;
  createdAt: string;
  updatedAt: string;
}

// Define navigation type
type BikeParkListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList
>;

const BikeParkListScreen = () => {
  const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
  const [filteredParks, setFilteredParks] = useState<BikePark[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<BikeParkListScreenNavigationProp>();
  const { user } = useAuth();
  
  // Get route params (for native)
  const route = useRoute();
  
  useEffect(() => {
    // Parse search params from route params if on native
    if (Platform.OS !== 'web' && route.params) {
      const params = route.params as any;
      if (params.search) {
        setSearchQuery(params.search);
      }
    }
  }, [route.params]);

  useEffect(() => {
    const loadBikeParks = async () => {
      try {
        setLoading(true);
        const data = await getAllBikeParks();
        // Convert the data to our BikePark type with rating
        const parksWithRating = data.map(park => ({
          ...park,
          rating: 0 // Default rating
        })) as BikePark[];
        setBikeParks(parksWithRating);
        setFilteredParks(parksWithRating);
      } catch (err) {
        setError('Failed to load bike parks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBikeParks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredParks(bikeParks);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = bikeParks.filter(
        (park) =>
          park.name.toLowerCase().includes(lowercasedQuery) ||
          park.location.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredParks(filtered);
    }
  }, [searchQuery, bikeParks]);

  const onRefresh = () => {
    setRefreshing(true);
    getAllBikeParks()
      .then((data) => {
        // Convert the data to our BikePark type with rating
        const parksWithRating = data.map(park => ({
          ...park,
          rating: 0 // Default rating
        })) as BikePark[];
        setBikeParks(parksWithRating);
        setFilteredParks(parksWithRating);
      })
      .catch((err) => {
        setError('Failed to load bike parks');
        console.error(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const handleBikeParkPress = (parkId: string) => {
    navigation.navigate('BikeParkDetail', { parkId });
  };

  const handleMapPress = () => {
    navigation.navigate('Map');
  };

  const handleAddBikePark = () => {
    // @ts-ignore - We know this screen exists
    navigation.navigate('Admin');
  };

  const renderBikeParkItem = ({ item }: { item: BikePark }) => (
    <BikeParkCard 
      bikePark={item} 
      onPress={() => handleBikeParkPress(item._id)}
    />
  );

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={colors.text.secondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bike parks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {user?.isAdmin && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddBikePark}
        >
          <MaterialCommunityIcons
            name="plus"
            size={20}
            color={colors.card}
          />
          {Platform.OS === 'web' && (
            <Text style={styles.addButtonText}>Add Park</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="bike"
        size={50}
        color={colors.text.light}
      />
      <Text style={styles.emptyText}>
        {searchQuery.length > 0
          ? 'No bike parks match your search'
          : 'No bike parks available'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <MainHeader currentScreen="BikeParks" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading bike parks...</Text>
        </View>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.container}>
        <MainHeader currentScreen="BikeParks" />
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={50}
            color={colors.accent}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setError('');
              setLoading(true);
              getAllBikeParks()
                .then((data) => {
                  // Convert the data to our BikePark type with rating
                  const parksWithRating = data.map(park => ({
                    ...park,
                    rating: 0 // Default rating
                  })) as BikePark[];
                  setBikeParks(parksWithRating);
                  setFilteredParks(parksWithRating);
                })
                .catch((err) => {
                  setError('Failed to load bike parks');
                  console.error(err);
                })
                .finally(() => setLoading(false));
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainHeader currentScreen="BikeParks" />
      <FlatList
        data={filteredParks}
        renderItem={renderBikeParkItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
    color: colors.text.secondary,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  clearButton: {
    padding: spacing.xs,
  },
  listContainer: {
    padding: spacing.lg,
    paddingTop: 0,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: spacing.lg,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto',
  },
  headerButton: {
    marginLeft: spacing.sm,
  },
  listHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginLeft: spacing.sm,
    ...shadows.small,
  },
  addButtonText: {
    color: colors.card,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    marginLeft: spacing.xs,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    marginBottom: spacing.md,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  retryButton: {
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.card,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
});

export default BikeParkListScreen; 