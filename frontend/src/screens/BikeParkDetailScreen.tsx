import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { colors, typography, spacing, borderRadius, shadows } from '../utils/theme';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { API_URL } from '../config/constants';

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
  latitude?: number;
  longitude?: number;
  website?: string;
  phoneNumber?: string;
  hours?: string;
  priceRange?: string;
};

type Review = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profileImageUrl?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

type RouteParams = {
  BikeParkDetail: {
    parkId: string;
  };
};

const BikeParkDetailScreen = () => {
  const [bikePark, setBikePark] = useState<BikePark | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const route = useRoute<RouteProp<RouteParams, 'BikeParkDetail'>>();
  const navigation = useNavigation();
  const parkId = route.params?.parkId;

  useEffect(() => {
    const fetchBikeParkDetails = async () => {
      try {
        setLoading(true);
        const parkResponse = await axios.get(`${API_URL}/bikeparks/${parkId}`);
        setBikePark(parkResponse.data);

        const reviewsResponse = await axios.get(`${API_URL}/reviews/bikepark/${parkId}`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching bike park details:', error);
        setError('Failed to load bike park details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeParkDetails();
  }, [parkId]);

  const openMaps = () => {
    if (bikePark?.latitude && bikePark?.longitude) {
      const url = `https://maps.apple.com/?ll=${bikePark.latitude},${bikePark.longitude}&q=${encodeURIComponent(bikePark.name)}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Could not open maps application');
      });
    } else {
      Alert.alert('Error', 'Location coordinates not available');
    }
  };

  const openWebsite = () => {
    if (bikePark?.website) {
      Linking.openURL(bikePark.website).catch(() => {
        Alert.alert('Error', 'Could not open website');
      });
    }
  };

  const callPhoneNumber = () => {
    if (bikePark?.phoneNumber) {
      Linking.openURL(`tel:${bikePark.phoneNumber}`).catch(() => {
        Alert.alert('Error', 'Could not open phone app');
      });
    }
  };

  const handleGetDirections = () => {
    if (bikePark.latitude && bikePark.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${bikePark.latitude},${bikePark.longitude}`;
      Linking.openURL(url).catch(err => 
        Alert.alert('Error', 'Could not open maps application')
      );
    } else {
      Alert.alert('No Location Data', 'Directions are not available for this bike park.');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
    Alert.alert(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      isFavorite ? `${bikePark.name} has been removed from your favorites.` : `${bikePark.name} has been added to your favorites!`
    );
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={`star-${i}`} name="star" size={16} color={colors.rating} />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Ionicons key={`star-${i}`} name="star-half" size={16} color={colors.rating} />
        );
      } else {
        stars.push(
          <Ionicons key={`star-${i}`} name="star-outline" size={16} color={colors.rating} />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading bike park details...</Text>
      </View>
    );
  }

  if (error || !bikePark) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#ff3b30" />
        <Text style={styles.errorText}>{error || 'Bike park not found'}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader 
        title={bikePark.name} 
        showBackButton={true}
        rightComponent={
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? colors.difficulty.expert : colors.primary} 
            />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {bikePark.imageUrl ? (
          <Image source={{ uri: bikePark.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="bicycle" size={80} color="#ccc" />
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.parkName}>{bikePark.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={18} color="#666" />
            <Text style={styles.location}>{bikePark.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {renderRatingStars(bikePark.rating)}
            <Text style={styles.ratingText}> ({bikePark.rating !== undefined ? bikePark.rating.toFixed(1) : '0.0'})</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{bikePark.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Difficulty</Text>
          <Text
            style={[
              styles.difficultyBadge,
              bikePark.difficulty === 'Easy' && styles.easyBadge,
              bikePark.difficulty === 'Intermediate' && styles.intermediateBadge,
              bikePark.difficulty === 'Advanced' && styles.advancedBadge,
              bikePark.difficulty === 'Expert' && styles.expertBadge,
            ]}
          >
            {bikePark.difficulty}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {bikePark.features && bikePark.features.length > 0 ? (
              bikePark.features.map((feature, index) => (
                <Text key={index} style={styles.featureBadge}>
                  {feature}
                </Text>
              ))
            ) : (
              <Text style={styles.noFeatures}>No features listed</Text>
            )}
          </View>
        </View>

        {(bikePark.website || bikePark.phoneNumber || (bikePark.latitude && bikePark.longitude)) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact & Location</Text>
            <View style={styles.contactContainer}>
              {bikePark.website && (
                <TouchableOpacity style={styles.contactButton} onPress={openWebsite}>
                  <Ionicons name="globe-outline" size={24} color="#007bff" />
                  <Text style={styles.contactButtonText}>Website</Text>
                </TouchableOpacity>
              )}
              {bikePark.phoneNumber && (
                <TouchableOpacity style={styles.contactButton} onPress={callPhoneNumber}>
                  <Ionicons name="call-outline" size={24} color="#4CAF50" />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
              )}
              {bikePark.latitude && bikePark.longitude && (
                <TouchableOpacity style={styles.contactButton} onPress={openMaps}>
                  <Ionicons name="map-outline" size={24} color="#FF9800" />
                  <Text style={styles.contactButtonText}>Map</Text>
                </TouchableOpacity>
              )}
            </View>
            {bikePark.hours && (
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.infoText}>{bikePark.hours}</Text>
              </View>
            )}
            {bikePark.priceRange && (
              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={18} color="#666" />
                <Text style={styles.infoText}>{bikePark.priceRange}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <TouchableOpacity
              style={styles.writeReviewButton}
              onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
            >
              <Text style={styles.writeReviewButtonText}>Write a Review</Text>
            </TouchableOpacity>
          </View>

          {reviews.length === 0 ? (
            <View style={styles.noReviewsContainer}>
              <Ionicons name="chatbubble-outline" size={40} color="#ccc" />
              <Text style={styles.noReviewsText}>No reviews yet</Text>
              <Text style={styles.noReviewsSubtext}>Be the first to review this bike park!</Text>
            </View>
          ) : (
            reviews.map((review) => (
              <View key={review._id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewUser}>
                    {review.userId.profileImageUrl ? (
                      <Image
                        source={{ uri: review.userId.profileImageUrl }}
                        style={styles.reviewUserImage}
                      />
                    ) : (
                      <View style={styles.reviewUserImagePlaceholder}>
                        <Text style={styles.reviewUserImagePlaceholderText}>
                          {review.userId.username.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.reviewUsername}>{review.userId.username}</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    {renderRatingStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.actionsContainer}>
          <CustomButton
            title="Get Directions"
            icon="navigate"
            variant="primary"
            onPress={handleGetDirections}
            style={{ flex: 1, marginRight: spacing.sm }}
          />
          <CustomButton
            title={isFavorite ? "Remove Favorite" : "Add to Favorites"}
            icon={isFavorite ? "heart" : "heart-outline"}
            variant={isFavorite ? "danger" : "secondary"}
            onPress={toggleFavorite}
            style={{ flex: 1, marginLeft: spacing.sm }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  parkName: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.xs,
    color: colors.text.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  location: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
  },
  section: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  description: {
    fontSize: typography.fontSizes.md,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#999',
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  intermediateBadge: {
    backgroundColor: '#2196F3',
  },
  advancedBadge: {
    backgroundColor: '#FF9800',
  },
  expertBadge: {
    backgroundColor: '#F44336',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    fontSize: typography.fontSizes.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  noFeatures: {
    fontSize: typography.fontSizes.md,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  contactContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  contactButtonText: {
    color: colors.card,
    marginLeft: spacing.xs,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  writeReviewButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  writeReviewButtonText: {
    color: colors.card,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
  },
  noReviewsContainer: {
    alignItems: 'center',
    padding: spacing.xxl,
  },
  noReviewsText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  noReviewsSubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  reviewCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: spacing.sm,
  },
  reviewUserImagePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  reviewUserImagePlaceholderText: {
    fontSize: typography.fontSizes.md,
    color: colors.card,
    fontWeight: typography.fontWeights.bold,
  },
  reviewUsername: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: typography.fontSizes.sm,
    lineHeight: 20,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  reviewDate: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.light,
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    ...shadows.small,
  },
  favoriteButton: {
    backgroundColor: colors.difficulty.expert,
  },
  actionButtonText: {
    color: colors.card,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    marginLeft: spacing.sm,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  parkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default BikeParkDetailScreen; 