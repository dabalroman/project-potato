export default class Filters {

  static unit(i) {
    return i + ' szt.';
  }

  static captialization(i) {
    if (!i) return ''
    i = i.toString()
    return i.charAt(0).toUpperCase() + i.slice(1);
  }

  static formatCurrency(i) {
    return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(i);
  }

}
