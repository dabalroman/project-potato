export default class Currency {

  static formatCurrency(locales, options) {
    let d = new Intl.NumberFormat(locales, options);
    return (
      d.supportedLocalesOf().toString('pl-PL') + d.resolvedOptions().style('currency')
      + d.resolvedOptions().style('PLN')

    );
  }
}