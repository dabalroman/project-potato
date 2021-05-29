export default class Capitalize {

  static captialization(i) {
    if (!i) return ''
    i = i.toString()
    return i.charAt(0).toUpperCase() + i.slice(1);
  }
}
