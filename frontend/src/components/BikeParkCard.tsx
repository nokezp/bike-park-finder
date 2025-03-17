import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, getShadow } from '../utils/theme';

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

interface BikeParkCardProps {
  bikePark: BikePark;
  onPress: () => void;
}

const BikeParkCard: React.FC<BikeParkCardProps> = ({ bikePark, onPress }) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
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

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[
        styles.parkCard,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <View style={styles.parkImageContainer}>
          {bikePark.imageUrl ? (
            <Image source={{ uri: bikePark.imageUrl }} style={styles.parkImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="bicycle" size={40} color="#ccc" />
            </View>
          )}
        </View>
        <View style={styles.parkInfo}>
          <Text style={styles.parkName}>{bikePark.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.parkLocation}>{bikePark.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {renderRatingStars(bikePark.rating)}
            <Text style={styles.ratingText}> ({bikePark.rating !== undefined ? bikePark.rating.toFixed(1) : '0.0'})</Text>
          </View>
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyLabel}>Difficulty:</Text>
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
          <View style={styles.featuresContainer}>
            {bikePark.features && bikePark.features.length > 0 ? (
              <>
                {bikePark.features.slice(0, 3).map((feature, index) => (
                  <Text key={index} style={styles.featureBadge}>
                    {feature}
                  </Text>
                ))}
                {bikePark.features.length > 3 && (
                  <Text style={styles.moreFeatures}>+{bikePark.features.length - 3}</Text>
                )}
              </>
            ) : (
              <Text style={styles.noFeatures}>No features listed</Text>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parkCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    ...getShadow('medium'),
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  parkImageContainer: {
    width: 120,
    height: 160,
  },
  parkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  parkName: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fontFamily.accent,
    marginBottom: spacing.xs,
    color: colors.secondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  parkLocation: {
    fontSize: typography.fontSizes.sm,
    fontFamily: typography.fontFamily.secondary,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ratingText: {
    fontSize: typography.fontSizes.sm,
    fontFamily: typography.fontFamily.secondary,
    color: colors.text.secondary,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  difficultyLabel: {
    fontSize: typography.fontSizes.sm,
    fontFamily: typography.fontFamily.secondary,
    color: colors.text.secondary,
    marginRight: spacing.xs,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    fontSize: typography.fontSizes.xs,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    backgroundColor: colors.text.light,
  },
  easyBadge: {
    backgroundColor: colors.difficulty.easy,
  },
  intermediateBadge: {
    backgroundColor: colors.difficulty.intermediate,
  },
  advancedBadge: {
    backgroundColor: colors.difficulty.advanced,
  },
  expertBadge: {
    backgroundColor: colors.difficulty.expert,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureBadge: {
    backgroundColor: colors.accent + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
    fontSize: typography.fontSizes.xs,
    fontFamily: typography.fontFamily.primary,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    color: colors.secondary,
  },
  moreFeatures: {
    fontSize: typography.fontSizes.xs,
    fontFamily: typography.fontFamily.primary,
    color: colors.accent,
    marginLeft: spacing.xs,
  },
  noFeatures: {
    fontSize: typography.fontSizes.xs,
    fontFamily: typography.fontFamily.secondary,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
});

export default BikeParkCard; 