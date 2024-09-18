const formatPrice = (price: string | number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // No decimal places for Rupiah
  }).format(Number(price));
};

export default formatPrice;