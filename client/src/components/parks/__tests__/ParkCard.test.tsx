import { render, screen, fireEvent } from '@testing-library/react'
import ParkCard from '../ParkCard'
import { Park } from '@/types/park'

const mockPark: Park = {
  _id: '1',
  name: 'Test Park',
  description: 'Test Description',
  location: 'Test Location',
  coordinates: {
    latitude: 0,
    longitude: 0
  },
  difficulty: 'Intermediate',
  features: ['Feature 1', 'Feature 2'],
  amenities: ['Amenity 1', 'Amenity 2'],
  hasLiftAccess: true,
  hasTechnicalSections: true,
  hasJumps: true,
  hasDrops: true,
  images: ['image1.jpg', 'image2.jpg'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
}

describe('ParkCard', () => {
  it('renders park information correctly', () => {
    render(<ParkCard park={mockPark} isSelected={false} onSelect={() => {}} />)
    
    expect(screen.getByText('Test Park')).toBeInTheDocument()
    expect(screen.getByText('Test Location')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('applies selected styles when isSelected is true', () => {
    render(<ParkCard park={mockPark} isSelected={true} onSelect={() => {}} />)
    const card = screen.getByTestId('park-card')
    expect(card).toHaveClass('border-blue-500')
  })

  it('calls onSelect when clicked', () => {
    const handleSelect = jest.fn()
    render(<ParkCard park={mockPark} isSelected={false} onSelect={handleSelect} />)
    
    fireEvent.click(screen.getByTestId('park-card'))
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })

  it('displays features and amenities', () => {
    render(<ParkCard park={mockPark} isSelected={false} onSelect={() => {}} />)
    
    // Check features section
    const featuresSection = screen.getByText('Features:').closest('div')
    expect(featuresSection).toHaveTextContent('Feature 1')
    expect(featuresSection).toHaveTextContent('Feature 2')

    // Check amenities section
    const amenitiesSection = screen.getByText('Amenities:').closest('div')
    expect(amenitiesSection).toHaveTextContent('Amenity 1')
    expect(amenitiesSection).toHaveTextContent('Amenity 2')
  })

  it('displays park characteristics correctly', () => {
    render(<ParkCard park={mockPark} isSelected={false} onSelect={() => {}} />)
    
    const characteristicsSection = screen.getByText('Characteristics:').closest('div')
    expect(characteristicsSection).toHaveTextContent('Lift Access')
    expect(characteristicsSection).toHaveTextContent('Technical Sections')
    expect(characteristicsSection).toHaveTextContent('Jumps')
    expect(characteristicsSection).toHaveTextContent('Drops')
  })
}) 