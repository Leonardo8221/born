// Apollo Client Query Keys

export const ORDER_LIST = 'ORDER_LIST';
export const GET_ORDERS_LIST = 'GET_ORDERS_LIST';

export const seasons: string[] = [
  'Pre-Spring (PS)',
  'Spring/Summer (SS)',
  'High Summer (HS)',
  'Pre Fall (PF)',
  'Resort (R)',
  'Autumn Winter (AW)',
];

export const orderTypes: string[] = [
  'Reorder',
  'Consignment',
  'ATS',
  'Seasonal',
];

export const  getGridType = (productId, gridType) => {
  return gridType === 'smallGrid' ? (productId ? 'grid-cols-4' : 'grid-cols-6') : (productId ? 'grid-cols-2' : 'grid-cols-3');
}
