import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock next/headers
jest.mock('next/headers', () => ({
  headers() {
    return new Map()
  },
}))

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
  Marker: jest.fn(),
  Popup: jest.fn(),
  LngLat: jest.fn(),
  LngLatBounds: jest.fn(),
})) 