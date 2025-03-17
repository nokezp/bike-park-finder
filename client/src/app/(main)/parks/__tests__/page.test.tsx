import { render, screen, waitFor, act } from '@testing-library/react'
import ParksPage from '../page'
import { Park } from '@/types/park'

// Mock fetch globally
global.fetch = jest.fn()

const mockParks: Park[] = [
  {
    id: '1',
    name: 'Test Park 1',
    description: 'Test Description 1',
    location: 'Test Location 1',
    coordinates: {
      latitude: 45.5155,
      longitude: -122.6789,
    },
    difficulty: 'Intermediate',
    features: ['Feature 1', 'Feature 2'],
    amenities: ['Amenity 1', 'Amenity 2'],
    images: [],
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: false,
    hasDrops: true,
  },
  {
    id: '2',
    name: 'Test Park 2',
    description: 'Test Description 2',
    location: 'Test Location 2',
    coordinates: {
      latitude: 45.5156,
      longitude: -122.6790,
    },
    difficulty: 'Advanced',
    features: ['Feature 3', 'Feature 4'],
    amenities: ['Amenity 3', 'Amenity 4'],
    images: [],
    hasLiftAccess: false,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
  },
]

describe('ParksPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state', () => {
    render(<ParksPage />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('displays parks after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockParks,
    })

    await act(async () => {
      render(<ParksPage />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('parks-page')).toBeInTheDocument()
      const parkCards = screen.getAllByTestId('park-card')
      expect(parkCards).toHaveLength(mockParks.length)
    })
  })

  it('shows error message on fetch failure', async () => {
    const mockError: Error = new Error('Failed to fetch parks');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await act(async () => {
      render(<ParksPage />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument();
    });
  })

  it('selects park card when clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockParks,
    })

    await act(async () => {
      render(<ParksPage />)
    })

    await waitFor(() => {
      const parkCards = screen.getAllByTestId('park-card')
      expect(parkCards).toHaveLength(mockParks.length)
    })

    const firstParkCard = screen.getAllByTestId('park-card')[0]
    
    await act(async () => {
      firstParkCard.click()
    })

    await waitFor(() => {
      expect(firstParkCard).toHaveClass('border-2', 'border-blue-500')
    })
  })
}) 