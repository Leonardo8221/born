import ProductImage from '@/assets/images/products/product.png';

const product = {
  product_id: '01234567',
  id: '01234567',
  name: 'UMI',
  title: 'VEWSDE',
  imageUrl: ProductImage,
  colour_families: ['#FFB900', 'Noisette'],
  season: ['SS23'],
  collections:  [{id: 1, name: 'AW23'},{id: 2, name: 'Core'}],
  currencies: ['USD', 'GBP'],
  associated_prices: [
    {
      currency: 'USD',
      landed: '3,345.00',
      exworks: '3,345.00',
      retail: '3,345.00',
    },
  ],
  status: true,
};

export const products = Array(12).fill(product);
