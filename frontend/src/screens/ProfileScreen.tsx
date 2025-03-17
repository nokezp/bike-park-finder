import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MainHeader } from '../components';
import { colors, typography, spacing, getShadow } from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      // Navigation will be handled by the AuthContext
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <MainHeader currentScreen="Profile" />
        <View style={styles.notLoggedInContainer}>
          <MaterialCommunityIcons
            name="account-off"
            size={60}
            color={colors.text.light}
          />
          <Text style={styles.notLoggedInText}>
            You need to be logged in to view your profile
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Auth' as never)}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainHeader currentScreen="Profile" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user.profileImageUrl ? (
                <Image source={{ uri: user.profileImageUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {(user.username || user.email).charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.username || user.email}</Text>
              <Text style={styles.userRole}>
                {user.isAdmin ? 'Administrator' : 'User'}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{user.username || 'Not set'}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.infoLabel}>Joined:</Text>
              <Text style={styles.infoValue}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <View style={styles.activityStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Check-ins</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Photos</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Actions</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                // @ts-ignore - We know this screen exists
                navigation.navigate('EditProfile');
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={20}
                color={colors.card}
              />
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            {user.isAdmin && (
              <TouchableOpacity
                style={[styles.actionButton, styles.adminButton]}
                onPress={() => {
                  // @ts-ignore - We know this screen exists
                  navigation.navigate('Admin');
                }}
              >
                <MaterialCommunityIcons
                  name="shield-account"
                  size={20}
                  color={colors.card}
                />
                <Text style={styles.actionButtonText}>Admin Dashboard</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.actionButton, styles.logoutButton]}
              onPress={handleLogout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.card} />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color={colors.card}
                  />
                  <Text style={styles.actionButtonText}>Log Out</Text>
                </>
              )}
            </TouchableOpacity>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    ...getShadow('medium'),
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.card,
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  username: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  userRole: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...getShadow('small'),
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
    width: 80,
  },
  infoValue: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    flex: 1,
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    ...getShadow('small'),
  },
  adminButton: {
    backgroundColor: colors.secondary,
  },
  logoutButton: {
    backgroundColor: colors.accent,
  },
  actionButtonText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.card,
    marginLeft: spacing.xs,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  notLoggedInText: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    ...getShadow('small'),
  },
  loginButtonText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    color: colors.card,
  },
});

export default ProfileScreen; 