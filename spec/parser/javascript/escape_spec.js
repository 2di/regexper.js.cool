import javascript from '../../../src/js/parser/javascript/parser.js';
import _ from 'lodash';
import Snap from 'snapsvg';

describe('parser/javascript/escape.js', function() {

  _.forIn({
    '\\b': { label: '单词边界', ordinal: -1 },
    '\\B': { label: '非单词边界', ordinal: -1 },
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
    '\\1': { label: '反向引用 (group = 1)', ordinal: -1 },
    '\\2': { label: '反向引用 (group = 2)', ordinal: -1 },
    '\\3': { label: '反向引用 (group = 3)', ordinal: -1 },
    '\\4': { label: '反向引用 (group = 4)', ordinal: -1 },
    '\\5': { label: '反向引用 (group = 5)', ordinal: -1 },
    '\\6': { label: '反向引用 (group = 6)', ordinal: -1 },
    '\\7': { label: '反向引用 (group = 7)', ordinal: -1 },
    '\\8': { label: '反向引用 (group = 8)', ordinal: -1 },
    '\\9': { label: '反向引用 (group = 9)', ordinal: -1 },
    '\\012': { label: '八进制: 12 (0x0A)', ordinal: 10 },
    '\\cx': { label: 'ctrl-X (0x18)', ordinal: 24 },
    '\\xab': { label: '0xAB', ordinal: 0xab },
    '\\uabcd': { label: 'U+ABCD', ordinal: 0xabcd }
  }, (content, str) => {
    it(`parses "${str}" as an Escape`, function() {
      var parser = new javascript.Parser(str);

      expect(parser.__consume__terminal()).toEqual(jasmine.objectContaining(content));
    });
  });

  describe('#_render', function() {

    beforeEach(function() {
      var parser = new javascript.Parser('\\b');
      this.node = parser.__consume__terminal();
      this.node.state = {};

      this.svg = Snap(document.createElement('svg'));
      this.node.container = this.svg.group();
      spyOn(this.node, 'renderLabel').and.callThrough();
    });

    it('renders a label', function() {
      this.node._render();

      expect(this.node.renderLabel).toHaveBeenCalledWith('word boundary');
    });

    it('sets the edge radius of the rect', function(done) {
      this.node._render()
        .then(label => {
          expect(label.select('rect').attr()).toEqual(jasmine.objectContaining({
            rx: '3',
            ry: '3'
          }));
          done();
        }).catch(done.fail);
    });

  });

});
