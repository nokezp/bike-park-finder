import { render, screen, fireEvent } from '@testing-library/react'
import ParkCard from '../ParkCard'
import { Park } from '@/types/graphql'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt={props.alt} />;
  },
}));

const mockPark: Park = {
  _id: '1',
  name: 'Test Park',
  description: 'A test bike park',
  location: 'Test Location',
  coordinates: {
    latitude: 40.7128,
    longitude: -74.0060,
  },
  difficulty: 'Intermediate',
  features: ['Jumps', 'Drops'],
  amenities: ['Parking', 'Bathrooms'],
  hasLiftAccess: true,
  hasTechnicalSections: true,
  hasJumps: true,
  hasDrops: true,
  images: ['https://example.com/test.jpg'],
  createdAt: '2024-03-17T00:00:00.000Z',
  updatedAt: '2024-03-17T00:00:00.000Z',
}

describe('ParkCard', () => {
  it('renders park information correctly', () => {
    const onSelect = jest.fn();
    render(<ParkCard park={mockPark} isSelected={false} onSelect={onSelect} />);
    
    // Check if park name is rendered
    expect(screen.getByText('Test Park')).toBeInTheDocument();
    
    // Check if location is rendered
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    
    // Check if difficulty is rendered
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    
    // Check if features are rendered
    const jumpsElements = screen.getAllByText('Jumps');
    expect(jumpsElements.length).toBeGreaterThan(0);
    
    const dropsElements = screen.getAllByText('Drops');
    expect(dropsElements.length).toBeGreaterThan(0);
    
    // Check if amenities are rendered
    expect(screen.getByText('Parking')).toBeInTheDocument();
    expect(screen.getByText('Bathrooms')).toBeInTheDocument();
  });

  it('applies selected styles when isSelected is true', () => {
    const onSelect = jest.fn();
    render(<ParkCard park={mockPark} isSelected={true} onSelect={onSelect} />);
    const card = screen.getByTestId('park-card');
    expect(card).toHaveClass('border-accent');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<ParkCard park={mockPark} isSelected={false} onSelect={onSelect} />);
    
    const card = screen.getByTestId('park-card');
    fireEvent.click(card);
    
    expect(onSelect).toHaveBeenCalledWith(mockPark);
  });

  it('displays features and amenities', () => {
    render(<ParkCard park={mockPark} isSelected={false} onSelect={() => {}} />)
    
    // Check features section
    const featuresSection = screen.getByText('Features:').closest('div')
    expect(featuresSection).toHaveTextContent('Jumps')
    expect(featuresSection).toHaveTextContent('Drops')

    // Check amenities section
    const amenitiesSection = screen.getByText('Amenities:').closest('div')
    expect(amenitiesSection).toHaveTextContent('Parking')
    expect(amenitiesSection).toHaveTextContent('Bathrooms')
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