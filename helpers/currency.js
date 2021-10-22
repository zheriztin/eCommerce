   function formatCurrency (number) {
      const money =new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
      return money
   }

   module.exports = formatCurrency