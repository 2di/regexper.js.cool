// Escape nodes are used for escape sequences. It is rendered as a label with
// the description of the escape and the numeric code it matches when
// appropriate.

import _ from 'lodash';

function hex(value) {
  var str = value.toString(16).toUpperCase();

  if (str.length < 2) {
    str = '0' + str;
  }

  return `(0x${str})`;
}

export default {
  type: 'escape',

  // Renders the escape into the currently set container.
  _render() {
    return this.renderLabel(this.label)
      .then(label => {
        label.select('rect').attr({
          rx: 3,
          ry: 3
        });
        return label;
      });
  },

  setup() {
    let addHex;

    // The escape code. For an escape such as `\b` it would be "b".
    this.code = this.properties.esc.properties.code.textValue;
    // The argument. For an escape such as `\xab` it would be "ab".
    this.arg = this.properties.esc.properties.arg.textValue;
    // Retrieves the label, ordinal value, an flag to control adding hex value
    // from the escape code mappings
    [this.label, this.ordinal, addHex] = _.result(this, this.code);

    // When requested, add hex code to the label.
    if (addHex) {
      this.label = `${this.label} ${hex(this.ordinal)}`;
    }
  },

  // Escape code mappings
  b: ['单词边界', -1, false],
  B: ['非单词边界', -1, false],
  d: ['数字', -1, false],
  D: ['非数字', -1, false],
  f: ['换页符', 0x0c, true],
  n: ['换行符', 0x0a, true],
  r: ['回车符', 0x0d, true],
  s: ['空白字符', -1, false],
  S: ['非空白字符', -1, false],
  t: ['制表符', 0x09, true],
  v: ['垂直制表符', 0x0b, true],
  w: ['字母、数字、下划线', -1, false],
  W: ['非字母、数字、下划线', -1, false],
  1: ['反向引用 (group = 1)', -1, false],
  2: ['反向引用 (group = 2)', -1, false],
  3: ['反向引用 (group = 3)', -1, false],
  4: ['反向引用 (group = 4)', -1, false],
  5: ['反向引用 (group = 5)', -1, false],
  6: ['反向引用 (group = 6)', -1, false],
  7: ['反向引用 (group = 7)', -1, false],
  8: ['反向引用 (group = 8)', -1, false],
  9: ['反向引用 (group = 9)', -1, false],
  0: function() {
    if (this.arg) {
      return [`八进制: ${this.arg}`, parseInt(this.arg, 8), true];
    } else {
      return ['null', 0, true];
    }
  },
  c() {
    return [`ctrl-${this.arg.toUpperCase()}`, this.arg.toUpperCase().charCodeAt(0) - 64, true];
  },
  x() {
    return [`0x${this.arg.toUpperCase()}`, parseInt(this.arg, 16), false];
  },
  u() {
    return [`U+${this.arg.toUpperCase()}`, parseInt(this.arg, 16), false];
  }
};
