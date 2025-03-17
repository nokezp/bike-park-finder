import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { MainTabParamList } from '../navigation/AppNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type ProfileScreenNavigationProp = BottomTabNavigationProp<MainTabParamList>;

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          {user.profileImageUrl ? (
            <Image
              source={{ uri: user.profileImageUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>
                {user.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="account-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="lock-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Change Password</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        {user.isAdmin && (
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Admin')}
          >
            <MaterialCommunityIcons name="shield-account" size={24} color={colors.dark.primary} />
            <Text style={[styles.menuItemText, { color: colors.dark.primary }]}>Admin Dashboard</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.dark.primary} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="check-circle-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>My Check-ins</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="star-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>My Reviews</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="heart-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Favorite Bike Parks</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Notifications</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => Alert.alert('Coming Soon', 'This feature is under development.')}
        >
          <MaterialCommunityIcons name="earth" size={24} color="#333" />
          <Text style={styles.menuItemText}>Language</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholderText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    padding: 15,
    paddingBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 