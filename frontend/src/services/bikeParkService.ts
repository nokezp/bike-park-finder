import axios from 'axios';
import { API_URL } from '../config/constants';

// Define types
export interface BikePark {
  _id: string;
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  difficulty: string;
  features: string[];
  amenities: string[];
  images: string[];
  website?: string;
  contactPhone?: string;
  contactEmail?: string;
  hours?: string;
  pricing?: string;
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BikeParkInput {
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  difficulty: string;
  features: string[];
  amenities: string[];
  images: string[];
  website?: string;
  contactPhone?: string;
  contactEmail?: string;
  hours?: string;
  pricing?: string;
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
}

// Get all bike parks
export const getAllBikeParks = async (): Promise<BikePark[]> => {
  try {
    const response = await axios.get(`${API_URL}/bikeparks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search bike parks
export const searchBikeParks = async (query: string): Promise<BikePark[]> => {
  try {
    const response = await axios.get(`${API_URL}/bikeparks/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get bike park by ID
export const getBikeParkById = async (id: string): Promise<BikePark> => {
  try {
    const response = await axios.get(`${API_URL}/bikeparks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new bike park (admin only)
export const createBikePark = async (bikeParkData: BikeParkInput, token: string): Promise<BikePark> => {
  try {
    const response = await axios.post(
      `${API_URL}/bikeparks`,
      bikeParkData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a bike park (admin only)
export const updateBikePark = async (id: string, bikeParkData: Partial<BikeParkInput>, token: string): Promise<BikePark> => {
  try {
    const response = await axios.patch(
      `${API_URL}/bikeparks/${id}`,
      bikeParkData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a bike park (admin only)
export const deleteBikePark = async (id: string, token: string): Promise<BikePark> => {
  try {
    const response = await axios.delete(
      `${API_URL}/bikeparks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}; 