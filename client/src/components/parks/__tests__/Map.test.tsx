import { render, screen, fireEvent } from '@testing-library/react'
import MapView from '../Map'
import { Park } from '@/types/park'

// Mock react-map-gl components
jest.mock('react-map-gl', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-container">{children}</div>
  ),
  Marker: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div data-testid="park-marker" onClick={onClick}>{children}</div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="park-popup">{children}</div>
  ),
}));

const mockParks: Park[] = [
  {
    _id: '1',
    name: 'Test Park 1',
    description: 'Test Description 1',
    location: 'Test Location 1',
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    difficulty: 'Intermediate',
    features: ['Feature 1', 'Feature 2'],
    amenities: ['Amenity 1', 'Amenity 2'],
    images: ['image1.jpg', 'image2.jpg'],
    hasLiftAccess: true,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '2',
    name: 'Test Park 2',
    description: 'Test Description 2',
    location: 'Test Location 2',
    coordinates: {
      latitude: 1,
      longitude: 1
    },
    difficulty: 'Advanced',
    features: ['Feature 3', 'Feature 4'],
    amenities: ['Amenity 3', 'Amenity 4'],
    images: ['image3.jpg', 'image4.jpg'],
    hasLiftAccess: false,
    hasTechnicalSections: true,
    hasJumps: true,
    hasDrops: true,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  },
];

describe('MapView', () => {
  it('renders map container', () => {
    render(<MapView parks={mockParks} />)
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
  })

  it('renders markers for each park', () => {
    render(<MapView parks={mockParks} />)
    const markers = screen.getAllByTestId('park-marker')
    expect(markers).toHaveLength(mockParks.length)
  })

  it('shows popup when marker is clicked', () => {
    render(<MapView parks={mockParks} />)
    
    // Initially, no popup should be visible
    expect(screen.queryByTestId('park-popup')).not.toBeInTheDocument()
    
    // Click the first marker
    const firstMarker = screen.getAllByTestId('park-marker')[0]
    fireEvent.click(firstMarker)
    
    // Popup should now be visible with park information
    const popup = screen.getByTestId('park-popup')
    expect(popup).toBeInTheDocument()
    expect(screen.getByText(mockParks[0].name)).toBeInTheDocument()
    expect(screen.getByText(mockParks[0].difficulty)).toBeInTheDocument()
  })

  it('handles empty parks array', () => {
    render(<MapView parks={[]} />)
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    expect(screen.queryByTestId('park-marker')).not.toBeInTheDocument()
    expect(screen.queryByTestId('park-popup')).not.toBeInTheDocument()
  })
}) 