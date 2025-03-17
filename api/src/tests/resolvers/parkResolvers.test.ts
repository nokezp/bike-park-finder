import { connectTestDB, closeTestDB, clearTestDB } from '../setup';
import { BikePark } from '../../models/BikePark';
import { resolvers } from '../../resolvers/resolvers';
import mongoose, { Document } from 'mongoose';
import { IBikePark } from '../../models/BikePark';

interface ParkDocument extends IBikePark {
  _id: mongoose.Types.ObjectId;
}

interface ParkResolvers {
  Query: {
    parks: () => Promise<IBikePark[]>;
    park: (_: any, { id }: { id: string }) => Promise<IBikePark | null>;
    searchParks: (_: any, { query }: { query: string }) => Promise<IBikePark[]>;
  };
  Mutation: {
    createPark: (_: any, { input }: { input: any }, context: any) => Promise<IBikePark>;
    updatePark: (_: any, { id, input }: { id: string; input: any }) => Promise<IBikePark | null>;
    deletePark: (_: any, { id }: { id: string }) => Promise<boolean>;
  };
}

describe('Park Resolvers', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  describe('Query', () => {
    it('should return all parks', async () => {
      const park = await BikePark.create({
        name: 'Test Bike Park',
        description: 'Test Description',
        location: 'Test Location',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        difficulty: 'intermediate',
        features: ['feature1', 'feature2'],
        amenities: ['amenity1', 'amenity2'],
        hasLiftAccess: true,
        hasTechnicalSections: true,
        hasJumps: true,
        hasDrops: true,
        images: ['image1.jpg', 'image2.jpg'],
        createdBy: new mongoose.Types.ObjectId()
      });

      const result = await (resolvers as unknown as ParkResolvers).Query.parks();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(park.name);
    });

    it('should return a park by id', async () => {
      const park = await BikePark.create({
        name: 'Test Bike Park',
        description: 'Test Description',
        location: 'Test Location',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        difficulty: 'intermediate',
        features: ['feature1', 'feature2'],
        amenities: ['amenity1', 'amenity2'],
        hasLiftAccess: true,
        hasTechnicalSections: true,
        hasJumps: true,
        hasDrops: true,
        images: ['image1.jpg', 'image2.jpg'],
        createdBy: new mongoose.Types.ObjectId()
      });

      const parkId = (park as any)._id.toString();
      const result = await (resolvers as unknown as ParkResolvers).Query.park(null, { id: parkId });
      expect(result?.name).toBe(park.name);
    });

    it('should search parks by name', async () => {
      const park = await BikePark.create({
        name: 'Test Bike Park',
        description: 'Test Description',
        location: 'Test Location',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        difficulty: 'intermediate',
        features: ['feature1', 'feature2'],
        amenities: ['amenity1', 'amenity2'],
        hasLiftAccess: true,
        hasTechnicalSections: true,
        hasJumps: true,
        hasDrops: true,
        images: ['image1.jpg', 'image2.jpg'],
        createdBy: new mongoose.Types.ObjectId()
      });

      const result = await (resolvers as unknown as ParkResolvers).Query.searchParks(null, { query: 'Test' });
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(park.name);
    });
  });

  describe('Mutation', () => {
    it('should create a new park', async () => {
      const userId = new mongoose.Types.ObjectId();
      const input = {
        name: 'New Bike Park',
        location: 'New Location',
        coordinates: {
          latitude: 45.5155,
          longitude: -122.6789
        },
        description: 'A new bike park',
        difficulty: 'intermediate',
        features: ['Trails'],
        amenities: ['Parking'],
        images: ['image1.jpg'],
        hasLiftAccess: true,
        hasTechnicalSections: true,
        hasJumps: true,
        hasDrops: false,
        createdBy: userId
      };

      const result = await (resolvers as unknown as ParkResolvers).Mutation.createPark(null, { input }, { user: { userId: userId.toString() } });
      expect(result.name).toBe(input.name);
      expect(result.location).toBe(input.location);
    });

    it('should update an existing park', async () => {
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
      }) as IBikePark;

      const input = {
        name: 'Updated Test Bike Park'
      };

      const parkId = (park as any)._id.toString();
      const result = await (resolvers as unknown as ParkResolvers).Mutation.updatePark(null, { id: parkId, input });
      expect(result?.name).toBe(input.name);
    });

    it('should delete a park', async () => {
      const park = await BikePark.create({
        name: 'Test Bike Park',
        description: 'Test Description',
        location: 'Test Location',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        difficulty: 'intermediate',
        features: ['feature1', 'feature2'],
        amenities: ['amenity1', 'amenity2'],
        hasLiftAccess: true,
        hasTechnicalSections: true,
        hasJumps: true,
        hasDrops: true,
        images: ['image1.jpg', 'image2.jpg'],
        createdBy: new mongoose.Types.ObjectId()
      });

      const parkId = (park as any)._id.toString();
      const result = await (resolvers as unknown as ParkResolvers).Mutation.deletePark(null, { id: parkId });
      expect(result).toBe(true);

      const deletedPark = await BikePark.findById(park._id);
      expect(deletedPark).toBeNull();
    });
  });
}); 