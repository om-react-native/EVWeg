import { ChargingStation } from '@/types/charging';

// Mock charging stations across India
// TODO: Replace with actual API data when available
export const mockChargingStations: ChargingStation[] = [
  // Delhi NCR Region
  {
    id: 'statiq-connaught-place',
    name: 'Connaught Place Charging Hub',
    provider: 'Statiq',
    location: {
      latitude: 28.6328,
      longitude: 77.2197,
      address: 'Connaught Place, Block A',
      city: 'New Delhi',
    },
    status: 'available',
    rating: 4.5,
    distance: '2 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 18 },
      { type: 'DC', power: '60kW', available: true, price: 18 },
      { type: 'AC', power: '22kW', available: false, price: 12 },
    ],
    amenities: ['Restroom', 'Cafe', 'WiFi', 'Parking'],
    hasOffer: true,
    offerText: '20% off on first charge',
    isOpen24Hours: true,
  },
  {
    id: 'tata-power-nehru-place',
    name: 'Nehru Place EZ Charge',
    provider: 'Tata Power',
    location: {
      latitude: 28.5494,
      longitude: 77.2501,
      address: 'Nehru Place Metro Station',
      city: 'New Delhi',
    },
    status: 'in_use',
    rating: 4.7,
    distance: '8 km away',
    ports: [
      { type: 'DC', power: '50kW', available: false, price: 16 },
      { type: 'AC', power: '7.4kW', available: true, price: 10 },
    ],
    amenities: ['Restroom', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },
  {
    id: 'fortum-gurgaon',
    name: 'Cyber City Fast Charge',
    provider: 'Fortum',
    location: {
      latitude: 28.4950,
      longitude: 77.0826,
      address: 'Cyber Hub, DLF Cyber City',
      city: 'Gurugram',
    },
    status: 'available',
    rating: 4.8,
    distance: '15 km away',
    ports: [
      { type: 'DC', power: '120kW', available: true, price: 22 },
      { type: 'DC', power: '60kW', available: true, price: 18 },
      { type: 'AC', power: '22kW', available: true, price: 12 },
    ],
    amenities: ['Restroom', 'Cafe', 'WiFi', 'Shopping', 'Parking'],
    hasOffer: true,
    offerText: 'Free coffee with charging',
    isOpen24Hours: false,
    operatingHours: '7 AM - 11 PM',
  },

  // Mumbai Region
  {
    id: 'statiq-bandra',
    name: 'Bandra Kurla Complex Station',
    provider: 'Statiq',
    location: {
      latitude: 19.0596,
      longitude: 72.8656,
      address: 'Bandra Kurla Complex',
      city: 'Mumbai',
    },
    status: 'available',
    rating: 4.6,
    distance: '363 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 20 },
      { type: 'AC', power: '22kW', available: true, price: 14 },
    ],
    amenities: ['Restroom', 'WiFi', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },
  {
    id: 'tata-power-powai',
    name: 'Hiranandani Powai Charging',
    provider: 'Tata Power',
    location: {
      latitude: 19.1197,
      longitude: 72.9078,
      address: 'Hiranandani Gardens',
      city: 'Mumbai',
    },
    status: 'available',
    rating: 4.4,
    distance: '370 km away',
    ports: [
      { type: 'DC', power: '50kW', available: true, price: 18 },
      { type: 'AC', power: '7.4kW', available: true, price: 12 },
    ],
    amenities: ['Parking', 'Shopping'],
    hasOffer: true,
    offerText: '10% off for members',
    isOpen24Hours: false,
    operatingHours: '6 AM - 10 PM',
  },

  // Bangalore Region
  {
    id: 'ather-koramangala',
    name: 'Koramangala Ather Grid',
    provider: 'Ather',
    location: {
      latitude: 12.9352,
      longitude: 77.6245,
      address: '80 Feet Road, Koramangala',
      city: 'Bangalore',
    },
    status: 'available',
    rating: 4.9,
    distance: '280 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 17 },
      { type: 'AC', power: '22kW', available: true, price: 11 },
    ],
    amenities: ['Cafe', 'WiFi', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },
  {
    id: 'statiq-whitefield',
    name: 'Whitefield Tech Park Station',
    provider: 'Statiq',
    location: {
      latitude: 12.9698,
      longitude: 77.7499,
      address: 'ITPL Main Road',
      city: 'Bangalore',
    },
    status: 'available',
    rating: 4.5,
    distance: '295 km away',
    ports: [
      { type: 'DC', power: '120kW', available: true, price: 22 },
      { type: 'DC', power: '60kW', available: true, price: 18 },
    ],
    amenities: ['Restroom', 'Cafe', 'WiFi', 'Parking'],
    hasOffer: true,
    offerText: 'Weekend special: 15% off',
    isOpen24Hours: true,
  },

  // Pune Region
  {
    id: 'mg-hinjewadi',
    name: 'MG Hinjewadi IT Park',
    provider: 'MG',
    location: {
      latitude: 18.5912,
      longitude: 73.7389,
      address: 'Rajiv Gandhi Infotech Park',
      city: 'Pune',
    },
    status: 'available',
    rating: 4.3,
    distance: '150 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 16 },
      { type: 'AC', power: '7.4kW', available: true, price: 10 },
    ],
    amenities: ['Parking', 'WiFi'],
    hasOffer: false,
    isOpen24Hours: false,
    operatingHours: '8 AM - 8 PM',
  },

  // Hyderabad Region
  {
    id: 'hyundai-hitech-city',
    name: 'Hitech City Hyundai Station',
    provider: 'Hyundai',
    location: {
      latitude: 17.4435,
      longitude: 78.3772,
      address: 'Hitech City Main Road',
      city: 'Hyderabad',
    },
    status: 'available',
    rating: 4.7,
    distance: '550 km away',
    ports: [
      { type: 'DC', power: '50kW', available: true, price: 15 },
      { type: 'AC', power: '22kW', available: true, price: 11 },
    ],
    amenities: ['Restroom', 'Parking'],
    hasOffer: true,
    offerText: 'Hyundai owners get 25% off',
    isOpen24Hours: true,
  },
  {
    id: 'tata-power-secunderabad',
    name: 'Secunderabad Railway Station',
    provider: 'Tata Power',
    location: {
      latitude: 17.4340,
      longitude: 78.5018,
      address: 'Near Secunderabad Railway Station',
      city: 'Hyderabad',
    },
    status: 'offline',
    rating: 4.2,
    distance: '560 km away',
    ports: [
      { type: 'DC', power: '60kW', available: false, price: 18 },
      { type: 'AC', power: '7.4kW', available: false, price: 12 },
    ],
    amenities: ['Restroom', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },

  // Chennai Region
  {
    id: 'chargepoint-omr',
    name: 'OMR Tech Corridor Station',
    provider: 'ChargePoint',
    location: {
      latitude: 12.9121,
      longitude: 80.2273,
      address: 'Old Mahabalipuram Road',
      city: 'Chennai',
    },
    status: 'available',
    rating: 4.6,
    distance: '340 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 17 },
      { type: 'AC', power: '22kW', available: true, price: 13 },
    ],
    amenities: ['Cafe', 'WiFi', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },

  // Kolkata Region
  {
    id: 'statiq-saltlake',
    name: 'Salt Lake Sector V Hub',
    provider: 'Statiq',
    location: {
      latitude: 22.5726,
      longitude: 88.3639,
      address: 'Sector V, Salt Lake City',
      city: 'Kolkata',
    },
    status: 'available',
    rating: 4.4,
    distance: '1420 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 16 },
      { type: 'AC', power: '22kW', available: true, price: 12 },
    ],
    amenities: ['Restroom', 'WiFi', 'Parking'],
    hasOffer: true,
    offerText: 'Night charging discount',
    isOpen24Hours: true,
  },

  // Jaipur Region
  {
    id: 'fortum-jaipur',
    name: 'Pink City Express Charge',
    provider: 'Fortum',
    location: {
      latitude: 26.9124,
      longitude: 75.7873,
      address: 'MI Road',
      city: 'Jaipur',
    },
    status: 'in_use',
    rating: 4.5,
    distance: '250 km away',
    ports: [
      { type: 'DC', power: '120kW', available: false, price: 20 },
      { type: 'AC', power: '22kW', available: true, price: 14 },
    ],
    amenities: ['Restroom', 'Cafe', 'Shopping', 'Parking'],
    hasOffer: false,
    isOpen24Hours: false,
    operatingHours: '6 AM - 10 PM',
  },

  // Chandigarh Region
  {
    id: 'tata-power-chandigarh',
    name: 'Sector 17 Charging Plaza',
    provider: 'Tata Power',
    location: {
      latitude: 30.7410,
      longitude: 76.7791,
      address: 'Sector 17 Market',
      city: 'Chandigarh',
    },
    status: 'available',
    rating: 4.8,
    distance: '240 km away',
    ports: [
      { type: 'DC', power: '60kW', available: true, price: 17 },
      { type: 'AC', power: '7.4kW', available: true, price: 11 },
    ],
    amenities: ['Restroom', 'Shopping', 'Parking'],
    hasOffer: false,
    isOpen24Hours: true,
  },

  // Ahmedabad Region
  {
    id: 'mg-ahmedabad',
    name: 'SG Highway MG Station',
    provider: 'MG',
    location: {
      latitude: 23.0225,
      longitude: 72.5714,
      address: 'SG Highway',
      city: 'Ahmedabad',
    },
    status: 'available',
    rating: 4.3,
    distance: '900 km away',
    ports: [
      { type: 'DC', power: '50kW', available: true, price: 15 },
      { type: 'AC', power: '22kW', available: true, price: 11 },
    ],
    amenities: ['WiFi', 'Parking'],
    hasOffer: true,
    offerText: 'MG owners: Free charging',
    isOpen24Hours: false,
    operatingHours: '7 AM - 9 PM',
  },
];

// Default map region (centered on India)
export const defaultMapRegion = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 25,
  longitudeDelta: 25,
};

// Helper function to filter stations
export const filterStations = (
  stations: ChargingStation[],
  filter: 'all' | 'offers' | 'available',
): ChargingStation[] => {
  switch (filter) {
    case 'all':
      return stations;
    case 'offers':
      return stations.filter(station => station.hasOffer);
    case 'available':
      return stations.filter(station => station.status === 'available');
    default:
      return stations;
  }
};

