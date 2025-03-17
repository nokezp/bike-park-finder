import mongoose from 'mongoose';
import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { BikePark } from '../../models/BikePark';

describe('BikePark Model', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  it('should create a new bike park', async () => {
    const parkData = {
      name: 'Test Bike Park',
      location: 'Test Location',
      coordinates: {
        latitude: 45.5155,
        longitude: -122.6789
      },
      description: 'A test bike park',
      difficulty: 'intermediate',
      features: ['Trails', 'Jumps'],
      amenities: ['Parking', 'Restrooms'],
      images: ['image1.jpg'],
      hasLiftAccess: true,
      hasTechnicalSections: true,
      hasJumps: true,
      hasDrops: false,
      createdBy: new mongoose.Types.ObjectId()
    };

    const park = await BikePark.create(parkData);

    expect(park._id).toBeDefined();
    expect(park.name).toBe(parkData.name);
    expect(park.location).toBe(parkData.location);
    expect(park.coordinates).toEqual(parkData.coordinates);
    expect(park.difficulty).toBe(parkData.difficulty);
    expect(park.features).toEqual(parkData.features);
    expect(park.amenities).toEqual(parkData.amenities);
    expect(park.images).toEqual(parkData.images);
    expect(park.hasLiftAccess).toBe(parkData.hasLiftAccess);
    expect(park.hasTechnicalSections).toBe(parkData.hasTechnicalSections);
    expect(park.hasJumps).toBe(parkData.hasJumps);
    expect(park.hasDrops).toBe(parkData.hasDrops);
  });

  it('should fail to create a bike park without required fields', async () => {
    const parkData = {
      name: 'Test Bike Park'
      // Missing required fields
    };

    try {
      await BikePark.create(parkData);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should update a bike park', async () => {
    const park = await BikePark.create({
      name: 'Test Bike Park',
      location: 'Test Location',
      coordinates: {
        latitude: 45.5155,
        longitude: -122.6789
      },
      description: 'A test bike park',
      difficulty: 'intermediate',
      features: ['Trails'],
      amenities: ['Parking'],
      images: ['image1.jpg'],
      hasLiftAccess: true,
      hasTechnicalSections: true,
      hasJumps: true,
      hasDrops: false,
      createdBy: new mongoose.Types.ObjectId()
    });

    const updatedPark = await BikePark.findByIdAndUpdate(
      park._id,
      { name: 'Updated Bike Park' },
      { new: true }
    );

    expect(updatedPark?.name).toBe('Updated Bike Park');
  });

  it('should delete a bike park', async () => {
    const park = await BikePark.create({
      name: 'Test Bike Park',
      location: 'Test Location',
      coordinates: {
        latitude: 45.5155,
        longitude: -122.6789
      },
      description: 'A test bike park',
      difficulty: 'intermediate',
      features: ['Trails'],
      amenities: ['Parking'],
      images: ['image1.jpg'],
      hasLiftAccess: true,
      hasTechnicalSections: true,
      hasJumps: true,
      hasDrops: false,
      createdBy: new mongoose.Types.ObjectId()
    });

    await BikePark.findByIdAndDelete(park._id);

    const deletedPark = await BikePark.findById(park._id);
    expect(deletedPark).toBeNull();
  });
}); 