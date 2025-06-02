// Entity Types
export interface Resort {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  description: string;
  packagePriceFrom: number;
  liftCount: number;
  slopeKilometers: number;
  highestElevation: number;
  lowestElevation: number;
  nearestAirports: string[];
  features: string[];
  rating: number;
}

export interface Hotel {
  id: string;
  resortId: string;
  name: string;
  imageUrl: string;
  starRating: number;
  liftDistanceMeters: number;
  pricePerNight: number;
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
}

export interface Transfer {
  id: string;
  type: 'private' | 'shared';
  origin: string;
  destination: string;
  price: number;
  duration: number; // in minutes
}

export interface PackageQuote {
  id: string;
  flightTotal: number;
  hotelTotal: number;
  transferTotal: number;
  totalPrice: number;
  pricePerPerson: number;
  expiresAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  locale: string;
  currency: string;
}

export interface Booking {
  id: string;
  userId: string;
  quoteId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentIntent: string;
  voucherUrl?: string;
  createdAt: string;
}