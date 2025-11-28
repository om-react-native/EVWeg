export type StationStatus = 'available' | 'in_use' | 'offline';
export type ConnectorType = 'DC' | 'AC' | 'Universal';
export type ProviderType = 
  | 'Statiq' 
  | 'Tata Power' 
  | 'Fortum' 
  | 'Hyundai' 
  | 'MG' 
  | 'Jaguar' 
  | 'Mercedes'
  | 'ChargePoint'
  | 'Ather';

export interface ChargingPort {
  type: ConnectorType;
  power: string; // e.g., "60kW", "22kW"
  available: boolean;
  price: number; // per kWh
}

export interface ChargingStation {
  id: string;
  name: string;
  provider: ProviderType;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  };
  status: StationStatus;
  rating: number;
  distance: string; // e.g., "363 km away"
  ports: ChargingPort[];
  amenities: string[]; // e.g., ['Restroom', 'Cafe', 'WiFi']
  hasOffer: boolean;
  offerText?: string;
  isOpen24Hours: boolean;
  operatingHours?: string;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type FilterType = 'all' | 'offers' | 'available';

