export default class Filters {

  static unit(i) {
    return i + ' szt.';
  }

  static capitalize(i) {
    return i.charAt(0).toUpperCase() + i.slice(1).toLowerCase();
  }

  static formatCurrency(i) {
    return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(i);
  }

  static formatDateString (dateAsString) {
    let d = new Date(dateAsString);
    return (
      d.getDate().toString().padStart(2, '0') + '/'
      + (d.getMonth() + 1).toString().padStart(2, '0') + '/'
      + d.getFullYear() + ' '
      + d.getHours().toString().padStart(2, '0') + ':'
      + d.getMinutes().toString().padStart(2, '0') + ':'
      + d.getSeconds().toString().padStart(2, '0')
    );
  }
}
