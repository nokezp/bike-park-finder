import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';
import CustomButton from '../components/CustomButton';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/AppNavigator';
import { 
  getAllBikeParks, 
  createBikePark, 
  deleteBikePark, 
  BikePark as IBikePark,
  BikeParkInput
} from '../services/bikeParkService';

type AdminScreenNavigationProp = BottomTabNavigationProp<MainTabParamList>;

const AdminScreen = () => {
  const { user, token } = useAuth();
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [bikeParks, setBikeParks] = useState<IBikePark[]>([]);
  const [isAddingPark, setIsAddingPark] = useState(false);
  const [newPark, setNewPark] = useState<BikeParkInput>({
    name: '',
    location: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    description: '',
    difficulty: 'Intermediate',
    features: [],
    amenities: [],
    images: [],
    hasLiftAccess: false,
    hasTechnicalSections: false,
    hasJumps: false,
    hasDrops: false
  });
  
  // Fetch bike parks on component mount
  useEffect(() => {
    fetchBikeParks();
  }, []);
  
  const fetchBikeParks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllBikeParks();
      setBikeParks(data);
    } catch (error) {
      console.error('Error fetching bike parks:', error);
      Alert.alert('Error', 'Failed to fetch bike parks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPark = async () => {
    if (!newPark.name || !newPark.location || !newPark.description) {
      Alert.alert('Error', 'Name, location, and description are required');
      return;
    }
    
    if (newPark.coordinates.latitude === 0 && newPark.coordinates.longitude === 0) {
      Alert.alert('Error', 'Please provide valid coordinates');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Convert comma-separated features to array if it's a string
      if (typeof newPark.features === 'string') {
        newPark.features = (newPark.features as unknown as string).split(',').map(feature => feature.trim());
      }
      
      // Convert comma-separated amenities to array if it's a string
      if (typeof newPark.amenities === 'string') {
        newPark.amenities = (newPark.amenities as unknown as string).split(',').map(amenity => amenity.trim());
      }
      
      const createdPark = await createBikePark(newPark, token);
      
      setBikeParks([...bikeParks, createdPark]);
      setIsAddingPark(false);
      setNewPark({
        name: '',
        location: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        description: '',
        difficulty: 'Intermediate',
        features: [],
        amenities: [],
        images: [],
        hasLiftAccess: false,
        hasTechnicalSections: false,
        hasJumps: false,
        hasDrops: false
      });
      
      Alert.alert('Success', 'Bike park added successfully');
    } catch (error) {
      console.error('Error adding bike park:', error);
      Alert.alert('Error', 'Failed to add bike park');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePark = async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this bike park?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsLoading(true);
              await deleteBikePark(id, token);
              setBikeParks(bikeParks.filter(park => park._id !== id));
              Alert.alert('Success', 'Bike park deleted successfully');
            } catch (error) {
              console.error('Error deleting bike park:', error);
              Alert.alert('Error', 'Failed to delete bike park');
            } finally {
              setIsLoading(false);
            }
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [priceInfo, setPriceInfo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // Trail features
  const [hasBeginnerTrails, setHasBeginnerTrails] = useState(false);
  const [hasIntermediateTrails, setHasIntermediateTrails] = useState(false);
  const [hasExpertTrails, setHasExpertTrails] = useState(false);
  const [hasJumps, setHasJumps] = useState(false);
  const [hasFlowTrails, setHasFlowTrails] = useState(false);
  const [hasTechnicalSections, setHasTechnicalSections] = useState(false);
  const [hasLiftAccess, setHasLiftAccess] = useState(false);

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Access Required</Text>
        <Text style={styles.subtitle}>You need admin privileges to access this page.</Text>
        <MaterialCommunityIcons name="shield-lock" size={80} color={colors.dark.primary} />
      </View>
    );
  }

  const handleSubmit = async () => {
    // Validate form
    if (!name || !description || !latitude || !longitude) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate coordinates
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert('Error', 'Latitude and longitude must be valid numbers');
      return;
    }

    setIsLoading(true);

    try {
      const bikeParkData = {
        name,
        description,
        latitude: lat,
        longitude: lng,
        address,
        website,
        phone,
        openingHours,
        priceInfo,
        hasBeginnerTrails,
        hasIntermediateTrails,
        hasExpertTrails,
        hasJumps,
        hasFlowTrails,
        hasTechnicalSections,
        hasLiftAccess,
        imageUrl,
      };

      const response = await axios.post(
        `${API_URL}/bike-parks`,
        bikeParkData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Bike park created successfully!');
      
      // Reset form
      setName('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setAddress('');
      setWebsite('');
      setPhone('');
      setOpeningHours('');
      setPriceInfo('');
      setImageUrl('');
      setHasBeginnerTrails(false);
      setHasIntermediateTrails(false);
      setHasExpertTrails(false);
      setHasJumps(false);
      setHasFlowTrails(false);
      setHasTechnicalSections(false);
      setHasLiftAccess(false);
    } catch (error) {
      console.error('Error creating bike park:', error);
      Alert.alert('Error', 'Failed to create bike park. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFeatureSwitch = (
    label: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d3d3d3', true: colors.dark.primaryLight }}
        thumbColor={value ? colors.dark.primary : '#f4f3f4'}
      />
    </View>
  );

  const renderBikePark = ({ item }: { item: IBikePark }) => (
    <View style={styles.parkItem}>
      <View style={styles.parkHeader}>
        <Text style={styles.parkName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDeletePark(item._id)}>
          <MaterialCommunityIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.parkLocation}>{item.location}</Text>
      <Text style={styles.parkDifficulty}>Difficulty: {item.difficulty}</Text>
      <Text style={styles.parkFeatures}>Features: {Array.isArray(item.features) ? item.features.join(', ') : item.features}</Text>
      <Text style={styles.parkDescription}>{item.description}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="shield-account" size={40} color={colors.dark.primary} />
          <Text style={styles.title}>Admin Dashboard</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Bike Park</Text>
          
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter bike park name"
          />
          
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
          
          <Text style={styles.label}>Latitude *</Text>
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={setLatitude}
            placeholder="e.g. 37.7749"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Longitude *</Text>
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={setLongitude}
            placeholder="e.g. -122.4194"
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
          />
          
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter website URL"
            keyboardType="url"
          />
          
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          
          <Text style={styles.label}>Opening Hours</Text>
          <TextInput
            style={styles.input}
            value={openingHours}
            onChangeText={setOpeningHours}
            placeholder="e.g. Mon-Fri: 9am-5pm"
          />
          
          <Text style={styles.label}>Price Information</Text>
          <TextInput
            style={styles.input}
            value={priceInfo}
            onChangeText={setPriceInfo}
            placeholder="Enter pricing details"
          />
          
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="Enter image URL"
            keyboardType="url"
          />
          
          <Text style={styles.featuresTitle}>Trail Features</Text>
          
          {renderFeatureSwitch('Beginner Trails', hasBeginnerTrails, setHasBeginnerTrails)}
          {renderFeatureSwitch('Intermediate Trails', hasIntermediateTrails, setHasIntermediateTrails)}
          {renderFeatureSwitch('Expert Trails', hasExpertTrails, setHasExpertTrails)}
          {renderFeatureSwitch('Jumps', hasJumps, setHasJumps)}
          {renderFeatureSwitch('Flow Trails', hasFlowTrails, setHasFlowTrails)}
          {renderFeatureSwitch('Technical Sections', hasTechnicalSections, setHasTechnicalSections)}
          {renderFeatureSwitch('Lift Access', hasLiftAccess, setHasLiftAccess)}
          
          <CustomButton
            title="Add Bike Park"
            onPress={handleSubmit}
            variant="primary"
            loading={isLoading}
            icon="map-marker-plus"
            style={styles.submitButton}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Bike Parks</Text>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAddingPark(!isAddingPark)}
          >
            <MaterialCommunityIcons 
              name={isAddingPark ? "close" : "plus"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {isAddingPark ? (
          <ScrollView style={styles.addParkForm}>
            <Text style={styles.formTitle}>Add New Bike Park</Text>
            
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.input}
              value={newPark.name}
              onChangeText={(text) => setNewPark({...newPark, name: text})}
              placeholder="Bike Park Name"
            />
            
            <Text style={styles.inputLabel}>Location *</Text>
            <TextInput
              style={styles.input}
              value={newPark.location}
              onChangeText={(text) => setNewPark({...newPark, location: text})}
              placeholder="City, State"
            />
            
            <Text style={styles.inputLabel}>Difficulty</Text>
            <TextInput
              style={styles.input}
              value={newPark.difficulty}
              onChangeText={(text) => setNewPark({...newPark, difficulty: text})}
              placeholder="Beginner, Intermediate, Advanced"
            />
            
            <Text style={styles.inputLabel}>Features</Text>
            <TextInput
              style={styles.input}
              value={Array.isArray(newPark.features) ? newPark.features.join(', ') : ''}
              onChangeText={(text) => setNewPark({...newPark, features: text ? text.split(',').map(item => item.trim()) : []})}
              placeholder="Jumps, Berms, Drops (comma separated)"
            />
            
            <Text style={styles.inputLabel}>Amenities</Text>
            <TextInput
              style={styles.input}
              value={Array.isArray(newPark.amenities) ? newPark.amenities.join(', ') : ''}
              onChangeText={(text) => setNewPark({...newPark, amenities: text ? text.split(',').map(item => item.trim()) : []})}
              placeholder="Parking, Restrooms, Food (comma separated)"
            />
            
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={newPark.description}
              onChangeText={(text) => setNewPark({...newPark, description: text})}
              placeholder="Describe the bike park"
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleAddPark}
            >
              <Text style={styles.submitButtonText}>Add Bike Park</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <FlatList
            data={bikeParks}
            renderItem={renderBikePark}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.parksList}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.dark.text,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: colors.dark.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
    color: colors.dark.text,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  switchLabel: {
    fontSize: 14,
    color: colors.dark.text,
  },
  submitButton: {
    marginTop: 24,
  },
  addButton: {
    backgroundColor: '#27ae60',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addParkForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  parksList: {
    padding: 16,
  },
  parkItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  parkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  parkName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  parkLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  parkDifficulty: {
    fontSize: 14,
    marginBottom: 4,
  },
  parkFeatures: {
    fontSize: 14,
    marginBottom: 8,
  },
  parkDescription: {
    fontSize: 14,
    color: '#444',
  },
});

export default AdminScreen; 