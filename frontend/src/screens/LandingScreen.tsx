import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing, borderRadius, shadows } from '../utils/theme';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LandingScreen = () => {
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  
  // Navigation for React Navigation
  const navigation = useNavigation<LandingScreenNavigationProp>();
  const { user } = useAuth();

  const handleSearch = () => {
    // Navigate to bike parks list with search params
    navigation.navigate('Main', { 
      screen: 'BikeParks', 
      params: { search: searchName } 
    } as any);
  };

  const handleExploreParks = () => {
    navigation.navigate('Main', { 
      screen: 'BikeParks' 
    } as any);
  };

  const handleViewMap = () => {
    navigation.navigate('Map');
  };

  const handleAddBikePark = () => {
    navigation.navigate('Main', { 
      screen: 'Admin' 
    } as any);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark.primary} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logo}>
              <MaterialCommunityIcons name="bike-fast" size={36} color={colors.primary} />
              <Text style={styles.logoText}>BikeParkFinder</Text>
            </View>
            <View style={styles.headerNav}>
              <TouchableOpacity style={styles.navItem} onPress={handleExploreParks}>
                <Text style={styles.navText}>Explore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={handleViewMap}>
                <Text style={styles.navText}>Map</Text>
              </TouchableOpacity>
              {user?.isAdmin && (
                <TouchableOpacity style={styles.navItem} onPress={handleAddBikePark}>
                  <Text style={styles.navText}>Add Park</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navText}>About</Text>
              </TouchableOpacity>
              {!user ? (
                <TouchableOpacity 
                  style={[styles.navItem, styles.loginButton]}
                  onPress={() => navigation.navigate('Auth')}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[styles.navItem, styles.userButton]}
                  onPress={() => navigation.navigate('Main', { screen: 'Profile' } as any)}
                >
                  <MaterialCommunityIcons name="account-circle" size={20} color={colors.primary} />
                  <Text style={styles.userButtonText}>{user.username}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1605913293672-0cb3ba5f5e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
            style={styles.headerImage}
            resizeMode="cover"
          >
            <View style={styles.headerOverlay}>
              <Text style={styles.headerTitle}>Find Your Next Adventure</Text>
              <Text style={styles.headerSubtitle}>Discover the best mountain bike parks near you</Text>
              <View style={styles.headerButtonsContainer}>
                <CustomButton 
                  title="Explore Bike Parks" 
                  onPress={handleExploreParks}
                  variant="primary"
                  size="large"
                  icon="bicycle"
                  style={styles.headerButton}
                />
                {user?.isAdmin && (
                  <CustomButton 
                    title="Add New Bike Park" 
                    onPress={handleAddBikePark}
                    variant="secondary"
                    size="large"
                    icon="plus"
                    style={styles.headerButton}
                  />
                )}
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Find Bike Parks</Text>
          <Text style={styles.sectionSubtitle}>Search for bike parks by name, location, or opening date</Text>
          
          <View style={styles.searchForm}>
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={24} color={colors.text.light} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name"
                value={searchName}
                onChangeText={setSearchName}
                placeholderTextColor={colors.text.light}
              />
            </View>
            
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="map-marker" size={24} color={colors.text.light} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Location"
                value={searchLocation}
                onChangeText={setSearchLocation}
                placeholderTextColor={colors.text.light}
              />
            </View>
            
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="calendar" size={24} color={colors.text.light} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Date"
                value={searchDate}
                onChangeText={setSearchDate}
                placeholderTextColor={colors.text.light}
              />
            </View>
            
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <Text style={styles.sectionSubtitle}>Discover what makes our platform the best for mountain bikers</Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="map-search" size={32} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Find Nearby Parks</Text>
              <Text style={styles.featureDescription}>
                Discover mountain bike parks near your location with detailed information
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="star" size={32} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Read Reviews</Text>
              <Text style={styles.featureDescription}>
                See ratings and reviews from other riders to find the best parks
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="map-marker-path" size={32} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Trail Information</Text>
              <Text style={styles.featureDescription}>
                Get detailed trail maps, difficulty levels, and features
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIconContainer}>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={32} color={colors.primary} />
              </View>
              <Text style={styles.featureTitle}>Weather Updates</Text>
              <Text style={styles.featureDescription}>
                Check current weather conditions at bike parks before you go
              </Text>
            </View>
          </View>
        </View>

        {/* Popular Parks Section */}
        <View style={styles.popularParksSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Bike Parks</Text>
            <TouchableOpacity onPress={handleExploreParks}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Explore the highest-rated mountain bike parks</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularParksContainer}
          >
            {/* Park cards will be dynamically generated here */}
            <TouchableOpacity style={styles.parkCard} onPress={() => navigation.navigate('BikeParkDetail', { parkId: '1' })}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1594279156825-2eb4dfa9d8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} 
                style={styles.parkImage}
              />
              <View style={styles.parkCardContent}>
                <Text style={styles.parkName}>Whistler Bike Park</Text>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.text.light} />
                  <Text style={styles.parkLocation}>Whistler, Canada</Text>
                </View>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="star" size={16} color={colors.rating} />
                  <Text style={styles.parkRating}>4.9 (120 reviews)</Text>
                </View>
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>Advanced</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.parkCard} onPress={() => navigation.navigate('BikeParkDetail', { parkId: '2' })}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1604762525953-2c80447cc4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} 
                style={styles.parkImage}
              />
              <View style={styles.parkCardContent}>
                <Text style={styles.parkName}>Highland Mountain</Text>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.text.light} />
                  <Text style={styles.parkLocation}>New Hampshire, USA</Text>
                </View>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="star" size={16} color={colors.rating} />
                  <Text style={styles.parkRating}>4.7 (98 reviews)</Text>
                </View>
                <View style={[styles.difficultyBadge, styles.intermediateBadge]}>
                  <Text style={styles.difficultyText}>Intermediate</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.parkCard} onPress={() => navigation.navigate('BikeParkDetail', { parkId: '3' })}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1618623266812-f5c9c8448721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} 
                style={styles.parkImage}
              />
              <View style={styles.parkCardContent}>
                <Text style={styles.parkName}>Bike Park Wales</Text>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={colors.text.light} />
                  <Text style={styles.parkLocation}>Merthyr Tydfil, Wales</Text>
                </View>
                <View style={styles.parkInfo}>
                  <MaterialCommunityIcons name="star" size={16} color={colors.rating} />
                  <Text style={styles.parkRating}>4.8 (105 reviews)</Text>
                </View>
                <View style={[styles.difficultyBadge, styles.expertBadge]}>
                  <Text style={styles.difficultyText}>Expert</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1544191696-102152079ed6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
            style={styles.ctaBackground}
            resizeMode="cover"
          >
            <View style={styles.ctaOverlay}>
              <Text style={styles.ctaTitle}>
                {user ? `Welcome, ${user.username}!` : 'Ready to Hit the Trails?'}
              </Text>
              <Text style={styles.ctaSubtitle}>
                {user 
                  ? 'Find your next mountain biking adventure' 
                  : 'Join thousands of mountain bikers finding the best parks'}
              </Text>
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  style={styles.ctaPrimaryButton}
                  onPress={handleExploreParks}
                >
                  <Text style={styles.ctaPrimaryButtonText}>Explore Parks</Text>
                </TouchableOpacity>
                {!user ? (
                  <TouchableOpacity 
                    style={styles.ctaSecondaryButton}
                    onPress={() => navigation.navigate('Auth')}
                  >
                    <Text style={styles.ctaSecondaryButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={styles.ctaSecondaryButton}
                    onPress={() => navigation.navigate('Map')}
                  >
                    <Text style={styles.ctaSecondaryButtonText}>View Map</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerTop}>
            <View style={styles.footerColumn}>
              <View style={styles.footerLogo}>
                <MaterialCommunityIcons name="bike-fast" size={28} color={colors.primary} />
                <Text style={styles.footerLogoText}>BikeParkFinder</Text>
              </View>
              <Text style={styles.footerDescription}>
                The ultimate platform to discover mountain bike parks around the world.
              </Text>
            </View>
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Quick Links</Text>
              <TouchableOpacity><Text style={styles.footerLink}>Home</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Explore</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>Map</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.footerLink}>About Us</Text></TouchableOpacity>
            </View>
            
            {user && (
              <View style={styles.footerColumn}>
                <Text style={styles.footerColumnTitle}>My Account</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Profile' } as any)}>
                  <Text style={styles.footerLink}>Profile</Text>
                </TouchableOpacity>
                {user.isAdmin && (
                  <TouchableOpacity onPress={handleAddBikePark}>
                    <Text style={styles.footerLink}>Add Bike Park</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity>
                  <Text style={styles.footerLink}>My Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLink}>Settings</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <View style={styles.footerColumn}>
              <Text style={styles.footerColumnTitle}>Contact</Text>
              <Text style={styles.footerContactInfo}>
                <MaterialCommunityIcons name="email" size={16} color={colors.text.light} /> info@bikeparkfinder.com
              </Text>
              <Text style={styles.footerContactInfo}>
                <MaterialCommunityIcons name="phone" size={16} color={colors.text.light} /> +1 (555) 123-4567
              </Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialIcon}>
                  <MaterialCommunityIcons name="facebook" size={20} color={colors.text.light} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <MaterialCommunityIcons name="instagram" size={20} color={colors.text.light} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <MaterialCommunityIcons name="twitter" size={20} color={colors.text.light} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>© 2023 BikeParkFinder. All rights reserved.</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colors.dark.primary,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: Platform.OS === 'ios' ? spacing.xxxl : spacing.lg,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    marginLeft: spacing.xs,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    marginLeft: spacing.lg,
  },
  navText: {
    fontSize: typography.fontSizes.md,
    color: colors.card,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  loginButtonText: {
    color: colors.dark.primary,
    fontWeight: typography.fontWeights.bold,
  },
  userButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userButtonText: {
    color: colors.dark.primary,
    fontWeight: typography.fontWeights.bold,
    marginLeft: spacing.sm,
  },
  headerImage: {
    width: '100%',
    height: 500,
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  headerTitle: {
    fontSize: Platform.OS === 'web' ? 48 : typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  headerSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.card,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  headerButton: {
    marginTop: spacing.lg,
    minWidth: 200,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  searchSection: {
    padding: spacing.xl,
    backgroundColor: colors.card,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  searchForm: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: typography.fontSizes.md,
    color: colors.text.primary,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  searchButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.dark.primary,
    marginRight: spacing.sm,
  },
  featuresSection: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  featureCard: {
    width: Platform.OS === 'web' ? '22%' : '45%',
    minWidth: 200,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    margin: spacing.sm,
    ...shadows.medium,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  popularParksSection: {
    padding: spacing.xl,
    backgroundColor: colors.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  seeAllText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  popularParksContainer: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  parkCard: {
    width: 280,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginHorizontal: spacing.sm,
    ...shadows.medium,
  },
  parkImage: {
    width: '100%',
    height: 160,
  },
  parkCardContent: {
    padding: spacing.md,
  },
  parkName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  parkInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  parkLocation: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  parkRating: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  difficultyBadge: {
    backgroundColor: colors.difficulty.advanced,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
  },
  intermediateBadge: {
    backgroundColor: colors.difficulty.intermediate,
  },
  expertBadge: {
    backgroundColor: colors.difficulty.expert,
  },
  ctaSection: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  ctaBackground: {
    width: '100%',
    height: 300,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  ctaOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  ctaTitle: {
    fontSize: Platform.OS === 'web' ? 36 : typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ctaSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.card,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  ctaButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  ctaPrimaryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  ctaPrimaryButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.dark.primary,
  },
  ctaSecondaryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.card,
  },
  ctaSecondaryButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
  },
  footer: {
    backgroundColor: colors.dark.primary,
    padding: spacing.xl,
  },
  footerTop: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  footerColumn: {
    marginBottom: Platform.OS === 'web' ? 0 : spacing.lg,
    maxWidth: Platform.OS === 'web' ? 300 : '100%',
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  footerLogoText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    marginLeft: spacing.xs,
  },
  footerDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.card,
    marginTop: spacing.sm,
    opacity: 0.8,
  },
  footerColumnTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
    marginBottom: spacing.md,
  },
  footerContactInfo: {
    fontSize: typography.fontSizes.sm,
    color: colors.card,
    marginBottom: spacing.sm,
    opacity: 0.8,
  },
  footerLink: {
    fontSize: typography.fontSizes.sm,
    color: colors.card,
    marginBottom: spacing.sm,
    opacity: 0.8,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: spacing.lg,
  },
  copyright: {
    fontSize: typography.fontSizes.sm,
    color: colors.card,
    textAlign: 'center',
    opacity: 0.6,
  },
});

export default LandingScreen; 