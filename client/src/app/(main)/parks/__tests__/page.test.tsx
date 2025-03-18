import { render, screen, waitFor, act } from '@testing-library/react'
import ParksPage from '../../../../app/parks/page'
import { Park, ParksQuery } from '@/types/graphql'
import { Provider, createClient, cacheExchange, fetchExchange } from 'urql'

// Create a mock URQL client
const mockClient = createClient({
  url: 'http://localhost:3001/graphql',
  exchanges: [cacheExchange, fetchExchange],
})

// Mock fetch globally
global.fetch = jest.fn()

const mockParks: Park[] = [
  {
    _id: '1',
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
    createdAt: '2024-03-17T00:00:00.000Z',
    updatedAt: '2024-03-17T00:00:00.000Z',
  },
  {
    _id: '2',
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
    createdAt: '2024-03-17T00:00:00.000Z',
    updatedAt: '2024-03-17T00:00:00.000Z',
  },
]

describe('ParksPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading state', () => {
    render(
      <Provider value={mockClient}>
        <ParksPage />
      </Provider>
    )
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('displays parks after successful fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { parks: mockParks } }),
    })

    await act(async () => {
      render(
        <Provider value={mockClient}>
          <ParksPage />
        </Provider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('parks-page')).toBeInTheDocument()
      const parkCards = screen.getAllByTestId('park-card')
      expect(parkCards).toHaveLength(mockParks.length)
    })
  })

  it('shows error message on fetch failure', async () => {
    const error = new Error('Failed to fetch parks');
    (global.fetch as jest.Mock).mockRejectedValueOnce(error)

    await act(async () => {
      render(
        <Provider value={mockClient}>
          <ParksPage />
        </Provider>
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument()
      expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument()
    })
  })

  it('selects park card when clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { parks: mockParks } }),
    })

    await act(async () => {
      render(
        <Provider value={mockClient}>
          <ParksPage />
        </Provider>
      )
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