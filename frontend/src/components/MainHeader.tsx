import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, getShadow } from '../utils/theme';
import { useAuth } from '../contexts/AuthContext';
import { PointerEventsView } from './index';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = width < 768;

// Define the icon mapping
const ICON_MAPPING: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  'bike': 'bike',
  'calendar': 'calendar',
  'information': 'information',
  'email': 'email',
};

interface MainHeaderProps {
  currentScreen?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ currentScreen }) => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (screen: string) => {
    setMenuOpen(false);
    // @ts-ignore - We know these screens exist
    navigation.navigate(screen);
  };

  const renderNavLinks = () => {
    const links = [
      { name: 'Parks', screen: 'BikeParks', icon: 'bike' },
      { name: 'Events', screen: 'Events', icon: 'calendar' },
      { name: 'About', screen: 'About', icon: 'information' },
      { name: 'Contact', screen: 'Contact', icon: 'email' },
    ];

    return links.map((link) => (
      <TouchableOpacity
        key={link.name}
        style={[
          styles.navLink,
          currentScreen === link.screen && styles.activeNavLink,
        ]}
        onPress={() => handleNavigation(link.screen)}
      >
        {isMobile && (
          <MaterialCommunityIcons
            name={ICON_MAPPING[link.icon]}
            size={20}
            color={currentScreen === link.screen ? colors.primary : colors.text.secondary}
            style={styles.navIcon}
          />
        )}
        <Text
          style={[
            styles.navLinkText,
            currentScreen === link.screen && styles.activeNavLinkText,
          ]}
        >
          {link.name}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderUserSection = () => {
    if (user) {
      const username = user.username || user.email;
      const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';
      
      return (
        <TouchableOpacity
          style={styles.userSection}
          onPress={() => handleNavigation('Profile')}
        >
          <View style={styles.userInfo}>
            <Text style={styles.username}>{username}</Text>
            {!isMobile && (
              <Text style={styles.userRole}>{user.isAdmin ? 'Admin' : 'User'}</Text>
            )}
          </View>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => handleNavigation('Auth')}
      >
        <MaterialCommunityIcons
          name="login"
          size={18}
          color={colors.card}
          style={styles.signInIcon}
        />
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => handleNavigation('BikeParks')}
        >
          <MaterialCommunityIcons
            name="bike"
            size={28}
            color={colors.primary}
          />
          <Text style={styles.logoText}>Bike Park Finder</Text>
        </TouchableOpacity>

        {isWeb && !isMobile ? (
          <View style={styles.desktopNav}>
            <View style={styles.navLinks}>{renderNavLinks()}</View>
            {renderUserSection()}
          </View>
        ) : (
          <View style={styles.mobileControls}>
            {renderUserSection()}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              <MaterialCommunityIcons
                name={menuOpen ? 'close' : 'menu'}
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Mobile menu */}
      {!isWeb || isMobile ? (
        <PointerEventsView
          pointerEventsValue={menuOpen ? 'auto' : 'none'}
          style={[
            styles.mobileMenu,
            { height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 },
          ]}
        >
          <View style={styles.mobileNavLinks}>{renderNavLinks()}</View>
        </PointerEventsView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...getShadow('small'),
    zIndex: 10,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: typography.fontSizes.lg,
    fontFamily: typography.fontFamily.accent,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinks: {
    flexDirection: 'row',
    marginRight: spacing.lg,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: 4,
  },
  activeNavLink: {
    backgroundColor: colors.primary + '10', // 10% opacity
  },
  navLinkText: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  activeNavLinkText: {
    color: colors.primary,
    fontWeight: typography.fontWeights.bold,
  },
  navIcon: {
    marginRight: spacing.xs,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  userInfo: {
    marginRight: spacing.sm,
    alignItems: isWeb && !isMobile ? 'flex-end' : 'flex-start',
  },
  username: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeights.medium,
  },
  userRole: {
    fontFamily: typography.fontFamily.secondary,
    fontSize: typography.fontSizes.xs,
    color: colors.text.light,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors.card,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeights.bold,
    fontSize: typography.fontSizes.sm,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 4,
  },
  signInIcon: {
    marginRight: spacing.xs,
  },
  signInText: {
    color: colors.card,
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  mobileControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  mobileMenu: {
    backgroundColor: colors.card,
    overflow: 'hidden',
    ...getShadow('medium'),
  },
  mobileNavLinks: {
    padding: spacing.sm,
  },
});

export default MainHeader; 