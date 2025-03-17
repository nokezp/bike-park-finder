import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MainHeader } from '../components';
import { colors, typography, spacing, getShadow } from '../utils/theme';

const EventsScreen = () => {
  // Sample events data
  const events = [
    {
      id: '1',
      title: 'Mountain Bike Festival',
      date: 'June 15-17, 2023',
      location: 'Whistler Bike Park',
      image: 'https://images.unsplash.com/photo-1594076456781-a20e9580e40c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Join us for a weekend of riding, competitions, and demos at the world-famous Whistler Bike Park.',
    },
    {
      id: '2',
      title: 'Enduro Race Series',
      date: 'July 8-9, 2023',
      location: 'Highland Mountain Bike Park',
      image: 'https://images.unsplash.com/photo-1605913293672-0cb3ba5f5d9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Test your skills in this two-day enduro race featuring technical descents and challenging climbs.',
    },
    {
      id: '3',
      title: 'Kids Bike Camp',
      date: 'August 1-5, 2023',
      location: 'Angel Fire Bike Park',
      image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'A week-long camp for young riders to improve their skills and have fun on the trails.',
    },
  ];

  return (
    <View style={styles.container}>
      <MainHeader currentScreen="Events" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Upcoming Events</Text>
          <Text style={styles.subtitle}>
            Join the mountain biking community at these exciting events
          </Text>

          <View style={styles.eventsContainer}>
            {events.map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  eventsContainer: {
    gap: spacing.lg,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    overflow: 'hidden',
    ...getShadow('medium'),
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: spacing.md,
  },
  eventTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  eventDate: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  eventLocation: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  eventDescription: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    color: colors.card,
    fontWeight: typography.fontWeights.medium,
  },
});

export default EventsScreen; 