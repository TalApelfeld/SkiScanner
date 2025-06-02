import { Resort, Hotel, Flight, Transfer } from './types';

export const MOCK_RESORTS: Resort[] = [
  {
    id: 'chamonix',
    name: 'Chamonix',
    country: 'France',
    imageUrl: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Chamonix is situated near the massive peaks of the Aiguilles Rouges. Chamonix offers a wide range of slopes for beginners, intermediates and experts alike, making it the perfect ski resort.',
    packagePriceFrom: 1200,
    liftCount: 49,
    slopeKilometers: 150,
    highestElevation: 3842,
    lowestElevation: 1035,
    nearestAirports: ['GVA', 'LYS'],
    features: ['Apres-ski', 'Family-friendly', 'Off-piste', 'Nightlife'],
    rating: 4.7
  },
  {
    id: 'zermatt',
    name: 'Zermatt',
    country: 'Switzerland',
    imageUrl: 'https://images.pexels.com/photos/352093/pexels-photo-352093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Zermatt is famed for the iconic Matterhorn peak. This ski resort boasts 360km of slopes and fantastic snow reliability due to its high-alpine location.',
    packagePriceFrom: 1800,
    liftCount: 53,
    slopeKilometers: 360,
    highestElevation: 3899,
    lowestElevation: 1620,
    nearestAirports: ['GVA', 'ZRH'],
    features: ['Glacier skiing', 'Luxury', 'Car-free village', 'Gourmet dining'],
    rating: 4.9
  },
  {
    id: 'stanton',
    name: 'St. Anton',
    country: 'Austria',
    imageUrl: 'https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'St. Anton is part of the Arlberg ski area, with 305km of pistes and 200km of off-piste itineraries. It\'s known for its challenging terrain and lively après-ski scene.',
    packagePriceFrom: 1450,
    liftCount: 88,
    slopeKilometers: 305,
    highestElevation: 2811,
    lowestElevation: 1304,
    nearestAirports: ['INN', 'ZRH'],
    features: ['Nightlife', 'Advanced slopes', 'Off-piste', 'Ski schools'],
    rating: 4.6
  },
  {
    id: 'valthorens',
    name: 'Val Thorens',
    country: 'France',
    imageUrl: 'https://images.pexels.com/photos/356807/pexels-photo-356807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Europe\'s highest ski resort at 2300m, Val Thorens offers reliable snow from November to May. It\'s part of the Three Valleys, the world\'s largest ski area.',
    packagePriceFrom: 1350,
    liftCount: 32,
    slopeKilometers: 150,
    highestElevation: 3230,
    lowestElevation: 2300,
    nearestAirports: ['GVA', 'LYS', 'CMF'],
    features: ['Snow-sure', 'Ski-in/ski-out', 'Beginner-friendly', 'Nightlife'],
    rating: 4.8
  },
  {
    id: 'kitzbuhel',
    name: 'Kitzbühel',
    country: 'Austria',
    imageUrl: 'https://images.pexels.com/photos/847398/pexels-photo-847398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Kitzbühel is a medieval town with a modern ski resort. It hosts the famous Hahnenkamm downhill race and offers 230km of groomed pistes.',
    packagePriceFrom: 1250,
    liftCount: 57,
    slopeKilometers: 230,
    highestElevation: 2000,
    lowestElevation: 800,
    nearestAirports: ['INN', 'SZG', 'MUC'],
    features: ['Historic town', 'Intermediate terrain', 'Dining', 'Events'],
    rating: 4.5
  },
  {
    id: 'verbier',
    name: 'Verbier',
    country: 'Switzerland',
    imageUrl: 'https://images.pexels.com/photos/273909/pexels-photo-273909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Verbier is the main resort in Switzerland\'s 4 Valleys ski area, with 410km of runs. It\'s renowned for its off-piste terrain and vibrant nightlife.',
    packagePriceFrom: 1700,
    liftCount: 92,
    slopeKilometers: 410,
    highestElevation: 3330,
    lowestElevation: 1500,
    nearestAirports: ['GVA', 'BRN'],
    features: ['Freeride', 'Luxury', 'Nightlife', 'Advanced'],
    rating: 4.7
  }
];

export const MOCK_HOTELS: { [resortId: string]: Hotel[] } = {
  'chamonix': [
    {
      id: 'hotel-1',
      resortId: 'chamonix',
      name: 'Hotel Mont Blanc',
      imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      starRating: 4,
      liftDistanceMeters: 150,
      pricePerNight: 250,
      amenities: ['Spa', 'Restaurant', 'Free WiFi', 'Ski Storage'],
      coordinates: { lat: 45.923697, lng: 6.869433 }
    },
    {
      id: 'hotel-2',
      resortId: 'chamonix',
      name: 'Alpina Eclectic Hotel',
      imageUrl: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      starRating: 5,
      liftDistanceMeters: 200,
      pricePerNight: 350,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Bar', 'Free WiFi', 'Ski Storage'],
      coordinates: { lat: 45.923897, lng: 6.867433 }
    }
  ],
  'zermatt': [
    {
      id: 'hotel-3',
      resortId: 'zermatt',
      name: 'Grand Hotel Zermatterhof',
      imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      starRating: 5,
      liftDistanceMeters: 300,
      pricePerNight: 450,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Bar', 'Free WiFi', 'Ski Storage'],
      coordinates: { lat: 46.024059, lng: 7.747256 }
    }
  ]
};

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'flight-1',
    origin: 'LHR',
    destination: 'GVA',
    carrier: 'British Airways',
    departureTime: '2025-12-15T08:30:00Z',
    arrivalTime: '2025-12-15T11:15:00Z',
    price: 250,
    cabinClass: 'economy'
  },
  {
    id: 'flight-2',
    origin: 'LHR',
    destination: 'GVA',
    carrier: 'Swiss',
    departureTime: '2025-12-15T10:45:00Z',
    arrivalTime: '2025-12-15T13:30:00Z',
    price: 220,
    cabinClass: 'economy'
  },
  {
    id: 'flight-3',
    origin: 'LGW',
    destination: 'GVA',
    carrier: 'EasyJet',
    departureTime: '2025-12-15T07:15:00Z',
    arrivalTime: '2025-12-15T10:00:00Z',
    price: 150,
    cabinClass: 'economy'
  }
];

export const MOCK_TRANSFERS: Transfer[] = [
  {
    id: 'transfer-1',
    type: 'private',
    origin: 'GVA',
    destination: 'Chamonix',
    price: 80,
    duration: 75
  },
  {
    id: 'transfer-2',
    type: 'shared',
    origin: 'GVA',
    destination: 'Chamonix',
    price: 40,
    duration: 90
  },
  {
    id: 'transfer-3',
    type: 'private',
    origin: 'GVA',
    destination: 'Zermatt',
    price: 120,
    duration: 160
  }
];

export const AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LGW', name: 'London Gatwick' },
  { code: 'GVA', name: 'Geneva' },
  { code: 'ZRH', name: 'Zurich' },
  { code: 'INN', name: 'Innsbruck' },
  { code: 'SZG', name: 'Salzburg' },
  { code: 'LYS', name: 'Lyon' },
  { code: 'MUC', name: 'Munich' },
  { code: 'CMF', name: 'Chambery' },
  { code: 'BRN', name: 'Bern' }
];