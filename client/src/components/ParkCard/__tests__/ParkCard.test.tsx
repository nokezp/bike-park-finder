import { render, screen, fireEvent } from '@testing-library/react';
import ParkCard from '../ParkCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockPark = {
  _id: '1',
  name: 'Test Park',
  description: 'Test Description',
  location: 'Test Location',
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
};

describe('ParkCard', () => {
  it('renders park information correctly', () => {
    render(<ParkCard park={mockPark} />);
    
    expect(screen.getByText(mockPark.name)).toBeInTheDocument();
    expect(screen.getByText(mockPark.description)).toBeInTheDocument();
    expect(screen.getByText(mockPark.location)).toBeInTheDocument();
    expect(screen.getByText(mockPark.difficulty)).toBeInTheDocument();
    
    // Check features
    mockPark.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
    
    // Check amenities
    mockPark.amenities.forEach(amenity => {
      expect(screen.getByText(amenity)).toBeInTheDocument();
    });
  });

  it('displays correct icons based on park features', () => {
    render(<ParkCard park={mockPark} />);
    
    // Check lift access icon
    const liftIcon = screen.getByTestId('lift-icon');
    expect(liftIcon).toHaveAttribute('fill', 'currentColor');
    
    // Check technical sections icon
    const technicalIcon = screen.getByTestId('technical-icon');
    expect(technicalIcon).toHaveAttribute('fill', 'currentColor');
    
    // Check jumps icon (should not be present)
    expect(screen.queryByTestId('jumps-icon')).not.toBeInTheDocument();
    
    // Check drops icon
    const dropsIcon = screen.getByTestId('drops-icon');
    expect(dropsIcon).toHaveAttribute('fill', 'currentColor');
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<ParkCard park={mockPark} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByTestId('park-card'));
    expect(onSelect).toHaveBeenCalledWith(mockPark);
  });

  it('applies selected styles when isSelected is true', () => {
    render(<ParkCard park={mockPark} isSelected={true} />);
    expect(screen.getByTestId('park-card')).toHaveClass('border-2', 'border-blue-500');
  });
}); 