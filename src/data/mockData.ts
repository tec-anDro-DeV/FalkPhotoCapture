export type ShipmentStatus = 'Pending' | 'Uploaded' | 'Failed';

export interface Shipment {
  id: string;
  bolNumber: string;
  date: string;
  status: ShipmentStatus;
  photoCount: number;
}

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    bolNumber: 'BOL123456',
    date: '20 May 2025',
    status: 'Pending',
    photoCount: 0,
  },
  {
    id: '2',
    bolNumber: 'BOL123455',
    date: '20 May 2025',
    status: 'Uploaded',
    photoCount: 12,
  },
  {
    id: '3',
    bolNumber: 'BOL123454',
    date: '19 May 2025',
    status: 'Failed',
    photoCount: 8,
  },
  {
    id: '4',
    bolNumber: 'BOL123453',
    date: '19 May 2025',
    status: 'Pending',
    photoCount: 15,
  },
  {
    id: '5',
    bolNumber: 'BOL123452',
    date: '18 May 2025',
    status: 'Uploaded',
    photoCount: 6,
  },
];
