const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = formatter.format;