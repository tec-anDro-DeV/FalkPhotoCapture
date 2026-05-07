export const COLORS = {
  primary: '#02204A',
  white: '#FFFFFF',
  background: '#F5F7FA',
  border: '#E0E5EC',
  pending: '#F59E0B',
  uploaded: '#10B981',
  failed: '#EF4444',
  greyText: '#6B7280',
  inputBackground: '#F0F2F5',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
} as const;

export type ColorKey = keyof typeof COLORS;
