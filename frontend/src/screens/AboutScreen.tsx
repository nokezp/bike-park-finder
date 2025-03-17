import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MainHeader } from '../components';
import { colors, typography, spacing, getShadow } from '../utils/theme';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <MainHeader currentScreen="About" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>About Bike Park Finder</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.paragraph}>
              Bike Park Finder was created by mountain biking enthusiasts who were tired of 
              struggling to find comprehensive information about bike parks. Our mission is 
              to connect riders with the best mountain biking destinations around the world, 
              providing accurate, up-to-date information to help you plan your next riding adventure.
            </Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544191696-102152079ed6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
              style={styles.image} 
              resizeMode="cover"
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What We Offer</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Comprehensive Park Database</Text>
                <Text style={styles.featureDescription}>
                  Detailed information on bike parks including trail maps, difficulty ratings, 
                  amenities, and operating hours.
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Community Reviews</Text>
                <Text style={styles.featureDescription}>
                  Real feedback from riders who have visited each park, helping you 
                  make informed decisions about where to ride.
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Event Calendar</Text>
                <Text style={styles.featureDescription}>
                  Stay updated on competitions, festivals, and group rides happening 
                  at bike parks near you.
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureTitle}>Check-in & Track</Text>
                <Text style={styles.featureDescription}>
                  Record your visits, track your favorite trails, and share your 
                  experiences with the community.
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Team</Text>
            <Text style={styles.paragraph}>
              We're a small team of developers and designers who are passionate about 
              mountain biking. We're constantly working to improve Bike Park Finder 
              and add new features based on community feedback.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <Text style={styles.paragraph}>
              Have suggestions or feedback? We'd love to hear from you! Visit our Contact 
              page to get in touch with our team.
            </Text>
          </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.accent,
    fontSize: typography.fontSizes.xl,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  imageContainer: {
    marginVertical: spacing.lg,
    borderRadius: 8,
    overflow: 'hidden',
    ...getShadow('medium'),
  },
  image: {
    width: '100%',
    height: 200,
  },
  featureList: {
    marginTop: spacing.sm,
  },
  featureItem: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...getShadow('small'),
  },
  featureTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});

export default AboutScreen; 