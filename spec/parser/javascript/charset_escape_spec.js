import javascript from '../../../src/js/parser/javascript/parser.js';
import _ from 'lodash';

describe('parser/javascript/charset_escape.js', function() {

  _.forIn({
    '\\b': { label: 'backspace (0x08)', ordinal: 0x08 },
    '\\d': { label: '数字', ordinal: -1 },
    '\\D': { label: '非数字', ordinal: -1 },
    '\\f': { label: '换页符 (0x0C)', ordinal: 0x0c },
    '\\n': { label: '换行符 (0x0A)', ordinal: 0x0a },
    '\\r': { label: '回车符 (0x0D)', ordinal: 0x0d },
    '\\s': { label: '空白字符', ordinal: -1 },
    '\\S': { label: '非空白字符', ordinal: -1 },
    '\\t': { label: '制表符 (0x09)', ordinal: 0x09 },
    '\\v': { label: '垂直制表符 (0x0B)', ordinal: 0x0b },
    '\\w': { label: '字母、数字、下划线', ordinal: -1 },
    '\\W': { label: '非字母、数字、下划线', ordinal: -1 },
    '\\0': { label: 'null (0x00)', ordinal: 0 },
    '\\012': { label: '八进制: 12 (0x0A)', ordinal: 10 },
    '\\cx': { label: 'ctrl-X (0x18)', ordinal: 24 },
    '\\xab': { label: '0xAB', ordinal: 0xab },
    '\\uabcd': { label: 'U+ABCD', ordinal: 0xabcd }
  }, (content, str) => {
    it(`parses "${str}" as a CharsetEscape`, function() {
      var parser = new javascript.Parser(str);

      expect(parser.__consume__charset_terminal()).toEqual(jasmine.objectContaining(content));
    });
  });

});
