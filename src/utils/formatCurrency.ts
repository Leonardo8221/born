type Currency = 'USD' | 'EUR' | 'GBP';

export const formatCurrency = (currency?: Currency) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  });
