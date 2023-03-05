import ProductImage from '@/assets/images/products/product.png';

const product = {
  id: '01234567',
  name: 'UMI',
  title: 'VEWSDE',
  imageUrl: ProductImage,
  colors: [
    {
      label: 'Lemon',
      value: '#FFB900',
    },
    {
      label: 'Noisette',
      value: '#7B6A3D',
    },
  ],
  season: ['SS23'],
  collections: ['Spring ideas', 'Core'],
  currencies: ['USD', 'GBP'],
  tags: ['AW23', 'Core'],
  prices: [
    {
      label: 'Landed',
      price: '£3,345.00',
    },
    {
      label: 'Exwork',
      price: '£3,345.00',
    },
    {
      label: 'MSRP',
      price: '£3,345.00',
    },
    {
      label: 'Exwork',
      price: '£3,345.00',
    },
    {
      label: 'MSRP',
      price: '£3,345.00'
    }
  ],
  status: true,
};

export const products = Array(12).fill(product);
