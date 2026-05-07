import { create } from 'zustand';
import type { Shipment, ShipmentStatus } from '../data/mockData';
import { MOCK_SHIPMENTS } from '../data/mockData';

interface ShipmentState {
  shipments: Shipment[];
  filteredShipments: Shipment[];
  searchQuery: string;
  isLoading: boolean;
  syncShipments: () => Promise<void>;
  searchShipments: (query: string) => void;
  updateShipmentStatus: (id: string, status: ShipmentStatus, photoCount?: number) => void;
}

export const useShipmentStore = create<ShipmentState>((set, get) => ({
  shipments: MOCK_SHIPMENTS,
  filteredShipments: MOCK_SHIPMENTS,
  searchQuery: '',
  isLoading: false,

  syncShipments: async () => {
    set({ isLoading: true });
    await new Promise<void>(resolve => setTimeout(resolve, 1500));
    set({ isLoading: false });
    get().searchShipments(get().searchQuery);
  },

  searchShipments: (query: string) => {
    const { shipments } = get();
    const q = query.toLowerCase().trim();
    set({
      searchQuery: query,
      filteredShipments: q
        ? shipments.filter(
            s =>
              s.bolNumber.toLowerCase().includes(q) ||
              s.id.toLowerCase().includes(q),
          )
        : shipments,
    });
  },

  updateShipmentStatus: (id: string, status: ShipmentStatus, photoCount?: number) => {
    set(state => ({
      shipments: state.shipments.map(s =>
        s.id === id
          ? { ...s, status, ...(photoCount !== undefined ? { photoCount } : {}) }
          : s,
      ),
      filteredShipments: state.filteredShipments.map(s =>
        s.id === id
          ? { ...s, status, ...(photoCount !== undefined ? { photoCount } : {}) }
          : s,
      ),
    }));
  },
}));
