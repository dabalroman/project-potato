export default class Currency {

  static formatCurrency(i) {
    return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(i);
  }
}
