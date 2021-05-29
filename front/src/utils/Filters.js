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

}
