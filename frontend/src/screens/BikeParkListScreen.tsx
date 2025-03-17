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
import { colors, typography, spacing, borderRadius, shadows } from '../utils/theme';
import BikeParkCard from '../components/BikeParkCard';
import CustomHeader from '../components/CustomHeader';
import { API_URL } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';

// Define types
type BikePark = {
  _id: string;
  name: string;
  location: string;
  description: string;
  difficulty: string;
  imageUrl?: string;
  rating: number;
  features: string[];
};

type BikeParkListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const BikeParkListScreen = () => {
  const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
  const [filteredParks, setFilteredParks] = useState<BikePark[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const fetchBikeParks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/bikeparks`);
      setBikeParks(response.data);
      setFilteredParks(response.data);
    } catch (error) {
      console.error('Error fetching bike parks:', error);
      Alert.alert('Error', 'Failed to load bike parks. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBikeParks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredParks(bikeParks);
    } else {
      const filtered = bikeParks.filter(
        park => 
          (park.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
          (park.location?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
          (park.features && Array.isArray(park.features) && park.features.some(feature => 
            feature?.toLowerCase().includes(searchQuery.toLowerCase())
          ) || false)
      );
      setFilteredParks(filtered);
    }
  }, [searchQuery, bikeParks]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBikeParks();
  };

  const handleBikeParkPress = (parkId: string) => {
    navigation.navigate('BikeParkDetail', { parkId });
  };

  const handleMapPress = () => {
    navigation.navigate('Map');
  };

  const handleAddBikePark = () => {
    navigation.navigate('Main', { screen: 'Admin' });
  };

  const renderBikeParkItem = ({ item }: { item: BikePark }) => (
    <BikeParkCard 
      bikePark={item} 
      onPress={() => handleBikeParkPress(item._id)}
    />
  );

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Bike Parks" 
        rightComponent={
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={handleMapPress} style={styles.headerButton}>
              <Ionicons name="map-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
            {user?.isAdmin && (
              <TouchableOpacity onPress={handleAddBikePark} style={styles.headerButton}>
                <MaterialCommunityIcons name="plus-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        }
      />
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bike parks..."
          placeholderTextColor={colors.text.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading bike parks...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredParks}
          renderItem={renderBikeParkItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="bicycle" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                {searchQuery.length > 0
                  ? 'No bike parks match your search'
                  : 'No bike parks available'}
              </Text>
            </View>
          }
        />
      )}
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
});

export default BikeParkListScreen; 