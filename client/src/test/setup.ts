import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill TextEncoder/TextDecoder for Jest
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: () => new Map(),
}))

// Mock mapbox-gl
jest.mock('mapbox-gl', () => ({
  Map: class {
    constructor() {
      return {
        addControl: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
        remove: jest.fn(),
        setPadding: jest.fn(),
      }
    }
  },
  Marker: class {
    constructor() {
      return {
        addTo: jest.fn(),
        remove: jest.fn(),
      }
    }
  },
  Popup: class {
    constructor() {
      return {
        addTo: jest.fn(),
        remove: jest.fn(),
      }
    }
  },
}))

// Mock fetch
global.fetch = jest.fn() as jest.Mock 