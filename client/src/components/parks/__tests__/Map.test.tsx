import { render, screen, fireEvent } from '@testing-library/react'
import MapView from '../MapView'
import { Park } from '@/types/park'

// Mock react-map-gl components
jest.mock('react-map-gl', () => ({
  Map: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Marker: ({ children, onClick, 'data-testid': testId }: any) => (
    <div data-testid={testId} onClick={onClick}>
      {children}
    </div>
  ),
  Popup: ({ children, onClose, 'data-testid': testId }: any) => (
    <div data-testid={testId}>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockParks = [
  {
    _id: '1',
    name: 'Test Park 1',
    location: 'Test Location 1',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    difficulty: 'Intermediate',
  },
  {
    _id: '2',
    name: 'Test Park 2',
    location: 'Test Location 2',
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
    difficulty: 'Advanced',
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
    
    // Click the first marker
    const markers = screen.getAllByTestId('park-marker')
    fireEvent.click(markers[0])
    
    // Check if popup is shown with correct park info
    const popup = screen.getByTestId('park-popup')
    expect(popup).toBeInTheDocument()
    expect(screen.getByText('Test Park 1')).toBeInTheDocument()
    expect(screen.getByText('Test Location 1')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('handles empty parks array', () => {
    render(<MapView parks={[]} />)
    expect(screen.getByTestId('map-container')).toBeInTheDocument()
    expect(screen.queryByTestId('park-marker')).not.toBeInTheDocument()
    expect(screen.queryByTestId('park-popup')).not.toBeInTheDocument()
  })
}) 