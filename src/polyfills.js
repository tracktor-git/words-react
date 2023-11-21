/* eslint-disable no-extend-native */

if (Array.prototype.at === undefined) {
  Array.prototype.at = function at(index) {
    if (index >= 0) {
      return this[index];
    }
    return this[this.length + index];
  };
}

if (String.prototype.at === undefined) {
  String.prototype.at = function at(index) {
    if (index >= 0) {
      return this[index];
    }
    return this[this.length + index];
  };
}

if (String.prototype.replaceAll === undefined) {
  String.prototype.replaceAll = function replaceAll(pattern, replacement) {
    return this.split(pattern).join(replacement);
  };
}
